import { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicCards: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.updateMusicElementState();
  }

  musicCardsCreator = (musics) => (
    musics.map((music, key) => (
      <MusicCard
        trackName={ music.trackName }
        trackId={ parseInt(music.trackId, 10) }
        previewUrl={ music.previewUrl }
        favorite
        onFavoriteChange={ this.onFavoriteChange }
        key={ key }
      />
    ))
  );

  updateMusicElementState = () => {
    getFavoriteSongs().then((musics) => {
      this.setState((prevState) => ({
        ...prevState,
        musicCards: this.musicCardsCreator(musics),
        isLoading: false,
      }));
    });
  };

  onFavoriteChange = (event) => {
    const id = event.target.getAttribute('id');
    const song = { trackId: parseInt(id, 10) };

    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    removeSong(song).then(() => {
      this.updateMusicElementState();
    });
  };

  favoritesPage = () => {
    const { musicCards } = this.state;
    return (
      <div>
        { musicCards }
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        { isLoading ? <Loading /> : this.favoritesPage() }
      </div>
    );
  }
}

export default Favorites;
