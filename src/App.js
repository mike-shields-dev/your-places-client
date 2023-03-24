import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import AuthContext from './shared/context/auth-context';

import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Authenticate from './user/pages/Authenticate';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null);
  }, []);

  const routes = (
    isLoggedIn ?
      <Switch>
        <Route exact path='/'>
          <Users />
        </Route>
        <Route exact path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route exact path='/places/new'>
          <NewPlace />
        </Route>
        <Route exact path='/places/:placeId'>
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
      :
      <Switch>
        <Route exact path='/'>
          <Users />
        </Route>
        <Route exact path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route exact path='/auth'>
          <Authenticate />
        </Route>
        <Redirect to='/auth' />
      </Switch>
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
