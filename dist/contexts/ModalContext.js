"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModals = exports.ModalProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
// Création d'un contexte pour les modales
const ModalContext = /*#__PURE__*/(0, _react.createContext)();

// Hook personnalisé pour accéder au contexte des modales facilement
const useModals = () => (0, _react.useContext)(ModalContext);

// Génération d'un ID unique pour chaque modale
exports.useModals = useModals;
const generateId = () => "modal_".concat(new Date().getTime(), "_").concat(Math.random().toString(36).substring(2, 9));
const ModalProvider = _ref => {
  let {
    children
  } = _ref;
  // On utilise un objet pour gérer l'état ouvert/fermé de plusieurs modales
  const [modals, setModals] = (0, _react.useState)({});
  const openModal = function () {
    let id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : generateId();
    setModals({
      ...modals,
      [id]: true
    });
    return id;
  };
  const closeModal = id => setModals({
    ...modals,
    [id]: false
  });
  return /*#__PURE__*/_react.default.createElement(ModalContext.Provider, {
    value: {
      modals,
      openModal,
      closeModal
    }
  }, children);
};
exports.ModalProvider = ModalProvider;