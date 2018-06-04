import React from "react";
import AuthLayoutWrapper from "../../layouts/auth-layout"
import {TextField, Card, CardContent, Typography, CardActions, Button} from "@material-ui/core";
import Layout from "../../components/layout";
import withRoot from "../../src/withRoot";
import Link from "next/link"
import style from "./style"
import {connect} from "react-redux";
import {SIGN_IN_REQUESTED} from "../../store/auth/actions";


let Index = class extends React.Component {
	state = {
		username: "",
		password: ""
	}

	render() {
		const {classes} = this.props;
		return <Card className={classes.card}>
			<form onSubmit={(event) => {
				event.preventDefault();
				this.props.dispatch({type:SIGN_IN_REQUESTED, payload: this.state})
			}}>
				<CardContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							SignIn
						</Typography>
						<TextField
							placeholder={"Username / Email"}
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
						<Layout alignItems={"center"} className={classes.actions}>
							<Typography gutterBottom className={"flex"}>
								Forgot password? <Link prefetch href={"/auth/reset"}><a>Reset</a></Link>
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
						</Layout>
						<Button className={classes.fbButton} color={"primary"} variant={"raised"}>Login with
							Facebook</Button>
						<Button className={classes.twitterButton} color={"primary"} variant={"raised"}>Login with
							Twitter</Button>
						<Layout justifyContent={"center"} className={classes.row}>
							<Typography gutterBottom>
								Don't have an account? <Link href={"/auth/sign-up"}><a>Signup</a></Link>
							</Typography>
						</Layout>
					</Layout>
				</CardContent>
			</form>
		</Card>;
	}
}


let ComponentWithStyles = withRoot(style)(connect(state => state)(Index));
export default AuthLayoutWrapper(ComponentWithStyles)