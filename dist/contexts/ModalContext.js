"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModals = exports.ModalProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
const ModalContext = /*#__PURE__*/(0, _react.createContext)();
const useModals = () => (0, _react.useContext)(ModalContext);
exports.useModals = useModals;
const ModalProvider = _ref => {
  let {
    children
  } = _ref;
  // On utilise un objet pour gérer l'état ouvert/fermé de plusieurs modales
  const [modals, setModals] = (0, _react.useState)({});
  const openModal = id => setModals({
    ...modals,
    [id]: true
  });
  const closeModal = id => setModals({
    ...modals,
    [id]: false
  });

  // Gère la fermeture de toutes les modales avec la touche Esc
  (0, _react.useEffect)(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) setModals({});
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(ModalContext.Provider, {
    value: {
      modals,
      openModal,
      closeModal
    }
  }, children);
};
exports.ModalProvider = ModalProvider;