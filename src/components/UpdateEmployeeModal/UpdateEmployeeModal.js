import React, { Component } from "react";
import Modal from "react-awesome-modal";

import "./UpdateEmployeeModal.css";

class UpdateEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  closeModal() {
    this.props.toggleUpdateModal();
  }

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

  handleSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  render() {
    console.log(this.props);
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
    console.log(_id, id, name, code, profession, city, branch, color);
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
                  value={id}
                  required
                />
                <input
                  type="text"
                  name="name"
                  onChange={this.handleNameChange}
                  placeholder="name"
                  value={name}
                  required
                />
                <input
                  type="text"
                  name="code"
                  onChange={this.handleCodeChange}
                  placeholder="code"
                  value={code}
                  required
                />
                <input
                  type="text"
                  name="profession"
                  onChange={this.handleProfessionChange}
                  placeholder="profession"
                  value={profession}
                  required
                />
                <input
                  type="text"
                  name="city"
                  onChange={this.handleCityChange}
                  placeholder="city"
                  value={city}
                  required
                />
                <input
                  type="text"
                  name="branch"
                  onChange={this.handleBranchChange}
                  placeholder="branch"
                  value={branch}
                  required
                />
                <input
                  type="text"
                  name="color"
                  onChange={this.handleColorChange}
                  placeholder="color"
                  value={color}
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

export default UpdateEmployeeModal;
