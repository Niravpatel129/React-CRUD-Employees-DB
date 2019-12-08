import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AddEmployeeFormModal from '../AddEmployeeFormModal/AddEmployeeFormModal';

import './AddEmployeeButton.css';

class AddEmployeeButton extends PureComponent {
  state = { visible: false };

  shouldModalShow() {
    this.setState({ visible: true });
  }

  closeModal = () => {
    this.setState({ visible: false });
    this.props.playSound();
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.shouldModalShow()} className="button">
          + Employee
        </button>

        {this.state.visible && (
          <AddEmployeeFormModal
            globalAlerts={this.props.globalAlerts}
            visible={this.state.visible}
            closeModal={this.closeModal}
            getEmployees={this.props.getEmployees}
            apiURL={this.props.apiURL}
          />
        )}
      </React.Fragment>
    );
  }
}

AddEmployeeButton.propTypes = {
  apiURL: PropTypes.func,
  getEmployees: PropTypes.func,
  globalAlerts: PropTypes.func,
  playSound: PropTypes.func,
};

export default AddEmployeeButton;
