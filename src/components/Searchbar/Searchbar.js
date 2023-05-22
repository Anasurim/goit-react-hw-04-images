import React, { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    querry: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.querry.trim() === '') {
      return Notify.failure('Type something');
    }
    this.props.onSubmit(this.state.querry);

    this.setState({ querry: '' });
  };

  handleChange = e => {
    this.setState({ querry: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <>
        <div className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchFormButton}>
              <BiSearch />
            </button>

            <input
              className={css.SearchFormInput}
              type="text"
              onChange={this.handleChange}
              value={this.state.querry}
              autoComplete="off"
              autoFocus
              placeholder="Search"
            />
          </form>
        </div>
      </>
    );
  }
}

Searchbar.propTypes = {
  querry: PropTypes.string,
};
