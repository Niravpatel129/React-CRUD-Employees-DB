import React from 'react';
import swal from 'sweetalert';
import { css } from 'emotion';

import EmployeesTable from '../EmployeesTable/EmployeesTable';
import NightModeSwitch from '../NightModeSwitch/NightModeSwitch';

import './App.css';

import apiURL from './helpers/apiUrlGetter';

class App extends React.Component {
  state = { theme: JSON.parse(localStorage.getItem('theme')), component: '' };
  flipflopValue = this.state.theme;

  componentDidMount() {
    this.triggerThemeSwap();
  }

  triggerThemeSwap = e => {
    const isWhiteMode = this.flipflopValue;
    localStorage.setItem('theme', isWhiteMode);

    // :REDFLAG: do not target the DOM directly, but this is the best way for Dark Theme
    document.documentElement.style.background = isWhiteMode ? '#222222' : '';
    this.setState({
      component: css({
        color: isWhiteMode ? 'white' : 'dark',
        darkMode: !isWhiteMode
      })
    });
    this.flipflopValue = !this.flipflopValue;
  };

  globalAlerts(message, error) {
    // passed down to child components to display global messages
    error
      ? swal('Oh noes!', message, 'error')
      : swal({
          title: 'Sucess!',
          text: message,
          icon: 'success',
          button: 'Continue!'
        });
  }

  render() {
    return (
      <div className={this.state.component}>
        <h1>Plexxis Employees</h1>
        <NightModeSwitch triggerThemeSwap={this.triggerThemeSwap} theme={this.state.theme} />
        <EmployeesTable globalAlerts={this.globalAlerts} apiURL={apiURL} />
      </div>
    );
  }
}

export default App;
