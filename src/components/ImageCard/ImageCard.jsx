import styles from "./ImageCard.module.css";

export default function ImageCard({ imageSrc, altInfo, onClick }) {
  return (
    <>
      <div>
        <img
          src={imageSrc}
          alt={altInfo}
          className={styles.img}
          onClick={onClick}
        />
      </div>
    </>
  );
}
