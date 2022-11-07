import { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
    <div className="search-box center">
      <Form.Control
        value={ artist }
        data-testid="search-artist-input"
        onChange={ this.onInputChange }
      />
      <Button
        data-testid="search-artist-button"
        disabled={ searchIsDisabled }
        onClick={ this.searchAlbum }
      >
        Pesquisar
      </Button>
    </div>
  );

  albumElement = (album) => (
    <Link
      data-testid={ `link-to-album-${album.collectionId}` }
      to={ `/album/${album.collectionId}` }
    >
      <div key={ album.collectionId } className="albums-list-element">
        <img alt={ album.collectionName } src={ album.artworkUrl100 } />
        { album.collectionName }
      </div>
    </Link>
  );

  albumsSection = (albumsArtist, albums) => (
    <div className="albums-section">
      <span>{ `Resultado de álbuns de: ${albumsArtist}\n` }</span>
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
      <div data-testid="page-search" className="page-search center">
        { isLoading ? <Loading /> : this.searchPage(artist, searchIsDisabled) }
        { isSearched ? this.albumsSection(albumsArtist, albums) : '' }
      </div>
    );
  }
}

export default Search;
