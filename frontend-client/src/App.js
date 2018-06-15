import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles"
import {BrowserRouter, Route} from 'react-router-dom'
import {Auth as AdminAuth} from "./admin"

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Route path={"/admin"} render={() => {
					return <AdminAuth />;
				}}/>
			</BrowserRouter>
		);
	}
}

export default withStyles({})(App);
