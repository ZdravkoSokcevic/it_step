import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter, Route} from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';

import App from './views/App';
import Home from './views/Home';
import Login from './views/Login';
import Employees from './views/Employees';
import Check from './views/Check';
import Requests from './views/Requests';
import Holidays from './views/Holidays';

ReactDOM.render(
            <Grid >
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={App} />
                        <Route path='/home' component={Home} />
                        <Route path='/login' component={Login} />
                        <Route path='/employees' component={Employees} />
                        <Route path='/requests' component={Requests} />
                        <Route path='/holidays' component={Holidays} />
                        <Route path='/check' component={Check} />
                    </div>
                </BrowserRouter>
            </Grid>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
