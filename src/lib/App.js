import React from "react";
import Modal from "./Modal";
import { ModalProvider, useModals } from "./contexts/ModalContext";

const App = () => {
   const { openModal, closeModal, modals } = useModals();
   const modalId = "";

   return (
      <>
         <ModalProvider>
            <div>
               <button
                  id="openModal"
                  type="button"
                  className="open-btn"
                  onClick={() => openModal(modalId)}
                  aria-label="Ouvrir la modale pour plus d'informations"
               >
                  Ouvrir Modal
               </button>
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     openModal(modalId);
                  }}
               >
                  <button
                     id="submitButton"
                     className="submitButton"
                     type="submit"
                     aria-label="Soumettre la modale pour la valider"
                  >
                     Envoyer
                  </button>
               </form>
               {modals[modalId] && (
                  <Modal
                     id={modalId}
                     contentSrc="Contenu de la modal"
                     isOpen={modals[modalId]}
                     onClose={() => closeModal(modalId)}
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
