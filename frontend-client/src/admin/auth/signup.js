import React from "react";
import {connect} from 'react-redux'
import {withStyles} from "@material-ui/core/styles"
import {Card, Typography, CardContent, TextField, Button, Snackbar} from "@material-ui/core/index";
import Layout from "../../components/layout";
import {Link, Redirect} from 'react-router-dom'
import style from "./style"
import {uiEvents} from "../../stores/ui/saga";
import {authCommands} from "../../stores/entities/auth/sagas";

let Index = withStyles(style)(class extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		showToast: false
	};

	componentWillMount() {
		this.props.dispatch({type: uiEvents.AUTH_PAGE_LOAD});
	}

	render() {
		const {classes} = this.props;
		return <Card className={classes.card}>
			{
				this.props.auth.redirect &&
				<Redirect to={this.props.auth.redirect}/>
			}
			<form onSubmit={(event) => {
				event.preventDefault();
				const {name, email, password} = this.state;
				this.props.dispatch({type: authCommands.REQUEST_SIGNUP, payload: {name, email, password}});
				this.setState({showToast: true});
			}}>
				<CardContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							SignUp
						</Typography>
						<TextField
							disabled={this.props.auth.signupInProgress}
							placeholder={"Name"}
							className={classes.input}
							value={this.state.name}
							onChange={(event) => {
								this.setState({name: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<TextField
							disabled={this.props.auth.signupInProgress}
							placeholder={"Email"}
							type={"email"}
							className={classes.input}
							value={this.state.email}
							onChange={(event) => {
								this.setState({email: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<TextField
							disabled={this.props.auth.signupInProgress}
							placeholder={"Password"}
							type={"password"}
							className={classes.input}
							value={this.state.password}
							onChange={(event) => {
								this.setState({password: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<Layout alignItems={"center"} className={classes.actions}>
							<Typography gutterBottom className={"flex"}>
								By signing in you are agreeing to our terms.
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}
							        disabled={this.props.auth.signupInProgress}>Sign Up</Button>
						</Layout>
						<Layout justifyContent={"center"} className={classes.row}>
							<Typography gutterBottom>
								Don't have an account? <Link to={"/admin/auth/login"}>SignIn</Link>
							</Typography>
						</Layout>
					</Layout>
				</CardContent>
			</form>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={this.state.showToast && this.props.auth.signupError != null}
				autoHideDuration={6000}
				onClose={() => {
					this.setState({showToast: false})
				}}
				message={this.props.auth.signupError && this.props.auth.signupError.message}
			/>
		</Card>


	}
});

export default connect(store => store)(Index)