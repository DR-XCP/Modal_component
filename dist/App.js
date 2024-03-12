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
    openModal
  } = (0, _ModalContext.useModals)();
  const handleClick = () => {
    openModal("Modal1");
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick
  }, "Ouvrir"), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    id: "modal2",
    contentSrc: "Contenu de la deuxième modal"
  }));
};
var _default = exports.default = App;