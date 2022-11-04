import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, trackId, previewUrl, favorite, onFavoriteChange } = this.props;
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
            onChange={ onFavoriteChange }
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
  favorite: PropTypes.bool.isRequired,
  onFavoriteChange: PropTypes.func.isRequired,
};

export default MusicCard;
