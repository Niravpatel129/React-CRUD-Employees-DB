import React from "react";
import "./App.css";

import EmployeesTable from "./components/EmployeesTable/EmployeesTable";

import swal from "sweetalert";

class App extends React.Component {
  constructor() {
    super();
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      this.apiURL = "http://localhost:8080";
    } else {
      // production code
      this.apiURL = "https://backend-api-crud-app.herokuapp.com";
    }
  }

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
        <EmployeesTable globalAlerts={this.globalAlerts} apiURL={this.apiURL} />
      </div>
    );
  }
}

export default App;
