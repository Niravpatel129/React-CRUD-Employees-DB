import React, { PureComponent } from "react";
import propTypes from "prop-types";

import "./EmployeesTable.css";
import "react-table/react-table.css";

import axios from "axios";
import ReactTable from "react-table";

import AddEmployeeButton from "../AddEmployeeButton/AddEmployeeButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UpdateEmployeeModal from "../UpdateEmployeeModal/UpdateEmployeeModal";

import { colorCheckerHelper } from "./colorCheckerHelper.js";

let zippi = new Audio("http://limonte.github.io/mp3/zippi.mp3");

class EmployeesTable extends PureComponent {
  state = {
    employees: [],
    dataLoaded: false,
    showUpdateModal: false,
    valueToUpdate: null
  };

  componentDidMount = () => {
    // get data when component is mounted
    this.getEmployees();
  };

  getEmployees = async () => {
    //
    let res = await axios.get(this.props.apiURL + "/api/employees");
    this.setState({
      employees: res.data,
      show: false,
      dataLoaded: true
    });
  };

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

    const columns = [
      {
        Header: "ID",
        accessor: "id",
        filterable: true,
        Filter: ({ filter, onChange }) => (
          <input
            onChange={event => onChange(event.target.value)}
            placeholder="🔍"
          />
        )
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Code",
        accessor: "code"
      },
      {
        Header: "Profession",
        accessor: "profession"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Branch",
        accessor: "branch"
      },
      {
        Header: "Assigned",
        accessor: "assigned",
        Cell: props => {
          let asignedValue = props.original.assigned;
          return asignedValue ? "Yes" : "No";
        }
      },
      {
        Header: "Colour",
        accessor: "color",
        Cell: props => {
          let color = props.original.color;
          if (!colorCheckerHelper(color)) {
            color = "white"; // default color for invalid arguments
          }
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: color,
                borderRadius: "2px"
              }}
            ></div>
          );
        }
      },
      {
        Header: "Actions",
        accessor: null,
        Cell: props => {
          return (
            <button
              onClick={val => {
                val.stopPropagation();
                axios
                  .delete(this.props.apiURL + "/api/deleteEmployee", {
                    params: { employeeId: props.original._id }
                  })
                  .then(response => {
                    setTimeout(() => {
                      console.log(response);
                      this.props.globalAlerts("Delete Successful");

                      this.getEmployees();
                    }, 100);
                  });
              }}
              className="actionButtonDelete"
            >
              🗑️
            </button>
          );
        }
      }
    ];

    if (this.state.dataLoaded) {
      return (
        <div className="Employees">
          <ReactTable
            className="table"
            data={employees}
            columns={columns}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: e => {
                  e.stopPropagation();

                  if (rowInfo && rowInfo.original) {
                    this.setState({
                      showUpdateModal: true,
                      valueToUpdate: rowInfo.original
                    });
                  }
                },
                onContextMenu: e => {
                  e.preventDefault();
                  let toEnableOrDisable = !rowInfo.original.assigned;
                  axios
                    .put(this.props.apiURL + "/api/toggleAssigned", {
                      _id: rowInfo.original._id,
                      toEnableOrDisable: toEnableOrDisable
                    })
                    .then(res => {
                      setTimeout(() => {
                        this.props.globalAlerts("Successfully toggled!");
                        this.getEmployees();
                      }, 70);
                    });
                }
              };
            }}
          />
          <AddEmployeeButton
            globalAlerts={this.props.globalAlerts}
            getEmployees={this.getEmployees}
            playSouds={this.playSound}
            apiURL={this.props.apiURL}
          />
          {this.state.showUpdateModal && (
            <UpdateEmployeeModal
              toggleUpdateModal={this.toggleUpdateModal}
              data={this.state.valueToUpdate}
              globalAlerts={this.props.globalAlerts}
              getEmployees={this.getEmployees}
              apiURL={this.props.apiURL}
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
