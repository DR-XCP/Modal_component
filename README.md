# react-modal-fromdr

## Description:

The react-modal-fromdr plugin provides a complete and flexible solution for integrating modal windows into your React applications.

## Features

-  Display of dynamic content in modals.
-  Full customization of the modal's style.
-  Management of opening and closing with animation and focus.
-  Easy integration into any React project through context and hooks.

## How to install :

Use the command :

##### npm

```bash
npm i react-modal-fromdr
```

or

##### yarn

```bash
yarn add react-modal-fromdr
```

## Important Imports :

**Before you start using** react-modal-fromdr in your project, make sure to import the main component and any required styles as follows:

In the file **wrapping** the **App**

```JavaScript
import { ModalProvider } from "react-modal-fromdr/dist/contexts/ModalContext";
```

In the component where the **modal** is **used**

```JavaScript
import Modal from "react-modal-fromdr/dist/Modal";
import { useModals } from "react-modal-fromdr/dist/contexts/ModalContext";
import "react-modal-fromdr/dist/global.css";
```

## Usage Example :

To use this component in your React project, follow these steps:

1. **Wrap your application with 'ModalProvider'** to make the modal context accessible throughout the application.
2. **Use the 'ModalContext'** to access the **openModal** and **closeModal** functions, allowing you to open and close modals wherever you are in the component tree.
3. **Open modals** by passing the desired content and a unique identifier to the '**openModal**' function.

```JavaScript
import { useState } from "react";
import Modal from "react-modal-fromdr/dist/Modal";
import { useModals } from "react-modal-fromdr/dist/contexts/ModalContext";
import "react-modal-fromdr/dist/global.css";

export function App() {
   const { openModal, closeModal } = useModals();
   const [modalContent, setModalContent] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      const message = "Welcome in!";
      setModalContent(message);
      openModal("simpleModal");
      setIsModalOpen(true);
   };

   return (
      <div className="mainContainer">
         <h1>My Form</h1>
         <form className="formContainer" onSubmit={handleSubmit}>
            <div>
               <label htmlFor="username">Username</label>
               <input type="text" />
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input type="text" />
            </div>
            <button className="button" type="submit">
               Submit
            </button>
         </form>
         <div className="modalContainer">
            <Modal
               id="simpleModal"
               isOpen={isModalOpen}
               onClose={() => {
                  closeModal("simpleModal");
                  setIsModalOpen(false);
               }}
               contentSrc={modalContent}
               styles={{
                  // Color and opacity of the modal's backdrop
                  backdrop: {
                     backgroundColor: "rgba(0,0,0,0.5)",
                  },
                  // Modal stylization
                  modal: {
                     width: "150px",
                     height: "40px",
                     borderRadius: "8px",
                  },
                  // Close button positioning within the modal
                  closeButton: {
                     top: "10px",
                  },
                  // General position of the modal within the viewport
                  container: {
                     top: "-150px",
                  },
                  // Icon color inside the close button
                  icon: {
                     color: "blue",
                  },
               }}
            />
         </div>
      </div>
   );
}
```

## Props :

The following props are available for the `Modal`

|      Props | Description                                                         |
| ---------: | ------------------------------------------------------------------- |
|         id | Identifier for the modal element                                    |
| contentSrc | URL to load the modal's content if it needs to be fetched           |
|     isOpen | Boolean to control the modal's visibility                           |
|    onClose | Function called when the modal is requested to close                |
|     styles | Object containing style overrides for the modal, its backdrop, etc. |

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](src/lib/LICENSE.txt) pour plus de détails.
