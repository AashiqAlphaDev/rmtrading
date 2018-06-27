import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import {Dashboard as AdminDashboard} from "./admin"
import {Auth as AdminAuth} from "./admin"
//import {Auth as SuperAdminAuth, Dashboard as SuperAdminDashboard} from "./super-admin"
import store from "./stores/store"
import {Provider} from "react-redux";
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class App extends Component {
	render() {
		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Provider store={store}>
					<BrowserRouter>
						<Route path={"/admin"}>
							<Switch>
								<Route path={"/admin/auth"} render={(props) => {
									return <AdminAuth {...props}/>;
								}}/>
								{/*<Route path={"/admin/dashboard"} render={(props) => {*/}
									{/*return <AdminDashboard {...props}/>;*/}
								{/*}}/>*/}
								{/*<Route path={"/super-admin/auth"} render={(props) => {*/}
									{/*return <SuperAdminAuth {...props}/>;*/}
								{/*}}/>*/}
								{/*<Route path={"/super-admin/dashboard"} render={(props) => {*/}
									{/*return <SuperAdminDashboard {...props}/>;*/}
								{/*}}/>*/}
							</Switch>
						</Route>
					</BrowserRouter>
				</Provider>
			</MuiPickersUtilsProvider>
		);
	}
}

export default withStyles({})(App);
