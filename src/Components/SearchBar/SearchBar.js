import { useState } from 'react';
import './SearchBar.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchWord, setSearchWord] = useState("");

  const inputChangeHandler = (evt) => {
    setSearchWord(evt.target.value);
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    onSubmit(searchWord);
    reset();
  };

  const reset = () => {
    setSearchWord("");
  };

  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={formSubmitHandler}>
          <button type="submit" className="SearchFormButton">
            <span className="SearchFormButtonLabel">Search</span>
          </button>

          <input
            onChange={inputChangeHandler}
            className="SearchFormInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchWord}
          />
        </form>
      </header>
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;