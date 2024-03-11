import React from "react";
import { ModalProvider, useModals } from "../lib/contexts/ModalContext";
import Modal from "./Modal";

const ModalToggle = () => {
   const { isOpen, openModal } = useModals();
   // Le bouton est maintenant conditionné par l'état isOpen.
   if (isOpen) return null; // Ne pas afficher le bouton si la modal est ouverte.

   return <button onClick={openModal}>Ouvrir Modal</button>;
};

const App = () => {
   return (
      <ModalProvider>
         <ModalToggle />
         <Modal contentSrc={"Contenu de la modal"} />
      </ModalProvider>
   );
};

export default App;
