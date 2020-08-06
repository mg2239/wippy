import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ScreenProvider } from './context/screen';
import { UploadProvider } from './context/upload';
import Home from './scenes/Home';
import Track from './scenes/Track';

function App() {
  return (
    <UploadProvider>
      <ScreenProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={Track} />
          </Switch>
        </Router>
      </ScreenProvider>
    </UploadProvider>
  );
}

export default hot(App);
