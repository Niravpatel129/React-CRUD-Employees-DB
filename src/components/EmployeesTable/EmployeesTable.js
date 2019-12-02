import React, { PureComponent } from "react";
import propTypes from "prop-types";

import "./EmployeesTable.css";
import "react-table/react-table.css";

import axios from "axios";
import ReactTable from "react-table";

import AddEmployeeButton from "../AddEmployeeButton/AddEmployeeButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UpdateEmployeeModal from "../UpdateEmployeeModal/UpdateEmployeeModal";

// import { columns } from "./columns.js";

let zippi = new Audio("http://limonte.github.io/mp3/zippi.mp3");

class EmployeesTable extends PureComponent {
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
    this.getEmployees = this.getEmployees.bind(this); // this bind is needed because this function call is passed into children
    axios
      .get(this.props.apiURL + "/api/employees", {
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
        Header: "Asigned",
        accessor: "asigned",
        Cell: props => {
          let asignedValue = props.original.assigned;
          return asignedValue ? "Yes" : "No";
        }
      },
      {
        Header: "Colour",
        accessor: "colour",
        Cell: props => {
          let color = props.original.color;
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
              Delete
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
