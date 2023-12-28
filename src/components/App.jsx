import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [page, setPage] = useState(1);

  const API_KEY = '40728450-e65c4b62446cf65c4bf21b685';

  const fetchImages = useCallback(() => {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=12`;

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [API_KEY, query, page]);

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
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
