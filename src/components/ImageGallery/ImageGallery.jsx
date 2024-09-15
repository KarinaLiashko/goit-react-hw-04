import styles from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ photos, onImageClick }) {
  return (
    <ul className={styles.ul}>
      {photos.map(item => {
        return (
          <li className={styles.li} key={item.id}>
            <ImageCard
              photos={item.urls.small}
              altInfo={item.alt_description}
              onClick={() => onImageClick(item.urls.regular)}
              click={() => onImageClick(item.urls.regular)}
            />
          </li>
        );
      })}
    </ul>
  );
}
