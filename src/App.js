import React from "react";
import "./App.css";

import EmployeesTable from "./components/EmployeesTable/EmployeesTable";

import swal from "sweetalert";

class App extends React.Component {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  globalAlerts(message) {
    // passed down to child components to display global messages
    swal({
      title: "Sucess!",
      text: message,
      icon: "success",
      button: "Continue!"
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Plexxis Employees</h1>
        <EmployeesTable globalAlerts={this.globalAlerts} />
      </div>
    );
  }
}

export default App;
