import React from "react";
import { connect } from 'react-redux'
import {withStyles} from "@material-ui/core/styles"
import {Card,Typography, CardContent, TextField, Button} from "@material-ui/core/index";
import Layout from "../../components/layout";
import {Link} from 'react-router-dom'
import style from "./style"
import {REQUEST_SIGNUP} from "../../stores/auth/actions";

let Index = withStyles(style)(class extends React.Component {
	state = {
		name:"",
		email:"",
		password:""
	};
	render(){
		const {classes} = this.props;
		return <Card className={classes.card}>
			<form onSubmit={(event) => {
				event.preventDefault();
				const {name, email, password} = this.state;
				this.props.dispatch({type:REQUEST_SIGNUP, payload:{name, email, password}});
			}}>
				<CardContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							SignUp
						</Typography>
						<TextField
							placeholder={"Name"}
							className={classes.input}
							value={this.state.name}
							onChange={(event) => {
								this.setState({name: event.target.value})
							}}
							helperText={" "}
						></TextField>
						<TextField
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
							<Button type={"submit"} color={"primary"} variant={"raised"}>Sign Up</Button>
						</Layout>
						<Layout justifyContent={"center"} className={classes.row}>
							<Typography gutterBottom>
								Don't have an account? <Link to={"/admin/auth/login"}>SignIn</Link>
							</Typography>
						</Layout>
					</Layout>
				</CardContent>
			</form>
		</Card>

	}
});

export default connect()(Index)