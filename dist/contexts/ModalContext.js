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
  // Référence pour stocker l'élément qui avait le focus avant l'ouverture de la modale
  const lastFocusedElement = (0, _react.useRef)(null);
  const openModal = function () {
    let id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : generateId();
    // Enregistrer l'élément actuellement focalisé
    lastFocusedElement.current = document.activeElement;
    setModals({
      ...modals,
      [id]: true
    });
    return id;
  };
  const closeModal = id => {
    setModals({
      ...modals,
      [id]: false
    });
    // Restaurer le focus à l'élément précédent après la fermeture de la modale
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  };

  // Gérer la fermeture des modales avec la touche Échap
  (0, _react.useEffect)(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        // KeyCode 27 = Échap
        setModals(currentModals => {
          const newModals = {
            ...currentModals
          };
          Object.keys(newModals).forEach(id => newModals[id] = false);
          return newModals;
        });
        // Restaurer le focus après fermeture par touche Échap
        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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