import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Authenticate from './user/pages/Authenticate';

function App() {
  return (
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
  );
}

export default App;
