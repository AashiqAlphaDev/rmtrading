import React from "react";
import {withStyles} from "@material-ui/core/styles"
import style from "./style"
import AuthLayout from "./auth-layout"
import {Route, Switch} from 'react-router-dom'
import Login from "./login"
import SignUp from "./signup"
import ResetPassword from "./reset"

let Index = withStyles(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <AuthLayout>
			<div className={classes.container}>
				<Switch>
					<Route path={"/admin/auth/login"} render={() => {
						return <Login/>;
					}}/>,
					<Route path={"/admin/auth/sign-up"} render={() => {
						return <SignUp/>;
					}}/>,
					<Route path={"/admin/auth/reset"} render={() => {
						return <ResetPassword/>;
					}}/>
				</Switch>
			</div>
		</AuthLayout>;
	}
});

export default Index;