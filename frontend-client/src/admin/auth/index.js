import React from "react";
import {withStyles} from "@material-ui/core/styles"
import style from "./style"
import {Redirect, Route, Switch} from 'react-router-dom'
import {connect} from "react-redux"
import Login from "./login"
import SignUp from "./signup"
import ResetPassword from "./reset"
import Layout from "../../components/layout";

let Index = withStyles({
	...style,
	fullScreen: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
})(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <div className={classes.fullScreen}>
			{
				this.props.auth.current_user.logged_in &&
				<Redirect to={"/admin/dashboard"}/>
			}
			<Layout alignItems={"center"} justifyContent={"center"}>
				<div className={classes.container}>
					<Switch>
						<Route path={"/admin/auth/login"} render={(props) => {
							return <Login {...props}/>;
						}}/>,
						<Route path={"/admin/auth/sign-up"} render={(props) => {
							return <SignUp {...props}/>;
						}}/>,
						<Route path={"/admin/auth/reset"} render={(props) => {
							return <ResetPassword {...props}/>;
						}}/>
					</Switch>
				</div>
			</Layout>
		</div>;
	}
});

export default connect(store=>store)(Index);