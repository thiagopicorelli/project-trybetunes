import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      cantSave: true,
      goToProfile: false,
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
      }), () => { this.checkLegalInput(); });
    });
  }

  wrongInputLength = (inputs) => {
    const inputNames = Object.keys(inputs);
    const inputAmmount = inputNames.length;
    let insertedInputs = 0;

    for (let i = 0; i < inputAmmount; i += 1) {
      if (inputs[inputNames[i]].length > 0) {
        insertedInputs += 1;
      }
    }

    return (insertedInputs !== inputAmmount);
  };

  checkLegalInput = () => {
    const { name, email, image, description } = this.state;
    const inputs = { name, email, image, description };
    const emailElement = document.getElementsByClassName('edit-input-email')[0];
    const emailIsValid = emailElement.validity.valid;
    this.setState((prevState) => ({
      ...prevState,
      cantSave: this.wrongInputLength(inputs) || !emailIsValid,
    }));
  };

  onInputChange = (event) => {
    const id = event.target.getAttribute('idd');
    const { value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }), () => {
      this.checkLegalInput();
    });
  };

  saveProfile = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const { name, email, image, description } = this.state;
    const user = { name, email, image, description };
    updateUser(user).then(() => {
      this.setState((prevState) => ({
        ...prevState,
        goToProfile: true,
      }));
    });
  };

  profileEditPage = () => {
    const { name, email, image, description, cantSave } = this.state;
    return (
      <div className="page-profile-edit center">
        <div className="profile-edit-input">
          Nome:
          <Form.Control
            data-testid="edit-input-name"
            idd="name"
            value={ name }
            onChange={ this.onInputChange }
          />
        </div>
        <div className="profile-edit-input">
          E-mail:
          <Form.Control
            data-testid="edit-input-email"
            className="edit-input-email"
            type="email"
            idd="email"
            value={ email }
            onChange={ this.onInputChange }
          />
        </div>
        <div className="profile-edit-input">
          Descri????o:
          <Form.Control
            data-testid="edit-input-description"
            as="textarea"
            rows={ 3 }
            idd="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </div>
        <div className="profile-edit-input">
          Url do Avatar:
          <Form.Control
            data-testid="edit-input-image"
            idd="image"
            value={ image }
            onChange={ this.onInputChange }
          />
        </div>
        <Button
          variant="primary"
          data-testid="edit-button-save"
          onClick={ this.saveProfile }
          disabled={ cantSave }
        >
          Salvar
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, goToProfile } = this.state;
    return (
      <div data-testid="page-profile-edit">
        { isLoading ? <Loading /> : this.profileEditPage() }
        { goToProfile ? <Redirect to="/profile" /> : '' }
      </div>
    );
  }
}

export default ProfileEdit;
