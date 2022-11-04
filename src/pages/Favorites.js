import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends Component {
  favoritesPage = (
    <div></div>
  );

  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((musics) => {
      console.log(musics);
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        { isLoading ? <Loading /> : this.favoritesPage }
      </div>
    );
  }
}

export default Favorites;
