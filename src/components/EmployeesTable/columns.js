import React from "react";
import axios from "axios";

//helper variable to hold the columns data used in react tables
export const columns = [
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
              .delete("http://localhost:8080/api/deleteEmployee", {
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
