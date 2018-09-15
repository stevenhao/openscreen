import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Screen from './Screen';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, IndexRoute, Link } from 'react-router-dom'

ReactDOM.render((
  <Router>
    <Switch>
      <Route path="/:screenId/:iconIndex" component={Screen} />
      <Route path="/" component={App}>
        {/*<IndexRoute component={Home} />*/}
      </Route>
    </Switch>
  </Router>
), document.getElementById('root'))

registerServiceWorker();
