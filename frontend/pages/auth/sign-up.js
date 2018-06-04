import React from "react";
import AuthLayoutWrapper from "../../layouts/auth-layout"
import {TextField, Card, CardContent, Typography, Checkbox, Button} from "@material-ui/core";
import Layout from "../../components/layout";
import withRoot from "../../src/withRoot";
import Link from "next/link"
import style from "./style"
import {connect} from "react-redux";
import {SIGN_UP_REQUESTED} from "../../store/auth/actions";

let Index = class extends React.Component {

	state = {
		email: "",
		username: "",
		password1: "",
		password2: "",
	}

	render() {
		const {classes} = this.props;
		return <form onSubmit={(event)=>{console.log(event);event.preventDefault();this.props.dispatch({type:SIGN_UP_REQUESTED, payload:this.state})}}>
			<Card className={classes.card}>
				<CardContent>
					<Layout direction={"column"}>
						<Typography
							variant={"title"}
							gutterBottom
						>SignUp</Typography>
						<TextField
							placeholder={"Email"}
							className={classes.input}
							type={"email"}
							value={this.state.email}
							onChange={(event)=>{this.setState({email:event.target.value})}}
							helperText={" "}
						/>
						<TextField
							placeholder={"Username"}
							className={classes.input}
							value={this.state.username}
							onChange={(event)=>{this.setState({username:event.target.value})}}
							helperText={" "}
						/>
						<TextField
							placeholder={"Password"}
							type={"password"}
							className={classes.input}
							value={this.state.password1}
							onChange={(event)=>{this.setState({password1:event.target.value})}}
							helperText={" "}
						/>
						<TextField
							placeholder={"Confirm Password"}
							type={"password"}
							className={classes.input}
							value={this.state.password2}
							onChange={(event)=>{this.setState({password2:event.target.value})}}
							helperText={" "}
						/>
						<Layout alignItems={"center"} className={classes.actions}>
							<Typography gutterBottom className={"flex"}>
								By clicking Sign Up, you agree to our <Link prefetch href={"/auth"}><a>Terms</a></Link>
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}>SignUp</Button>
						</Layout>
						<Button
							className={classes.fbButton}
							color={"primary"}
							variant={"raised"}>
							Sign up with Facebook
						</Button>
						<Button
							className={classes.twitterButton}
							color={"primary"}
							variant={"raised"}>
							Sign up with Twitter
						</Button>
						<Layout justifyContent={"center"} className={classes.row}>
							<Typography gutterBottom>
								Already have an account? <Link href={"/auth"}><a>Signin</a></Link>
							</Typography>
						</Layout>
					</Layout>
				</CardContent>
			</Card>
		</form>
	}
}

let ComponentWithStyles = withRoot(style)(connect(state=>state)(Index));
export default AuthLayoutWrapper(ComponentWithStyles)