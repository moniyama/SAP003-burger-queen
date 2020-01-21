import React from "react";
import { auth } from "../firebase/firebase-config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginPage from "../pages/Login";

export default function LogOutFunction() {
  auth
    .signOut()
    .then(function() {
      console.log("saiu!");
      return (
        <Router>
          <Redirect to={"/login"} />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Router>
      );
    })
    .catch(function(error) {
      // An error happened.
    });
}
