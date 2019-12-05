// Npm Modules
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import ReactTable from 'react-table';

// Local Modules
import AddEmployeeButton from '../AddEmployeeButton/AddEmployeeButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UpdateEmployeeModal from '../UpdateEmployeeModal/UpdateEmployeeModal';

// Local css imports
import './EmployeesTable.css';
import 'react-table/react-table.css';

// Assets
import { colorCheckerHelper } from './helpers/colorCheckerHelper';
const zippi = new Audio('https://limonte.github.io/mp3/zippi.mp3');

class EmployeesTable extends PureComponent {
  state = {
    employees: [],
    dataLoaded: false,
    showUpdateModal: false,
    valueToUpdate: null,
  };

  componentDidMount = () => {
    this.getEmployees();
  };

  getEmployees = async () => {
    //
    const res = await axios.get(this.props.apiURL('/api/employees'));
    this.setState({
      employees: res.data,
      show: false,
      dataLoaded: true,
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
        Header: 'ID',
        accessor: 'id',
        filterable: true,
        Filter: ({ filter, onChange }) => (
          <input
            onChange={event => onChange(event.target.value)}
            placeholder="🔍"
          />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Code',
        accessor: 'code',
      },
      {
        Header: 'Profession',
        accessor: 'profession',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Branch',
        accessor: 'branch',
      },
      {
        Header: 'Assigned',
        accessor: 'assigned',
        Cell: props => (props.original.assigned ? 'Yes' : 'No'),
      },
      {
        Header: 'Colour',
        accessor: 'color',
        Cell: props => {
          let color = props.original.color;
          if (!colorCheckerHelper(color)) {
            color = 'white'; // default color for invalid arguments
          }
          return (
            <div
              className="colorCol"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: color,
                borderRadius: '2px',
              }}
            ></div>
          );
        },
      },
      {
        Header: 'Actions',
        accessor: null,
        Cell: props => {
          return (
            <button
              onClick={val => {
                val.stopPropagation();
                axios
                  .delete(this.props.apiURL('/api/deleteEmployee'), {
                    params: { employeeId: props.original._id },
                  })
                  .then(response => {
                    setTimeout(() => {
                      this.props.globalAlerts('Delete Successful');

                      this.getEmployees();
                    }, 100);
                  });
              }}
              className="actionButtonDelete"
            >
              <span alt="delete" role="img" aria-label="delete">
                🗑️
              </span>
            </button>
          );
        },
      },
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
                      valueToUpdate: rowInfo.original,
                    });
                  }
                },
                onContextMenu: e => {
                  e.preventDefault();
                  axios
                    .put(this.props.apiURL('/api/toggleAssigned'), {
                      _id: rowInfo.original._id,
                      toEnableOrDisable: !rowInfo.original.assigned,
                    })
                    .then(res => {
                      setTimeout(() => {
                        this.props.globalAlerts('Successfully toggled!');
                        this.getEmployees();
                      }, 70);
                    });
                },
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
    }
    return <LoadingSpinner />;
  }
}

EmployeesTable.propTypes = { globalAlerts: propTypes.func };

export default EmployeesTable;
