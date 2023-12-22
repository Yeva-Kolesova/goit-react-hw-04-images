import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onClick(image.largeImageURL)}
    >
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
