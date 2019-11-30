import React, { Component } from "react";
import propTypes from "prop-types";

import "./EmployeesTable.css";
import "react-table/react-table.css";

import axios from "axios";
import ReactTable from "react-table";

import AddEmployeeButton from "../AddEmployeeButton/AddEmployeeButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UpdateEmployeeModal from "../UpdateEmployeeModal/UpdateEmployeeModal";

import { columns } from "./columns.js";

let zippi = new Audio("http://limonte.github.io/mp3/zippi.mp3");

class EmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      dataLoaded: false,
      showUpdateModal: false,
      valueToUpdate: null
    };
  }

  componentDidMount = () => {
    // get data when component is mounted
    this.getEmployees();
  };

  getEmployees() {
    // Axios call to get all employees from back-end
    this.getEmployees = this.getEmployees.bind(this);

    axios
      .get("http://localhost:8080/api/employees", {
        headers: { "content-type": "application/x-www-form-urlencoded" }
      })
      .then(response => {
        // handle success
        this.setState({
          employees: response.data,
          show: false,
          dataLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  toggleUpdateModal = () => {
    //helper function passed down to child to toggle modal
    this.setState({ showUpdateModal: false });
    this.playSound();
  };

  playSound = () => {
    zippi.play();
  };

  render() {
    const { employees } = this.state;

    if (this.state.dataLoaded) {
      return (
        <div className="Employees">
          <ReactTable
            className="table"
            data={employees}
            columns={columns}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  e.stopPropagation();

                  if (rowInfo && rowInfo.original) {
                    this.setState({
                      showUpdateModal: true,
                      valueToUpdate: rowInfo.original
                    });
                  }
                }
              };
            }}
          />
          <AddEmployeeButton
            globalAlerts={this.props.globalAlerts}
            getEmployees={this.getEmployees}
            playSouds={this.playSound}
          />
          {this.state.showUpdateModal && (
            <UpdateEmployeeModal
              toggleUpdateModal={this.toggleUpdateModal}
              data={this.state.valueToUpdate}
              globalAlerts={this.props.globalAlerts}
              getEmployees={this.getEmployees}
            />
          )}
        </div>
      );
    } else {
      // display loading spinner while data is loading
      return <LoadingSpinner />;
    }
  }
}

EmployeesTable.propTypes = { globalAlerts: propTypes.func };

export default EmployeesTable;
