import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import JoinRoomPage from '../components/JoinRoomPage';
import RoomPage from '../components/RoomPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import App from './../components/App'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/join" component={App} />
        <PrivateRoute path="/room/:id" component={RoomPage} />        
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;