import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
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

    getMusics(id).then((musicsRaw) => {
      const musics = [...musicsRaw];
      const collection = musics.shift();
      this.setState((prevState) => ({
        ...prevState,
        artistName: collection.artistName,
        albumName: collection.collectionName,
        musicCards: musics.map((music, key) => (
          <MusicCard
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            key={ key }
          />
        )),
        isLoading: false,
      }));
    });
  }

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
