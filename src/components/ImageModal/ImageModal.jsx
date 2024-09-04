import Modal from 'react-modal';
import style from './ImageModal.module.css';

Modal.setAppElement('#root');

const defaultStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
  },
};

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Full Image"
      style={defaultStyles}
    >
      {image && (
        <img
          className={style.modalImage}
          src={image.urls.regular}
          alt={image.alt_description}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
