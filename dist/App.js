"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Modal = _interopRequireDefault(require("./Modal"));
var _ModalContext = require("./contexts/ModalContext");
const App = () => {
  const {
    openModal,
    closeModal,
    modals
  } = (0, _ModalContext.useModals)();
  const modalId = "";
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ModalContext.ModalProvider, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    id: "openModal",
    type: "button",
    className: "open-btn",
    onClick: () => openModal(modalId),
    "aria-label": "Ouvrir la modale pour plus d'informations"
  }, "Ouvrir Modal"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      openModal(modalId);
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "submitButton",
    className: "submitButton",
    type: "submit",
    "aria-label": "Soumettre la modale pour la valider"
  }, "Envoyer")), modals[modalId] && /*#__PURE__*/_react.default.createElement(_Modal.default, {
    id: modalId,
    contentSrc: "Contenu de la modal",
    isOpen: modals[modalId],
    onClose: () => closeModal(modalId)
  }))));
};
var _default = exports.default = App;