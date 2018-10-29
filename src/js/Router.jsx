import Flux from "@4geeksacademy/react-flux-dash";
import React from 'react';
import Store from "./store/Store.jsx"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {PrivateRoute} from './actions/utility/session';

import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Statement from './views/Statement.jsx';


export default class Router extends Flux.View {
  constructor() {
    super();
  }
  //Lifecycle methods

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/index.html" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/login/:nextP" component={Login} />
              <PrivateRoute exact path="/statement" component={Statement} />
              <Route component={Home} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
