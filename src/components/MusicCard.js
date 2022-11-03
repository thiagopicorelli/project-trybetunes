import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };
  }

  onFavoriteChangeInt = (event) => {
    const { onFavoriteChange } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      favorite: true,
    }));

    onFavoriteChange(event);
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { favorite } = this.state;
    return (
      <div className="music-card">
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento audio.
        </audio>
        <label htmlFor={ trackId }>
          <input
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favorite }
            onChange={ this.onFavoriteChangeInt }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  onFavoriteChange: PropTypes.func.isRequired,
};

export default MusicCard;
