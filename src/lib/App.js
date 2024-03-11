import React from "react";
import { ModalProvider, useModals } from "../lib/contexts/ModalContext";
import Modal from "./Modal";

const ModalToggle = ({ id }) => {
   const { modals, openModal } = useModals();
   if (modals[id]) return null;

   return <button onClick={() => openModal(id)}>Ouvrir Modal {id}</button>;
};

const App = () => {
   return (
      <ModalProvider>
         <ModalToggle id="modal1" />
         <Modal id="modal1" contentSrc={"Contenu de la première modal"} />
         <ModalToggle id="modal2" />
         <Modal id="modal2" contentSrc={"Contenu de la deuxième modal"} />
      </ModalProvider>
   );
};

export default App;
