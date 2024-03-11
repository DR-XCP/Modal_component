import React, { useEffect, useState } from "react";
import { useModals } from "../lib/contexts/ModalContext";

const Modal = ({ contentSrc }) => {
   const { isOpen, closeModal } = useModals();
   const [content, setContent] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!contentSrc) return;
      setIsLoading(true);
      // Simuler le chargement de contenu
      setTimeout(() => {
         setContent(contentSrc);
         setIsLoading(false);
      }, 1000); // Simule un délai de chargement
   }, [contentSrc]);

   if (!isOpen) return null;

   return (
      <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
         <div className="modal-content">
            {isLoading ? (
               <div>Chargement...</div>
            ) : (
               <>
                  <div>{content}</div>
                  <button onClick={closeModal}>Fermer</button>
               </>
            )}
         </div>
      </div>
   );
};

export default Modal;
