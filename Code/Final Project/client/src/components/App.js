import State from './State';
import ZipInfo from './ZipInfo';
import Occupations from './Occupations';
import Login from "./Login/Login";
import useToken from './useToken';
import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';;

function setToken(userToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return userToken?.token
}

function App() {
	const { token, setToken } = useToken();
	if (!token) {
		return <Login setToken={setToken} />
	} 

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Login setToken = {setToken}/>
					</Route>
					<Route
						exact
						path="/state"
						render={() => (
							<State />
						)}
					/>
					<Route
						path="/occupations"
						render={() => (
							<Occupations />
						)}
					/>
					<Route
						path="/zipinfo"
						render={() => (
							<ZipInfo />
						)}
					/>
				</Switch>
			</Router>
		</div>
	);
}
export default App;