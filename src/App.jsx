import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import { getImagesResponse } from './api/unsplash';
import { Toaster } from 'react-hot-toast';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const onSubmit = q => {
    if (q === query) return;

    setPage(1);
    setImages([]);
    setQuery(q);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    async function updateImages() {
      console.log(query, page, images.length);

      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getImagesResponse({ query, page });
        console.log(response);
        setImages(prevImages => [...prevImages, ...response.results]);
        setTotalPages(response.total_pages);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }

    updateImages();
  }, [query, page]);

  const handleImageClick = image => {
    setModalImage(image);
  };

  const handleModalClose = () => {
    setModalImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={onSubmit} />
      {!error && images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {!error && page < totalPages && <LoadMoreBtn onPress={loadMore} />}
      {error && <ErrorMessage error={error} />}
      <ImageModal image={modalImage} onClose={handleModalClose} />
      <Toaster />
    </div>
  );
}

export default App;
