import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {Card,Typography, CardContent, TextField, Button} from "@material-ui/core/index";
import Layout from "../components/layout";
import {Link} from 'react-router-dom'
import style from "./style"
import AuthLayout from "./auth-layout"

let Index = withStyles(style)(class extends React.Component {
	state = {
		username:""
	}
	render(){
		const {classes} = this.props;
		return <Card className={classes.card}>
				<form onSubmit={(event) => {
					event.preventDefault();
				}}>
					<CardContent>
						<Layout direction={"column"}>
							<Typography variant={"title"} gutterBottom>
								Reset
							</Typography>
							<TextField
								placeholder={"Email"}
								className={classes.input}
								value={this.state.username}
								onChange={(event) => {
									this.setState({username: event.target.value})
								}}
								helperText={" "}
							></TextField>
							<Layout alignItems={"center"} className={classes.actions}>
								<Typography gutterBottom className={"flex"}>
									Forgot password?
								</Typography>
								<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
							</Layout>
							<Layout justifyContent={"center"} className={classes.row}>
								<Typography gutterBottom>
									Don't have an account? <Link to={"/admin/sign-up"}>Signup</Link>
								</Typography>
							</Layout>
						</Layout>
					</CardContent>
				</form>
			</Card>

	}
});

export default Index