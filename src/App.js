import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { auth, db } from "./firebase/firebase-config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import KitchenPage from "./pages/KitchenPage";
import LoginPage from "./pages/Login";
import Hall from "./pages/Hall";

export default function App() {
  const [user, setUser] = useState([]);

  const userLogged = () => {
    auth.onAuthStateChanged(user => {
      user
        ? db
            .collection("users")
            .where("user_uid", "==", user.uid)
            .get()
            .then(snapshot => {
              const user = snapshot.docs.map(doc => doc.data());
              setUser(user);
            })
        : setUser([]);
    });
  };

  useEffect(() => {
    userLogged();
  }, []);

  return (
    <Router>
      {user.length !== 0 ? (
        <Redirect to={user[0].job} />
      ) : (
        <Redirect to={"/"} />
      )}
      <Switch>
        <Route path="/kitchen" component={KitchenPage} />
        <Route path="/hall" component={Hall} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}
