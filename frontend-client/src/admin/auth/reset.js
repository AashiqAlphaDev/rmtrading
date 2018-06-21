import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {Card, Typography, CardContent, TextField, Button} from "@material-ui/core/index";
import Layout from "../../components/layout";
import style from "./style"

let Index = withStyles(style)(class extends React.Component {
	state = {
		username: ""
	}

	render() {
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
								Instructions will be sent to your email.
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}>Reset Password</Button>
						</Layout>
					</Layout>
				</CardContent>
			</form>
		</Card>

	}
});

export default Index