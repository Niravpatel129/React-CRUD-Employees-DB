import React, { Component } from "react";
import propTypes from "prop-types";

import Modal from "react-awesome-modal";

import axios from "axios";

import "./AddEmployeeModal.css";
class AddEmployeeModal extends Component {
  state = {
    id: "",
    name: "",
    code: "",
    profession: "",
    city: "",
    branch: "",
    color: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal() {
    this.props.closeModal();
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.apiURL);
    axios
      .post(this.props.apiURL + "/api/addEmployee", {
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
        console.log("added!");
        setTimeout(() => {
          this.props.closeModal();
          this.props.globalAlerts("Added!");
          this.props.getEmployees();
        }, 50);
      });
  };

  render() {
    return (
      <section>
        <Modal visible={true} onClickAway={() => this.closeModal()}>
          <div>
            <form id="msform" onSubmit={this.handleSubmit}>
              <fieldset>
                <input
                  type="number"
                  name="id"
                  onChange={this.handleInputChange}
                  value={this.state.id}
                  placeholder="id"
                  required
                />
                <input
                  type="text"
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                  placeholder="name"
                  required
                />
                <input
                  type="text"
                  name="code"
                  onChange={this.handleInputChange}
                  value={this.state.code}
                  placeholder="code"
                  required
                />
                <input
                  type="text"
                  name="profession"
                  onChange={this.handleInputChange}
                  value={this.state.profession}
                  placeholder="profession"
                  required
                />
                <input
                  type="text"
                  name="city"
                  onChange={this.handleInputChange}
                  value={this.state.city}
                  placeholder="city"
                  required
                />
                <input
                  type="text"
                  name="branch"
                  onChange={this.handleInputChange}
                  value={this.state.branch}
                  placeholder="branch"
                  required
                />
                <input
                  type="text"
                  name="color"
                  onChange={this.handleInputChange}
                  value={this.state.color}
                  placeholder="color"
                  required
                />
              </fieldset>
              <input
                type="submit"
                name="Submit"
                className="next action-button"
                value="Submit"
                required
              />{" "}
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
  globalAlerts: propTypes.func
};

export default AddEmployeeModal;
