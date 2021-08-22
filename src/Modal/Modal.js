import './Modal.css';
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

const Modal = ({ toggleModal, children }) => {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className="Overlay">
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;