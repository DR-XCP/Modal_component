import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useRef, useState } from "react";

const Modal = ({ id, contentSrc, isOpen, onClose, styles = {} }) => {
   const [content, setContent] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const modalRef = useRef(null);

   // Style de la modal
   const defaultModalStyle = {
      backgroundColor: "white",
      color: "black",
      width: "300px",
      height: "80px",
      padding: "20px",
      borderRadius: "4px",
      border: "1px solid black",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)",
   };

   // Ajout d'un fond lorsque la modal est ouverte
   const backdropStyle = {
      display: isOpen ? "block" : "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
      ...styles.backdrop,
   };

   const modalContainerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      ...styles.container,
   };

   const iconStyle = {
      textShadow:
         "1px 0 0 currentColor, 0 1px 0 currentColor, -1px 0 0 currentColor, 0 -1px 0 currentColor",
      ...styles.icon,
   };

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
      <div style={backdropStyle}>
         <div style={modalContainerStyle}>
            <div
               className={style}
               id={id}
               role="dialog"
               aria-modal="true"
               tabIndex="-1"
               ref={modalRef}
               style={{ ...defaultModalStyle, ...styles.modal }}
               onKeyDown={(e) => {
                  if (e.key === "Escape") {
                     onClose();
                  }
               }}
            >
               <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
               >
                  {loading ? (
                     <p>Chargement...</p>
                  ) : error ? (
                     <p>Erreur de chargement: {error}</p>
                  ) : (
                     <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  )}
                  <button
                     type="button"
                     style={{ ...styles.closeButton }}
                     className="close-btn"
                     onClick={onClose}
                     aria-label="Fermer"
                  >
                     <i className="bi bi-x" style={iconStyle}></i>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
