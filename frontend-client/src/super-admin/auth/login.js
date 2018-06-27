import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {Card, Typography, CardContent, TextField, Button, Snackbar} from "@material-ui/core/index";
import Layout from "../../components/layout";
import style from "./style"
import {REQUEST_SUPER_ADMIN_LOGIN} from "../../stores/entities/auth/actions";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux"

let Index = withStyles(style)(class extends React.Component {
	state = {
		username: "",
		password: "",
		showToast: false
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
				const {username, password} = this.state;
				this.props.dispatch({type: REQUEST_SUPER_ADMIN_LOGIN, payload: {username, password}});
				this.setState({showToast: true});
			}}>
				<CardContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							SignIn
						</Typography>
						<TextField
							disabled={this.props.auth.loginInProgress}
							placeholder={"Email"}
							className={classes.input}
							value={this.state.username}
							onChange={(event) => {
								this.setState({username: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<TextField
							disabled={this.props.auth.loginInProgress}
							placeholder={"Password"}
							type={"password"}
							className={classes.input}
							onChange={(event) => {
								this.setState({password: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<Layout alignItems={"center"} className={classes.actions}>
							<Button type={"submit"} color={"primary"} variant={"raised"}
							        disabled={this.props.auth.loginInProgress}>Login</Button>
						</Layout>
					</Layout>
				</CardContent>
			</form>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={this.state.showToast && this.props.auth.loginError != null}
				autoHideDuration={6000}
				onClose={() => {
					this.setState({showToast: false})
				}}
				message={this.props.auth.loginError && this.props.auth.loginError.message}
			/>
		</Card>

	}
});

export default connect(store => store)(Index)