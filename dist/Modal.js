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
    onClose,
    styles = {}
  } = _ref;
  const [content, setContent] = (0, _react.useState)("");
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const modalRef = (0, _react.useRef)(null);

  // Style de la modal
  const defaultModalStyle = {
    backgroundColor: "white",
    color: "black",
    width: "auto",
    height: "auto",
    padding: "20px",
    borderRadius: "4px",
    border: "1px solid black",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)"
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
    ...styles.backdrop
  };
  const modalContainerStyle = {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "auto",
    height: "auto",
    ...styles.container
  };
  const iconStyle = {
    textShadow: "1px 0 0 currentColor, 0 1px 0 currentColor, -1px 0 0 currentColor, 0 -1px 0 currentColor",
    ...styles.icon
  };
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
    style: backdropStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: modalContainerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: style,
    id: id,
    role: "dialog",
    "aria-modal": "true",
    tabIndex: "-1",
    ref: modalRef,
    style: {
      ...defaultModalStyle,
      ...styles.modal
    },
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
    style: {
      ...styles.closeButton
    },
    className: "close-btn",
    onClick: onClose,
    "aria-label": "Fermer"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "bi bi-x",
    style: iconStyle
  }))))));
};
var _default = exports.default = Modal;