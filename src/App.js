import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ProtectedRoute } from "./components/authComponents/ProtectedRoute";

import "./SCSS/main.css";

// IMPORTS VIEWS
import Game from "./views/game";
import Dashboard from "./views/dashboard";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import NOT_FOUND_404 from "./views/Error_404_page";
// import Error_Unauthorized from "./views/Error_Unauthorized";
import NavigationMenu from "./components/navigation/navigationMenu";

import ModeComponent from "./components/style/mode";
import ConfettiComponent from './components/CustomComponents/confettiFalls';

import {
  mainRefreshAction,
  authRefreshAction,
} from "./Redux/actions/refreshActions/refreshActions";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useLayoutEffect(() => {
    let parsedTiles = JSON.parse(localStorage.getItem("tiles"));
    let parsedPlayers = JSON.parse(localStorage.getItem("players"));
    let parsedPlays = JSON.parse(localStorage.getItem("plays"));
    let parsedGameInfo = JSON.parse(localStorage.getItem("gameInfo"));
    dispatch(
      mainRefreshAction(
        {
          local: parsedTiles,
          state: state.tiles,
        },
        {
          local: parsedPlayers,
          state: { player: state.player, ai: state.ai },
        },
        {
          local: parsedPlays,
          state: state.plays,
        },
        {
          local: parsedGameInfo,
          state: state.game,
        }
      )
    );
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (state.auth.token !== token) {
      dispatch(authRefreshAction(token));
    }
  }, []);

  return (
    <ModeComponent>
    <Router>
      <div className="App">
        <NavigationMenu />
        <ConfettiComponent />
        <Switch>
          <Redirect exact path="/" to="/home" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/scrababble" component={Game} />
          <Route render={() => <NOT_FOUND_404 />} />
        </Switch>
      </div>
    </Router>
  </ModeComponent>
  );
}

export default App;
