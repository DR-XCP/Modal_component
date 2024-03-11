"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ModalContext = require("../lib/contexts/ModalContext");
const Modal = _ref => {
  let {
    id,
    contentSrc
  } = _ref;
  const {
    modals,
    closeModal
  } = (0, _ModalContext.useModals)();
  const isOpen = modals[id];
  const [content, setContent] = (0, _react.useState)("");
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!contentSrc) return;
    setIsLoading(true);
    setTimeout(() => {
      setContent(contentSrc);
      setIsLoading(false);
    }, 1000);
  }, [contentSrc]);
  const handleClickOutside = event => {
    if (event.target.className === "modal") {
      closeModal(id);
    }
  };
  if (!isOpen) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "modal",
    style: {
      display: isOpen ? "block" : "none"
    },
    onClick: handleClickOutside
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, isLoading ? /*#__PURE__*/_react.default.createElement("div", null, "Chargement...") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, content), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => closeModal(id)
  }, "Fermer"))));
};
var _default = exports.default = Modal;