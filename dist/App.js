"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("./Modal"));
var _ModalContext = require("./contexts/ModalContext");
const App = () => {
  // const { openModal } = useModals();
  const [isModalOpen, setIsModalOpen] = (0, _react.useState)(false);
  const {
    openModal,
    closeModal
  } = (0, _ModalContext.useModals)();

  // const handleClick = () => {
  //    openModal("modal");
  // };

  // Fonction pour ouvrir la modale
  const handleOpenModal = () => setIsModalOpen(true);

  // Fonction pour fermer la modale
  const handleCloseModal = () => setIsModalOpen(false);
  (0, _react.useEffect)(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        // KeyCode 27 est pour Échap
        setIsModalOpen(false); // Ferme la modale
      }
    };

    // Ajoute l'écouteur d'événement lors du montage du composant
    document.addEventListener("keydown", handleKeyDown);

    // Nettoie l'écouteur lors du démontage du composant
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    /*#__PURE__*/
    // <>
    //    <button type="button" className="open-btn" onClick={handleClick}>
    //       Ouvrir
    //    </button>
    //    <Modal id="modal" contentSrc={"Contenu de la modal"} />
    // </>
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ModalContext.ModalProvider, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "open-btn",
      onClick: handleOpenModal
    }, "Ouvrir Modal"), /*#__PURE__*/_react.default.createElement("form", {
      onSubmit: e => {
        e.preventDefault(); // Empêche le rechargement de la page
        handleOpenModal(); // Ouvre la modale
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      placeholder: "Tape quelque chose..."
    }), /*#__PURE__*/_react.default.createElement("button", {
      type: "submit"
    }, "Soumettre")), isModalOpen && /*#__PURE__*/_react.default.createElement(_Modal.default, {
      id: "modal",
      contentSrc: "Contenu de la modal",
      isOpen: isModalOpen,
      onClose: handleCloseModal
    }))))
  );
};
var _default = exports.default = App;