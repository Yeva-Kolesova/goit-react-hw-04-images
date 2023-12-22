import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { v4 as uuidv4 } from 'uuid';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem key={uuidv4()} image={image} onClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
