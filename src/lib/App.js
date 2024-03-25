import React, { useState } from "react";
import Modal from "./Modal";
import { ModalProvider, useModals } from "./contexts/ModalContext";

const App = () => {
   const { openModal, closeModal, modals } = useModals();
   const [currentModalId, setCurrentModalId] = useState(null);

   const handleOpenModal = () => {
      const newModalId = openModal();
      setCurrentModalId(newModalId);
   };

   const handleCloseModal = () => {
      closeModal(currentModalId);
      setCurrentModalId(null);
   };

   return (
      <>
         <ModalProvider>
            <div>
               <button
                  id="openModal"
                  type="button"
                  className="open-btn"
                  onClick={handleOpenModal}
                  aria-label="Ouvrir la modale pour plus d'informations"
               >
                  Ouvrir Modal
               </button>

               {currentModalId && modals[currentModalId] && (
                  <Modal
                     id={currentModalId}
                     contentSrc="Contenu de la modal"
                     isOpen={modals[currentModalId]}
                     onClose={handleCloseModal}
                     styles={{
                        // Color and opacity of the modal's backdrop
                        backdrop: {},
                        // Modal stylization
                        modal: {
                           width: "250px",
                        },
                        // Close button positioning within the modal
                        closeButton: {},
                        // General position of the modal within the viewport
                        container: {
                           top: "50%",
                           left: "50%",
                           transform: "translate(-50%, -50%)",
                        },
                        // Icon color inside the close button
                        icon: {},
                     }}
                  />
               )}
            </div>
         </ModalProvider>
      </>
   );
};

export default App;
