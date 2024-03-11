"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ModalContext = require("../lib/contexts/ModalContext");
var _Modal = _interopRequireDefault(require("./Modal"));
const ModalToggle = _ref => {
  let {
    id
  } = _ref;
  const {
    modals,
    openModal
  } = (0, _ModalContext.useModals)();
  if (modals[id]) return null;
  return /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => openModal(id)
  }, "Ouvrir Modal ", id);
};
const App = () => {
  return /*#__PURE__*/_react.default.createElement(_ModalContext.ModalProvider, null, /*#__PURE__*/_react.default.createElement(ModalToggle, {
    id: "modal1"
  }), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    id: "modal1",
    contentSrc: "Contenu de la première modal"
  }), /*#__PURE__*/_react.default.createElement(ModalToggle, {
    id: "modal2"
  }), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    id: "modal2",
    contentSrc: "Contenu de la deuxième modal"
  }));
};
var _default = exports.default = App;