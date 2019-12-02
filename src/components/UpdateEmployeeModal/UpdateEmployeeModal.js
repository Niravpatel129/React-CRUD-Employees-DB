import React, { Component } from "react";
import propTypes from "prop-types";

import Modal from "react-awesome-modal";

import "./UpdateEmployeeModal.css";

import axios from "axios";

class UpdateEmployeeModal extends Component {
  constructor(props) {
    super(props);
    // destructing from props and setting it to state
    const {
      _id,
      id,
      name,
      code,
      profession,
      city,
      branch,
      color
    } = this.props.data;

    this.state = {
      visible: false,
      _id,
      id,
      name,
      code,
      profession,
      city,
      branch,
      color
    };
  }

  componentDidMount() {
    this.setState({ visible: this.props.visible });
    this.id = this.props.data.id;
  }

  closeModal() {
    this.props.toggleUpdateModal();
  }

  handleIdChange = event => {
    this.setState({ id: event.target.value });
    this.id = event.target.value;
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
    this.name = event.target.value;
  };

  handleCodeChange = event => {
    this.setState({ code: event.target.value });
    this.code = event.target.value;
  };

  handleProfessionChange = event => {
    this.setState({ profession: event.target.value });
    this.profession = event.target.value;
  };

  handleCityChange = event => {
    this.setState({ city: event.target.value });
    this.city = event.target.value;
  };

  handleBranchChange = event => {
    this.setState({ branch: event.target.value });
    this.branch = event.target.value;
  };

  handleColorChange = event => {
    this.setState({ color: event.target.value });
    this.color = event.target.value;
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(this.props.apiURL + "/api/updateEmployee", {
        _id: this.state._id, // hidden primary key
        id: this.state.id,
        name: this.state.name,
        code: this.state.code,
        profession: this.state.profession,
        city: this.state.city,
        branch: this.state.branch,
        color: this.state.color,
        assigned: true
      })
      .then(() => {
        setTimeout(() => {
          this.props.globalAlerts("Updated!");
          this.props.getEmployees();
        }, 70);
      });

    this.closeModal();
  };

  render() {
    return (
      <section>
        <Modal
          visible={true}
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <form id="msform" onSubmit={this.handleSubmit}>
              <fieldset>
                <input
                  type="number"
                  name="id"
                  onChange={this.handleIdChange}
                  value={this.state.id}
                  required
                />
                <input
                  type="text"
                  name="name"
                  onChange={this.handleNameChange}
                  value={this.state.name}
                  required
                />
                <input
                  type="text"
                  name="code"
                  onChange={this.handleCodeChange}
                  value={this.state.code}
                  required
                />
                <input
                  type="text"
                  name="profession"
                  onChange={this.handleProfessionChange}
                  value={this.state.profession}
                  required
                />
                <input
                  type="text"
                  name="city"
                  onChange={this.handleCityChange}
                  value={this.state.city}
                  required
                />
                <input
                  type="text"
                  name="branch"
                  onChange={this.handleBranchChange}
                  value={this.state.branch}
                  required
                />
                <input
                  type="text"
                  name="color"
                  onChange={this.handleColorChange}
                  value={this.state.color}
                  required
                />
              </fieldset>
              <input
                type="submit"
                name="next"
                className="next action-button"
                value="Update"
                required
              />{" "}
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}

UpdateEmployeeModal.propTypes = {
  data: propTypes.object,
  toggleUpdateModal: propTypes.func,
  globalAlerts: propTypes.func,
  getEmployees: propTypes.func
};

export default UpdateEmployeeModal;
