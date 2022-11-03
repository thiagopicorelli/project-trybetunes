import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsApi from '../services/searchAlbumsAPI';

const MIN_LENGTH_ARTIST = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumsArtist: '',
      isSearched: false,
      albums: [],
      searchIsDisabled: true,
      isLoading: false,
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

  searchAlbum = () => {
    const { artist } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      artist: '',
      albumsArtist: artist,
      isLoading: true,
    }));

    searchAlbumsApi(artist).then((albums) => {
      this.setState((prevState) => ({
        ...prevState,
        artist: '',
        albums,
        isSearched: true,
        isLoading: false,
      }));
    });
  };

  searchPage = (artist, searchIsDisabled) => (
    <div className="search-box">
      <input
        value={ artist }
        data-testid="search-artist-input"
        onChange={ this.onInputChange }
      />
      <button
        type="button"
        data-testid="search-artist-button"
        disabled={ searchIsDisabled }
        onClick={ this.searchAlbum }
      >
        Pesquisar
      </button>
    </div>
  );

  albumElement = (album) => (
    <div key={ album.collectionId }>
      <Link
        data-testid={ `link-to-album-${album.collectionId}` }
        to={ `/album/${album.collectionId}` }
      >
        { album.collectionName }
      </Link>
    </div>
  );

  albumsSection = (albumsArtist, albums) => (
    <div className="albums-section">
      <span>{ `Resultado de álbuns de: ${albumsArtist}` }</span>

      <div className="albums-list">
        { albums.length > 0
          ? albums.map((album) => this.albumElement(album))
          : <h3>Nenhum álbum foi encontrado</h3> }
      </div>
    </div>
  );

  render() {
    const {
      artist,
      albumsArtist,
      albums,
      isSearched,
      searchIsDisabled,
      isLoading,
    } = this.state;
    return (
      <div data-testid="page-search">
        { isLoading ? <Loading /> : this.searchPage(artist, searchIsDisabled) }
        { isSearched ? this.albumsSection(albumsArtist, albums) : '' }
      </div>
    );
  }
}

export default Search;
