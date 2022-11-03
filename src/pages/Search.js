import { Component } from 'react';

const MIN_LENGTH_ARTIST = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      searchIsDisabled: true,
    };
  }

  onInputChange = (event) => {
    const { value } = event.target;
    let searchIsDisabled = true;
    if (value.length >= MIN_LENGTH_ARTIST) {
      searchIsDisabled = false;
    }
    this.setState((prevState) => ({
      ...prevState,
      artist: event.target.value,
      searchIsDisabled,
    }));
  };

  render() {
    const { artist, searchIsDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <input
          value={ artist }
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ searchIsDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
