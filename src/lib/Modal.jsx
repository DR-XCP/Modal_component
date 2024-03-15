import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useRef, useState } from "react";

const Modal = ({ id, contentSrc, isOpen, onClose }) => {
   const [content, setContent] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const modalRef = useRef(null);

   useEffect(() => {
      // Si modal fermée, ne charge pas le contenu
      if (!isOpen) return;

      if (contentSrc.startsWith("http")) {
         setLoading(true);
         setError(null);

         fetch(contentSrc)
            .then((response) => {
               if (!response.ok) throw new Error("Network response was not ok");
               return response.text();
            })
            .then((data) => {
               setContent(data);
               setLoading(false);
            })
            .catch((error) => {
               console.error("Error loading modal content:", error);
               setError(error.toString());
               setLoading(false);
            });
      } else {
         setContent(contentSrc);
      }
      // Gestion du focus quand la modale est ouverte
      if (isOpen && modalRef.current) {
         modalRef.current.focus();
      }
   }, [isOpen, contentSrc]);

   // Utilise la prop isOpen pour déterminer la classe CSS
   const style = isOpen ? "modal" : "modalClose";

   return (
      <div
         className={style}
         id={id}
         role="dialog"
         aria-modal="true"
         tabIndex="-1"
         ref={modalRef}
         onKeyDown={(e) => {
            if (e.key === "Escape") {
               onClose();
            }
         }}
      >
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {loading ? (
               <p>Chargement...</p>
            ) : error ? (
               <p>Erreur de chargement: {error}</p>
            ) : (
               <div dangerouslySetInnerHTML={{ __html: content }}></div>
            )}
            <button
               type="button"
               className="close-btn"
               onClick={onClose}
               aria-label="Fermer"
            >
               <i className="bi bi-x"></i>
            </button>
         </div>
      </div>
   );
};

export default Modal;
