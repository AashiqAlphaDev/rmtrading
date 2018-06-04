import React from "react";
import AuthLayout from "../../layouts/auth-layout"
import {TextField, Card, CardContent, Typography, CardActions, Button} from "@material-ui/core";
import Layout from "../../components/layout";
import withRoot from "../../src/withRoot";
import Link from "next/link"
import style from "./style"

export default withRoot(style)(class extends React.Component{
	render(){
		return <AuthLayout>
			<Card className={classes.card}>
				<CardContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							Reset Password
						</Typography>
						<Layout alignItems={"flex-end"}>
							<TextField placeholder={"Email"} className={`${classes.input} flex`}></TextField>
							<Button color={"primary"} variant={"raised"} className={classes.marginedButton}>Reset Credentials</Button>
						</Layout>
						<Layout justifyContent={"center"} className={classes.actions}>
							<Typography gutterBottom className={"flex"}>
								Instructions will be sent to registered email address.
							</Typography>
						</Layout>
					</Layout>
				</CardContent>
			</Card>
		</AuthLayout>
	}
})