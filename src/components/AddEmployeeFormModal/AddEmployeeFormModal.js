import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Modal from 'react-awesome-modal';

import './AddEmployeeFormModal.css';

class AddEmployeeFormModal extends Component {
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
    let res = await axios.post(this.props.apiURL('/api/addEmployee'), {
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
      if (res.status === 200) {
        this.props.globalAlerts('Added!');
        this.props.getEmployees();
        this.closeModal();
      } else {
        this.props.globalAlerts('You cannot use the same id!!', 'error');
        this.closeModal();
      }
    }, 70);
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
      <div key={key}>
        <input
          type={key === 'id' ? 'number' : 'text'}
          placeholder={key}
          name={key}
          value={this.state[key]}
          onChange={this.handleInputChange}
          required
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

AddEmployeeFormModal.propTypes = {
  closeModal: propTypes.func,
  getEmployees: propTypes.func,
  globalAlerts: propTypes.func,
};

export default AddEmployeeFormModal;
