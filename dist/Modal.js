"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ModalContext = require("./contexts/ModalContext");
const Modal = _ref => {
  let {
    id,
    contentSrc,
    onOpen
  } = _ref;
  const {
    modals,
    closeModal
  } = (0, _ModalContext.useModals)();
  const [content, setContent] = (0, _react.useState)("");
  const style = modals[id] ? "modal" : "modalClose";
  (0, _react.useEffect)(() => {
    if (modals[id]) {
      if (contentSrc) {
        setContent(contentSrc);
      } else {
        setContent("Aucun contenu...");
      }
    }
  }, [modals, id, contentSrc]);
  if (!modals[id]) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: style,
    id: id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("div", null, contentSrc), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => closeModal(id)
  }, "Fermer")));
};
var _default = exports.default = Modal;