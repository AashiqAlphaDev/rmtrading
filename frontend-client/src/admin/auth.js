import React from "react";
import {withStyles} from "@material-ui/core/styles"
import style from "./style"
import AuthLayout from "./auth-layout"
import {Route} from 'react-router-dom'
import Login from "./login"
import SignUp from "./signup"
import ResetPassword from "./reset"

let Index = withStyles(style)(class extends React.Component {
	render(){
		const {classes} = this.props;
		return <div className={classes.container}>
			<Route path={"/admin/login"} render={() => {
				return <Login />;
			}}/>
			<Route path={"/admin/sign-up"} render={() => {
				return <SignUp />;
			}}/>
			<Route path={"/admin/reset"} render={() => {
				return <ResetPassword />;
			}}/>
		</div>;
	}
});

export default AuthLayout(Index)