import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
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
    if (topic === "") {
      return;
    }

    async function getPhoto() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchedPhotos(topic, page);
        setPhotos(prevImage => [...prevImage, ...res.images]);
        setMaxPages(res.totalPages);
        if (page > 1) {
          smoothScroll();
        }
      } catch (error) {
        setError(true);
        toast.dismiss();
        toast.error("You have a bad request", { duration: 1500 });
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
    setPage(page + 1);
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
        <Toaster />

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
