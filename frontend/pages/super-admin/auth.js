import React from "react";
import AuthLayoutWrapper from "../../layouts/auth-layout"
import {TextField, Card, CardContent, Typography, CardActions, Button} from "@material-ui/core";
import Layout from "../../components/layout";
import withRoot from "../../src/withRoot";
import style from "./style"
import {SUPER_SIGN_IN_REQUESTED} from "../../store/auth/actions";
import {connect} from "react-redux";
import Router from 'next/router'



let Auth = class extends React.Component {
	state = {
		username: "",
		password: ""
	}

	componentWillReceiveProps(nextProps, nextContext){
		if(nextProps.authData && nextProps.authData.successRedirect){
			Router.push(nextProps.authData.successRedirect);
		}
	}

	render() {
		const {classes} = this.props;
		return <Card className={classes.card}>
			<form onSubmit={(event) => {
				event.preventDefault();
				this.props.dispatch({type:SUPER_SIGN_IN_REQUESTED, payload: this.state})
			}}>
				<CardContent>
					<Layout direction={"column"}>

						<TextField
							placeholder={"Username"}
							className={classes.input}
							value={this.state.username}
							onChange={(event) => {
								this.setState({username: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<TextField
							placeholder={"Password"}
							type={"password"}
							className={classes.input}
							onChange={(event) => {
								this.setState({password: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<Layout justifyContent={"flex-end"} alignItems={"center"} className={classes.actions}>
							<Typography gutterBottom className={"flex"}>
								Sign in to Super Admin Dashboard
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
						</Layout>
					</Layout>
				</CardContent>
			</form>
		</Card>;
	}
}


let ComponentWithStyles = withRoot(style)(connect(state=>state)(Auth));
export default (AuthLayoutWrapper(ComponentWithStyles))