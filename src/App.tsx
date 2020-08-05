import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './scenes/Home';
import Track from './scenes/Track';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/:id" component={Track} />
      </Switch>
    </Router>
  );
}

export default hot(App);
