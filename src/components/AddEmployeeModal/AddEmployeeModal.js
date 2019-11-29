import React, { Component } from "react";
import propTypes from "prop-types";

import Modal from "react-awesome-modal";

import axios from "axios";

import "./AddEmployeeModal.css";
class AddEmployeeModal extends Component {
  componentDidMount() {}
  // with React, 2 way binding is good too, but this is a alternative. !! Future convert this to react hooks !!
  handleIdChange = event => {
    this.id = event.target.value;
  };
  handleNameChange = event => {
    this.name = event.target.value;
  };
  handleCodeChange = event => {
    this.code = event.target.value;
  };
  handleProfessionChange = event => {
    this.profession = event.target.value;
  };
  handleCityChange = event => {
    this.city = event.target.value;
  };
  handleBranchChange = event => {
    this.branch = event.target.value;
  };
  handleColorChange = event => {
    this.color = event.target.value;
  };
  handleColorChange = event => {
    this.color = event.target.value;
  };

  closeModal() {
    this.props.closeModal();
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/addEmployee", {
        id: this.id,
        name: this.name,
        code: this.code,
        profession: this.profession,
        city: this.city,
        branch: this.branch,
        color: this.color,
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
                  placeholder="id"
                  required
                />
                <input
                  type="text"
                  name="name"
                  onChange={this.handleNameChange}
                  placeholder="name"
                  required
                />
                <input
                  type="text"
                  name="code"
                  onChange={this.handleCodeChange}
                  placeholder="code"
                  required
                />
                <input
                  type="text"
                  name="profession"
                  onChange={this.handleProfessionChange}
                  placeholder="profession"
                  required
                />
                <input
                  type="text"
                  name="city"
                  onChange={this.handleCityChange}
                  placeholder="city"
                  required
                />
                <input
                  type="text"
                  name="branch"
                  onChange={this.handleBranchChange}
                  placeholder="branch"
                  required
                />
                <input
                  type="text"
                  name="color"
                  onChange={this.handleColorChange}
                  placeholder="color"
                  required
                />
              </fieldset>
              <input
                type="submit"
                name="next"
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
  globalAlerts: propTypes.func,
  visible: propTypes.bool
};

export default AddEmployeeModal;
