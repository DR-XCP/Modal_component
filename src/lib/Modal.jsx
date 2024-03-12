import React, { useEffect, useState } from "react";
import { useModals } from "./contexts/ModalContext";

const Modal = ({ id, contentSrc }) => {
   const { modals, closeModal } = useModals();
   const [content, setContent] = useState("");
   // Détermine la classe CSS de la modale en fonction de si elle est ouverte ou non
   const style = modals[id] ? "modal" : "modalClose";

   // Màj le contenu quand elle est ouverte ou quand le contenu change
   useEffect(() => {
      if (modals[id]) {
         if (contentSrc) {
            setContent(contentSrc);
         } else {
            setContent("Aucun contenu...");
         }
      }
   }, [modals, id, contentSrc]);

   if (!modals[id]) return null;

   return (
      <div className={style} id={id}>
         <div className="modal-content">
            <div>{content}</div>
            <button onClick={() => closeModal(id)}>Fermer</button>
         </div>
      </div>
   );
};

export default Modal;
