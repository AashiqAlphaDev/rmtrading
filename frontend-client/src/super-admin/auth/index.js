import React from "react";
import {withStyles} from "@material-ui/core/styles"
import style from "./style"
import AuthLayout from "./auth-layout"
import Login from "./login"

let Index = withStyles(style)(class extends React.Component {
	render(){
		const {classes} = this.props;
		return <div className={classes.container}>
			<Login />
		</div>;
	}
});

export default AuthLayout(Index)