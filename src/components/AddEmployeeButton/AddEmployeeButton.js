import React, { Component } from "react";

import AddEmployeeModal from "../AddEmployeeModal/AddEmployeeModal";

import "./AddEmployeeButton.css";

class AddEmployeeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  shouldModalShow() {
    this.setState({ visible: true });
  }

  closeModal = () => {
    this.setState({ visible: false });
    this.props.playSouds();
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.shouldModalShow()} className="button">
          + Employee
        </button>

        {this.state.visible && (
          <AddEmployeeModal
            globalAlerts={this.props.globalAlerts}
            visible={this.state.visible}
            closeModal={this.closeModal}
            getEmployees={this.props.getEmployees}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AddEmployeeButton;
