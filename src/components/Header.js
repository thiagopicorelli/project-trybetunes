import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: 'a',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      const { name } = user;
      this.setState((prevState) => ({
        ...prevState,
        name,
        isLoading: false,
      }));
    });
  }

  headerDiv = (name) => (
    <div className="header-section">
      <div data-testid="header-user-name">
        { name }
      </div>
      <Link to="/search" data-testid="link-to-search">Search</Link>
      <span> </span>
      <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
      <span> </span>
      <Link to="/profile" data-testid="link-to-profile">Profile</Link>
    </div>
  );

  render() {
    const { name, isLoading } = this.state;
    return (
      <div data-testid="header-component">
        { isLoading ? <Loading /> : this.headerDiv(name) }
      </div>
    );
  }
}

export default Header;
