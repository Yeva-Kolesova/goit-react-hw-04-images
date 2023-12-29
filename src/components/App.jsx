import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getImages } from '../API/api';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setShowModal(true);
    setLargeImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { hits } =
          query &&
          (await getImages({
            query,
            page,
          }));

        setImages(prev => [...prev, ...hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getData();
    }
  }, [page, query]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length >= 12 && <Button onClick={handleLoadMore} />}

      {showModal && (
        <Modal largeImageURL={largeImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
