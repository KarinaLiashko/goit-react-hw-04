import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchedPhotos } from "./image-api";
import "./App.css";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [maxPages, setMaxPages] = useState();

  useEffect(() => {
    if (topic === "") return; // Only fetch data if there is a valid topic

    async function getPhoto() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetchedPhotos(topic, page);

        const newImages = Array.isArray(res.images) ? res.images : [];

        setPhotos(prevImage => [...prevImage, ...newImages]);
        setMaxPages(res.totalPages || 1);
        if (page > 1) smoothScroll();
      } catch (err) {
        console.error("API fetch error: ", err);
        setError("You have a bad request");
      } finally {
        setLoading(false);
      }
    }

    getPhoto();
  }, [topic, page]);

  const handleSearch = newTopic => {
    setPhotos([]);
    setTopic(newTopic);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < maxPages) setPage(page + 1);
  };

  const openModal = imageUrl => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const smoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSearch} />

        {photos.length > 0 && (
          <ImageGallery photos={photos} onImageClick={openModal} />
        )}

        {loading && <Loader />}

        {photos.length > 0 && !loading && (
          <LoadMoreBtn loadMore={handleLoadMore} />
        )}

        {page > maxPages && <div className="notification">No more images</div>}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            src={selectedImage}
          />
        )}
        {error && <ErrorMessage />}
      </div>
    </>
  );
}
