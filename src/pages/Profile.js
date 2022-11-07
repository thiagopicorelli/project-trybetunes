import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      const { name, email, image, description } = user;
      this.setState((prevState) => ({
        ...prevState,
        name,
        email,
        image,
        description,
        isLoading: false,
      }));
    });
  }

  profilePage = () => {
    const { name, email, image, description } = this.state;
    return (
      <div className="page-profile center">
        <div className="page-profile-user">
          <img
            alt={ name }
            src={ image }
            data-testid="profile-image"
            className="user-image-big"
          />
          <div className="page-profile-user-text">
            <span>{ name }</span>
            <span>{ email }</span>
            <span>{ description }</span>
          </div>
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        { isLoading ? <Loading /> : this.profilePage() }
      </div>
    );
  }
}

export default Profile;
