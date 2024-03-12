import React, { createContext, useContext, useEffect, useState } from "react";

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

   const openModal = (id = generateId()) => {
      setModals({ ...modals, [id]: true });
      return id;
   };

   const closeModal = (id) => setModals({ ...modals, [id]: false });

   useEffect(() => {
      const handleEsc = (event) => {
         if (event.keyCode === 27) setModals({});
      };
      window.addEventListener("keydown", handleEsc);

      return () => {
         window.removeEventListener("keydown", handleEsc);
      };
   }, []);

   return (
      <ModalContext.Provider value={{ modals, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
};
