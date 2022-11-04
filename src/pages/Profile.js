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
      <div className="page-profile">
        <img alt={ name } src={ image } data-testid="profile-image" />
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
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
