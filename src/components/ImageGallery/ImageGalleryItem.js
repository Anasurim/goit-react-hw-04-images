import React from 'react';
import css from '../ImageGallery/Gallery.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ images, onClick }) {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li key={id} className={css.ImageGalleryItem}>
            <img
              src={webformatURL}
              alt="user_image"
              className={css.ImageGalleryItemImage}
              onClick={() => onClick(largeImageURL)}
            />
          </li>
        );
      })}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
