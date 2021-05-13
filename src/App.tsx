import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MP3Provider } from './context/mp3';
import { ScreenProvider } from './context/screen';
import Home from './scenes/Home/Home';
import Track from './scenes/Track/Track';

export default function App() {
  return (
    <MP3Provider>
      <ScreenProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Track} />
          </Switch>
        </Router>
      </ScreenProvider>
    </MP3Provider>
  );
}
