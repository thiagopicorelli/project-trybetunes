import { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';
import ToggleButton from 'react-bootstrap/ToggleButton';

class MusicCard extends Component {
  render() {
    const { trackName, trackId, previewUrl, favorite, onFavoriteChange } = this.props;
    return (
      <div className="music-card">
        <span>{ trackName }</span>
        <div className="music-player">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento audio.
          </audio>
          <ToggleButton
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            className="music-player-favorite rounded-circle"
            variant="outline-primary"
            checked={ favorite }
            onChange={ onFavoriteChange }
          >
            <AiOutlineStar />
          </ToggleButton>
        </div>
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
