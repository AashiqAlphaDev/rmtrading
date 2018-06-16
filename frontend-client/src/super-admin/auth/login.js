import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {Card,Typography, CardContent, TextField, Button} from "@material-ui/core/index";
import Layout from "../../components/layout";
import {Link} from 'react-router-dom'
import style from "./style"

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
								Super Admin SignIn
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
							<Layout direction={"column"} alignItems={"flex-end"} className={classes.actions}>
								<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
							</Layout>
						</Layout>
					</CardContent>
				</form>
			</Card>

	}
});

export default Index