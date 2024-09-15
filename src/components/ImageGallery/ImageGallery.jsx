import styles from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={styles.ul}>
      {photos.map((item, index) => (
        <li className={styles.li} key={`${item.id}-${index}`}>
          <ImageCard
            imageSrc={item.urls.small}
            altInfo={item.alt_description}
            onClick={() => onImageClick(item.urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
