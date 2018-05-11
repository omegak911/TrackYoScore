import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import History from './History/History';
import Home from './Home/Home';
import Landing from './Landing/Landing';
import Nav from './Nav/Nav';
import Profile from './Profile/Profile';
import UserSearchResults  from './Search/UserSearchResult';

const App = () => {

  return (
    <div>
      <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='history' component={History} />
              <Route path='/home' component={Home} />
              <Route path='/profile' component={Profile} />
              <Route path='/userSearchResults' component={UserSearchResults} />
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;