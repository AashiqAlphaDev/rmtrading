import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Auth as AdminAuth, Dashboard as AdminDashboard} from "./admin"
import {Auth as SuperAdminAuth, Dashboard as SuperAdminDashboard} from "./super-admin"
import store from "./stores/store"
import {Provider} from "react-redux";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Route path={"/admin"}>
						<Switch>
							<Route path={"/admin/auth"} render={(props) => {
								return <AdminAuth {...props}/>;
							}}/>
							<Route path={"/admin/dashboard"} render={(props) => {
								return <AdminDashboard {...props}/>;
							}}/>
							<Route path={"/super-admin/auth"} render={(props) => {
								return <SuperAdminAuth {...props}/>;
							}}/>
							<Route path={"/super-admin/dashboard"} render={(props) => {
								return <SuperAdminDashboard {...props}/>;
							}}/>
						</Switch>
					</Route>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default withStyles({})(App);
