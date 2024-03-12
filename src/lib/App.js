import React from "react";
import Modal from "./Modal";
import { useModals } from "./contexts/ModalContext";

const App = () => {
   const { openModal } = useModals();

   const handleClick = () => {
      openModal("modal");
   };

   return (
      <>
         <button onClick={handleClick}>Ouvrir</button>
         <Modal id="modal" contentSrc={"Contenu de la modal"} />
      </>
   );
};

export default App;
