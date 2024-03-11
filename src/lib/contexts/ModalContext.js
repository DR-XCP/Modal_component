import React, { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext();

export const useModals = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
   // On utilise un objet pour gérer l'état ouvert/fermé de plusieurs modales
   const [modals, setModals] = useState({});

   const openModal = (id) => setModals({ ...modals, [id]: true });
   const closeModal = (id) => setModals({ ...modals, [id]: false });

   // Gère la fermeture de toutes les modales avec la touche Esc
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
