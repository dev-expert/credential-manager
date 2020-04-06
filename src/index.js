import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserList from './components/user/user';
import Login from './components/login/login';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import 'bootstrap/dist/css/bootstrap.css';
import { history } from './helpers/history';
import {
  Router,
  Route,
  Switch,
} from "react-router-dom";
ReactDOM.render(
  <Suspense fallback={(<div>Loading </div>)}>
    <Provider store={store} >
      <Router history={history}>
        <Switch>
          <Route path="/users" component={UserList}>
          </Route>
          <Route path="/" component={Login}>
          </Route>
        </Switch>
      </Router>
    </Provider>,
  </Suspense >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
