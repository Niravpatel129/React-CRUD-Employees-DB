import React from "react";
import "./App.css";

import EmployeesTable from "./components/EmployeesTable/EmployeesTable";
import NightModeSwitch from "./components/NightModeSwitch/NightModeSwitch";

import apiURL from "./helpers/apiUrlGetter";

import swal from "sweetalert";
import { css } from "emotion";

class App extends React.Component {
  theme = JSON.parse(localStorage.getItem("theme"));
  state = { darkMode: this.theme, component: "" };
  flipflopValue = this.state.darkMode;

  componentDidMount() {
    // this should update based on localStorage (browserStorage)
    this.triggerThemeSwap();
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  triggerThemeSwap = e => {
    const isWhiteMode = this.flipflopValue;
    localStorage.setItem("theme", isWhiteMode);

    document.documentElement.style.background = isWhiteMode ? "#222222" : "";
    this.setState({
      component: css({
        color: isWhiteMode ? "white" : "dark",
        darkMode: !isWhiteMode
      })
    });
    this.flipflopValue = !this.flipflopValue;
  };

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
      <div className={this.state.component}>
        <h1>Plexxis Employees</h1>
        <NightModeSwitch
          triggerThemeSwap={this.triggerThemeSwap}
          theme={this.state.darkMode}
        />
        <EmployeesTable globalAlerts={this.globalAlerts} apiURL={apiURL} />
      </div>
    );
  }
}

export default App;
