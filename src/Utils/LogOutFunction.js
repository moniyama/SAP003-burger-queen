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
  auth.signOut().then(() => {
    return (
      <Router>
        <Redirect to={"/"} />
        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    );
  })
  .catch(()=> console.log('erro'))
}
