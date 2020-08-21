import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { auth, db } from "./firebase/firebase-config";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import KitchenPage from "./pages/KitchenPage";
import LoginPage from "./pages/Login";
import Hall from "./pages/Hall";

export default function App() {
	const [user, setUser] = useState({});

	const userLogged = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection("users")
					.where("user_uid", "==", user.uid)
					.get()
					.then((snapshot) => snapshot.docs.map((doc) => setUser(doc.data())));
			} else setUser({});
		});
	};

	useEffect(() => {
		userLogged();
	}, []);

	return (
		<Router>
			{user.job ? <Redirect to={user.job} /> : <Redirect to={"/"} />}
			<Switch>
				<Route path="/kitchen" component={KitchenPage} />
				<Route path="/hall" component={Hall} />
				<Route exact path="/" component={LoginPage} />
			</Switch>
		</Router>
	);
}
