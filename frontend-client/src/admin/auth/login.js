import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {Card,Typography, CardContent, TextField, Button,Snackbar} from "@material-ui/core/index";
import Layout from "../../components/layout";
import {Link, Redirect} from 'react-router-dom'
import style from "./style"
import {AUTH_CLEAR, REQUEST_LOGIN} from "../../stores/auth/actions";
import {connect} from "react-redux";

let Index = withStyles(style)(class extends React.Component {
	state = {
		email:"",
		password:"",
		showToast:false
	}
	componentWillMount(){
		this.props.dispatch({type:AUTH_CLEAR});
	}
	render(){
		const {classes} = this.props;
		return <Card className={classes.card}>
				{
					this.props.auth.redirect &&
					<Redirect to={this.props.auth.redirect}/>
				}
				<form onSubmit={(event) => {
					event.preventDefault();
					const {email, password} = this.state;
					this.props.dispatch({type:REQUEST_LOGIN, payload:{email, password}});
					this.setState({showToast:true});
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
								value={this.state.email}
								onChange={(event) => {
									this.setState({email: event.target.value})
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
								<Typography gutterBottom className={"flex"}>
									Forgot password? <Link to={"/admin/auth/reset"}>Reset</Link>
								</Typography>
								<Button type={"submit"} color={"primary"} variant={"raised"} disabled={this.props.auth.loginInProgress}>Login</Button>
							</Layout>
							<Layout justifyContent={"center"} className={classes.row}>
								<Typography gutterBottom>
									Don't have an account? <Link to={"/admin/auth/sign-up"}>Signup</Link>
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
					open={this.state.showToast && this.props.auth.loginError!=null}
					autoHideDuration={6000}
					onClose={()=>{this.setState({showToast:false})}}
					message={this.props.auth.loginError && this.props.auth.loginError.message}
				/>
			</Card>

	}
});

export default connect(store=>store)(Index)