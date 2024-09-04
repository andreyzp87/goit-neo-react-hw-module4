import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={style.imageGallery}>
      {images.map(image => (
        <li className={style.imageGalleryItem} key={image.id}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
