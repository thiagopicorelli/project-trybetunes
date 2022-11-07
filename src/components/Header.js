import { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/640px-Black_colour.jpg',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      const { name, image } = user;
      this.setState((prevState) => ({
        ...prevState,
        name,
        image,
        isLoading: false,
      }));
    });
  }

  headerDiv = (name, image) => (
    <div className="header-section center">
      <div className="header-user center">
        <div className="user-image">
          <img className="user-image" alt={ name } src={ image } />
        </div>
        <div data-testid="header-user-name" className="header-user-name">
          { name }
        </div>
      </div>
      <div className="header-links">
        <Link to="/search" data-testid="link-to-search">
          <Button variant="outline-light" size="lg">Search</Button>
        </Link>
        <span> </span>
        <Link to="/favorites" data-testid="link-to-favorites">
          <Button variant="outline-light" size="lg">Favorites</Button>
        </Link>
        <span> </span>
        <Link to="/profile" data-testid="link-to-profile">
          <Button variant="outline-light" size="lg">Profile</Button>
        </Link>
      </div>
    </div>
  );

  render() {
    const { name, image, isLoading } = this.state;
    return (
      <div data-testid="header-component" className="header-component">
        { isLoading ? <Loading /> : this.headerDiv(name, image) }
      </div>
    );
  }
}

export default Header;
