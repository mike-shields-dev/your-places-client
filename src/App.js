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

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout }}
    >
    <Router>
      <MainNavigation />
      <main>
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
          <Route exact path='/auth'>
            <Authenticate /> 
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
   </AuthContext.Provider>
  );
}

export default App;
