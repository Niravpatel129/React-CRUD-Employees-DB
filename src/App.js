import React from "react";
import "./App.css";

import Employees from "./components/Employees/Employees";

import swal from "sweetalert";

class App extends React.Component {
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
        <Employees globalAlerts={this.globalAlerts} />
      </div>
    );
  }
}

export default App;
