import style from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  const imageClicked = () => {
    onClick(image);
  };
  return (
    <div onClick={imageClicked} className={style.imageCard}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
