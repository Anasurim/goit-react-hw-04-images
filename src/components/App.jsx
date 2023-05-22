import React, { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

export function App() {
  const [querry, setQuerry] = useState('');

  const handleFormSubmit = querry => {
    setQuerry(querry);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuerry={querry} />
    </>
  );
}

App.propTypes = {
  searchQuerry: PropTypes.string,
};
