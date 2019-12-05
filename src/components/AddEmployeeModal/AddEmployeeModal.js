// Npm Modules
import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Modal from 'react-awesome-modal';

// Local css imports
import './AddEmployeeModal.css';

class AddEmployeeModal extends Component {
  state = {
    id: '',
    name: '',
    code: '',
    profession: '',
    city: '',
    branch: '',
    color: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal = () => {
    this.props.closeModal();
  };

  handleSubmit = async e => {
    e.preventDefault();
    await axios.post(this.props.apiURL('/api/addEmployee'), {
      id: this.state.id,
      name: this.state.name,
      code: this.state.code,
      profession: this.state.profession,
      city: this.state.city,
      branch: this.state.branch,
      color: this.state.color,
      assigned: true,
    });

    setTimeout(() => {
      this.props.getEmployees();
      this.props.globalAlerts('Added!');
      this.props.closeModal();
    }, 50);
  };

  renderInputs = () => {
    const keys = [
      'id',
      'name',
      'code',
      'profession',
      'city',
      'branch',
      'color',
    ];

    return keys.map(key => (
      <div className="shareholder" key={key}>
        <input
          type={key === 'id' ? 'number' : 'text'}
          placeholder={key}
          name={key}
          value={this.state[key]}
          onChange={this.handleInputChange}
        />
      </div>
    ));
  };

  render() {
    return (
      <section>
        <Modal visible={true} onClickAway={this.closeModal}>
          <div>
            <form id="msform" onSubmit={this.handleSubmit}>
              <fieldset>{this.renderInputs()}</fieldset>
              <input
                type="submit"
                name="Submit"
                className="next action-button"
                value="Submit"
                required
              />{' '}
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}

AddEmployeeModal.propTypes = {
  closeModal: propTypes.func,
  getEmployees: propTypes.func,
  globalAlerts: propTypes.func,
};

export default AddEmployeeModal;
