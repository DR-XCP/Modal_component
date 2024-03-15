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
  const modalRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    // Si modal fermée, ne charge pas le contenu
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
    // Gestion du focus quand la modale est ouverte
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen, contentSrc]);

  // Utilise la prop isOpen pour déterminer la classe CSS
  const style = isOpen ? "modal" : "modalClose";
  return /*#__PURE__*/_react.default.createElement("div", {
    className: style,
    id: id,
    role: "dialog",
    "aria-modal": "true",
    tabIndex: "-1",
    ref: modalRef,
    onKeyDown: e => {
      if (e.key === "Escape") {
        onClose();
      }
    }
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
    onClick: onClose,
    "aria-label": "Fermer"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "bi bi-x"
  }))));
};
var _default = exports.default = Modal;