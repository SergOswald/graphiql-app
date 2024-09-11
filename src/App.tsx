import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const isAuthenticated = () => !!authToken;

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated() ? <Redirect to="/dashboard" /> : <Login setAuthToken={setAuthToken} />}
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default App;
