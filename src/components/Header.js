import { Component } from 'react';
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
    <div data-testid="header-user-name">
      { name }
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
