import React, { Component } from "react";

import "./Employees.css";
import "react-table/react-table.css";

import axios from "axios";
import ReactTable from "react-table";

import AddEmployeeButton from "../AddEmployeeButton/AddEmployeeButton";

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }

  componentDidMount = () => {
    this.getEmployees();
  };

  getEmployees() {
    this.getEmployees = this.getEmployees.bind(this);

    axios
      .get("http://localhost:8080/api/employees", {
        headers: { "content-type": "application/x-www-form-urlencoded" }
      })
      .then(response => {
        // handle success
        this.setState({ employees: response.data, show: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { employees } = this.state;
    console.log(employees);
    const columns = [
      {
        Header: "ID",
        accessor: "id"
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
        Header: "city",
        accessor: "city"
      },
      {
        Header: "Branch",
        accessor: "branch"
      },
      {
        Header: "Asigned",
        Cell: props => {
          let asignedValue = props.original.assigned;
          console.log(asignedValue);
          return asignedValue ? "Yes" : "No";
        }
      },
      {
        Header: "color",
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
        Cell: props => {
          return (
            <button
              onClick={val => {
                console.log("Deleting:");
                console.log(props.original._id);
                axios
                  .delete("http://localhost:8080/api/deleteEmployee", {
                    params: { employeeId: props.original._id }
                  })
                  .then(response => {
                    setTimeout(() => {
                      console.log(response);
                      this.props.globalAlerts("Delete Successful");

                      this.getEmployees();
                    }, 50);
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

    return (
      <div className="Employees">
        <ReactTable className="table" data={employees} columns={columns} />
        <AddEmployeeButton
          globalAlerts={this.props.globalAlerts}
          getEmployees={this.getEmployees}
        />
      </div>
    );
  }
}

export default Employees;
