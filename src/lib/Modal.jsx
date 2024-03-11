import React, { useEffect, useState } from "react";
import { useModals } from "../lib/contexts/ModalContext";

const Modal = ({ id, contentSrc }) => {
   const { modals, closeModal } = useModals();
   const isOpen = modals[id];
   const [content, setContent] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!contentSrc) return;
      setIsLoading(true);
      setTimeout(() => {
         setContent(contentSrc);
         setIsLoading(false);
      }, 1000);
   }, [contentSrc]);

   const handleClickOutside = (event) => {
      if (event.target.className === "modal") {
         closeModal(id);
      }
   };

   if (!isOpen) return null;

   return (
      <div
         className="modal"
         style={{ display: isOpen ? "block" : "none" }}
         onClick={handleClickOutside}
      >
         <div className="modal-content">
            {isLoading ? (
               <div>Chargement...</div>
            ) : (
               <>
                  <div>{content}</div>
                  <button onClick={() => closeModal(id)}>Fermer</button>
               </>
            )}
         </div>
      </div>
   );
};

export default Modal;
