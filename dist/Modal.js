"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("bootstrap-icons/font/bootstrap-icons.css");
var _react = _interopRequireWildcard(require("react"));
const Modal = _ref => {
  let {
    id,
    contentSrc,
    isOpen,
    onClose
  } = _ref;
  const [content, setContent] = (0, _react.useState)("");
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    // S'assure que la modale ne tente de charger le contenu que si elle est ouverte
    if (!isOpen) return;
    if (contentSrc.startsWith("http")) {
      setLoading(true);
      setError(null);
      fetch(contentSrc).then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      }).then(data => {
        setContent(data);
        setLoading(false);
      }).catch(error => {
        console.error("Error loading modal content:", error);
        setError(error.toString());
        setLoading(false);
      });
    } else {
      setContent(contentSrc);
    }
  }, [isOpen, contentSrc]); // Ajoute isOpen aux dépendances pour recharger le contenu si la modale est réouverte

  // Utilise la prop isOpen pour déterminer la classe CSS, affectant ainsi l'affichage de la modale
  const style = isOpen ? "modal" : "modalClose";

  // Si isOpen est false, ne rend rien
  if (!isOpen) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: style,
    id: id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, loading ? /*#__PURE__*/_react.default.createElement("p", null, "Chargement...") : error ? /*#__PURE__*/_react.default.createElement("p", null, "Erreur de chargement: ", error) : /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "close-btn",
    onClick: onClose // Remplace closeModal(id) par onClose
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "bi bi-x-circle-fill"
  }))));
};
var _default = exports.default = Modal;