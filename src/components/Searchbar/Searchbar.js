import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [querry, setQuerry] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (querry.trim() === '') {
      return Notify.failure('Type something');
    }
    onSubmit(querry);

    setQuerry('');
  };

  const handleChange = e => {
    setQuerry(e.currentTarget.value.toLowerCase());
  };

  return (
    <>
      <div className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearch />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            onChange={handleChange}
            value={querry}
            autoComplete="off"
            autoFocus
            placeholder="Search"
          />
        </form>
      </div>
    </>
  );
}

Searchbar.propTypes = {
  querry: PropTypes.string,
};
