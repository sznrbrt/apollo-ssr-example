// ./routes/Layout.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import routes from './index';

const Layout = () =>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/another">Another page</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      {routes.map(route => <Route key={route.name} {...route} />)}
    </Switch>
  </div>;

export default Layout;
