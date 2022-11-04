import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  musics = [];

  favoriteSongs = [];

  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      musicCards: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    getFavoriteSongs().then((favoriteSongs) => {
      this.favoriteSongs = favoriteSongs;
      this.createMusicElements(id);
    });
  }

  musicCardsCreator = () => (
    this.musics.map((music, key) => (
      <MusicCard
        trackName={ music.trackName }
        trackId={ music.trackId }
        previewUrl={ music.previewUrl }
        favorite={ this.favoriteSongs.find(
          (song) => (song.trackId === music.trackId),
        ) !== undefined }
        onFavoriteChange={ this.onFavoriteChange }
        key={ key }
      />
    ))
  );

  createMusicElements = (id) => {
    getMusics(id).then((musics) => {
      this.musics = [...musics];
      const collection = this.musics.shift();
      this.setState((prevState) => ({
        ...prevState,
        artistName: collection.artistName,
        albumName: collection.collectionName,
        musicCards: this.musicCardsCreator(),
        isLoading: false,
      }));
    });
  };

  updateMusicElementState = () => {
    getFavoriteSongs().then((favoriteSongs) => {
      this.favoriteSongs = favoriteSongs;
      this.setState((prevState) => ({
        ...prevState,
        musicCards: this.musicCardsCreator(),
        isLoading: false,
      }));
    });
  };

  onFavoriteChange = (event) => {
    const id = event.target.getAttribute('id');
    const song = this.musics.find((music) => (music.trackId === parseInt(id, 10)));
    const { checked } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    if (checked) {
      addSong(song).then(() => {
        this.updateMusicElementState();
      });
    } else {
      removeSong(song).then(() => {
        this.updateMusicElementState();
      });
    }
  };

  albumPage = () => {
    const { musicCards, artistName, albumName } = this.state;
    return (
      <div className="page-album">
        <div className="artist">
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ albumName }</h3>
        </div>

        <div className="music-card-list">
          { musicCards }
        </div>
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="page-album-all" data-testid="page-album">
        { isLoading ? <Loading /> : this.albumPage() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
