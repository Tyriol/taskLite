import { useRef } from 'react';

const ModalDialogue = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <div>
      <button onClick={openModal}>About the App</button>
      <dialog ref={dialogRef}>
        <h2>About TaskLite</h2>
        <div>
          <p>
            Ever feel overwhelmed by a never ending todo list that you keep
            adding to, but never seem able to complete?
          </p>
          <p>
            That's why I created this todo list, that only allows you to add
            your 3 most important tasks for the day. You can only add more once
            you've ticked something off, so the most you'll ever have is 3!
          </p>
          <p>Get out there and get it done!</p>
        </div>
        <button onClick={closeModal}>Close</button>
      </dialog>
    </div>
  );
};

export default ModalDialogue;
