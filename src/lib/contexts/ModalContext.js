import React, {
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
} from "react";

// Création d'un contexte pour les modales
const ModalContext = createContext();

// Hook personnalisé pour accéder au contexte des modales facilement
export const useModals = () => useContext(ModalContext);

// Génération d'un ID unique pour chaque modale
const generateId = () =>
   `modal_${new Date().getTime()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

export const ModalProvider = ({ children }) => {
   // On utilise un objet pour gérer l'état ouvert/fermé de plusieurs modales
   const [modals, setModals] = useState({});
   // Référence pour stocker l'élément qui avait le focus avant l'ouverture de la modale
   const lastFocusedElement = useRef(null);

   const openModal = (id = generateId()) => {
      // Enregistrer l'élément actuellement focalisé
      lastFocusedElement.current = document.activeElement;
      setModals({ ...modals, [id]: true });
      return id;
   };

   const closeModal = (id) => {
      setModals({ ...modals, [id]: false });
      // Restaurer le focus à l'élément précédent après la fermeture de la modale
      if (lastFocusedElement.current) {
         lastFocusedElement.current.focus();
      }
   };

   // Gérer la fermeture des modales avec la touche Échap
   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.keyCode === 27) {
            // KeyCode 27 = Échap
            setModals((currentModals) => {
               const newModals = { ...currentModals };
               Object.keys(newModals).forEach((id) => (newModals[id] = false));
               return newModals;
            });
            // Restaurer le focus après fermeture par touche Échap
            if (lastFocusedElement.current) {
               lastFocusedElement.current.focus();
            }
         }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   return (
      <ModalContext.Provider value={{ modals, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
};
