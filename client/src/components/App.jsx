import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import Landing from './Landing/Landing';

const App = () => {

  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/home' component={Home} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;