import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {Grid} from 'react-flexbox-grid';

import Login from './views/Login'
import Home from './views/Home';
import Employees from './views/Employees';

class App extends Component {
  render() {
    return (
      <Grid>
      <BrowserRouter>
        <React.Fragment>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/employees' component={Employees} />
        </React.Fragment>
      </BrowserRouter>
      </Grid>
    );
  }
}

export default App;
