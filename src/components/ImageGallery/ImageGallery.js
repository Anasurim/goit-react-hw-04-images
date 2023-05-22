import React, { Component } from 'react';
import { Button } from 'components/Button/Button';
import { fetchImages } from '../Services/ImageAPI';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import css from '../ImageGallery/Gallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    imageHits: [],
    isLoading: false,
    error: null,
    page: 1,
    shownModal: false,
    selectedImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuerry = prevProps.searchQuerry;
    const nextQuerry = this.props.searchQuerry;

    if (prevQuerry !== nextQuerry) {
      this.setState({ isLoading: true });

      try {
        const response = await fetchImages(nextQuerry);

        if (response !== undefined) {
          return this.setState({
            imageHits: response,
          });
        }

        this.resetPage();
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  resetPage = () => {
    this.setState({ imageHits: [], page: 1 });
  };

  onClick = async () => {
    const { searchQuerry } = this.props;
    const { page } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await fetchImages(searchQuerry, page + 1);

      if (response !== undefined) {
        return this.setState(prevState => ({
          imageHits: [...prevState.imageHits, ...response],
          page: prevState.page + 1,
        }));
      }

      this.resetPage();
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ shownModal }) => ({
      shownModal: !shownModal,
    }));
  };

  render() {
    const { imageHits, isLoading, error, shownModal, selectedImage } =
      this.state;

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
              <ImageGalleryItem
                images={imageHits}
                onClick={this.handleImageClick}
              />
            </ul>
          )}
          {imageHits.length >= 12 && <Button onClick={this.onClick} />}
          {shownModal && (
            <Modal onClose={this.toggleModal} imageUrl={selectedImage}></Modal>
          )}
        </div>
      </>
    );
  }
}

ImageGallery.propTypes = {
  isLoading: PropTypes.bool,

  page: PropTypes.number,
  shownModal: PropTypes.bool,
  selectedImage: PropTypes.string,
};
