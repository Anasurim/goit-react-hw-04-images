import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    searchQuerry: '',
  };

  handleFormSubmit = querry => {
    this.setState({ searchQuerry: querry });
  };

  render() {
    const { searchQuerry } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuerry={searchQuerry} />
      </>
    );
  }
}

App.propTypes = {
  searchQuerry: PropTypes.string,
};
