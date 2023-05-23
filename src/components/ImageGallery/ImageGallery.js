import React, { useState, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { fetchImages } from '../Services/ImageAPI';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import css from '../ImageGallery/Gallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({ searchQuerry }) {
  const [imageHits, setImageHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [shownModal, setShownModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuerry) {
        return;
      }
      setIsLoading(true);

      try {
        const response = await fetchImages(searchQuerry);
        if (response !== undefined) {
          setImageHits(response);
          setPage(1);
        } else {
          resetPage();
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuerry]);

  const toggleModal = () => {
    setShownModal(prevState => !prevState);
  };

  const resetPage = () => {
    setImageHits([]);
    setPage(1);
  };

  const onClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetchImages(searchQuerry, page + 1);

      if (response !== undefined) {
        setImageHits(prevHits => [...prevHits, ...response]);
        setPage(prevPage => prevPage + 1);
      } else {
        resetPage();
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
    toggleModal();
  };

  return (
    <>
      <div className={css.App}>
        {error && <h2>Something went wrong...</h2>}
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {imageHits && (
          <ul className={css.ImageGallery}>
            <ImageGalleryItem images={imageHits} onClick={handleImageClick} />
          </ul>
        )}
        {imageHits.length >= 12 && <Button onClick={onClick} />}
        {shownModal && (
          <Modal onClose={toggleModal} imageUrl={selectedImage}></Modal>
        )}
      </div>
    </>
  );
}

ImageGallery.propTypes = {
  isLoading: PropTypes.bool,

  page: PropTypes.number,
  shownModal: PropTypes.bool,
  selectedImage: PropTypes.string,
};
