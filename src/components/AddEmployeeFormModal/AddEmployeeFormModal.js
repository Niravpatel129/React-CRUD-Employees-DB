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
    color: ''
  };

  componentDidMount() {
    this.getHighestId();
  }

  getHighestId = async () => {
    try {
      const res = await axios.get(this.props.apiURL('/api/getHighestId'));
      this.setState({ id: res.data.id + 1 });
    } catch (e) {
      console.log(e);
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal = () => {
    this.props.closeModal();
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(this.props.apiURL('/api/addEmployee'), {
        id: this.state.id,
        name: this.state.name,
        code: this.state.code,
        profession: this.state.profession,
        city: this.state.city,
        branch: this.state.branch,
        color: this.state.color,
        assigned: true
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
      }, 100);
    } catch (e) {
      console.log(e);
    }
  };

  renderInputs = () => {
    const keys = Object.keys(this.state);

    return keys.map(key => {
      return (
        <div key={key}>
          <input
            type={key === 'id' ? 'number' : 'text'}
            placeholder={key}
            name={key}
            list={key}
            value={this.state[key]}
            onChange={this.handleInputChange}
            required
          />
          {key === 'code' && (
            <datalist id={key}>
              <option>F{parseInt(this.state.id, 0) + 99}</option>
            </datalist>
          )}
          {key === 'profession' && (
            <datalist id={key}>
              <option>Drywall Installer</option>
              <option>Runner</option>
            </datalist>
          )}
          {key === 'city' && (
            <datalist id={key}>
              <option>Brampton</option>
              <option>Toronto</option>
              <option>Bolton</option>
            </datalist>
          )}
          {key === 'branch' && (
            <datalist id={key}>
              <option>Pillsworth</option>
              <option>Abacus</option>
              <option>Potterwoods</option>
            </datalist>
          )}
          {key === 'color' && (
            <datalist id={key}>
              <option>red</option>
              <option>blue</option>
              <option>green</option>
            </datalist>
          )}
        </div>
      );
    });
  };

  render() {
    return (
      <section>
        <Modal visible={true} onClickAway={this.closeModal}>
          <div>
            <form id="msform" onSubmit={this.handleSubmit}>
              <fieldset>{this.renderInputs()}</fieldset>
              <input type="submit" name="Submit" className="next action-button" value="Submit" required />{' '}
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
  globalAlerts: propTypes.func
};

export default AddEmployeeFormModal;
