import React from "react"
import Layout from "../../../components/layout";
import {authCommands} from "../../../../frontend-client/src/stores/entities/auth/sagas";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import AuthContainer from "../../../components/auth/auth-container";
import Link from "next/link"

let _Index = class extends React.Component {

	render() {
		const {classes} = this.props;
		return <AuthContainer>
			<Layout direction={"column"} className={classes.container}
			               justifyContent={"center"} flex={1}>
				<form onSubmit={(e) => {
					e.preventDefault();
					const {email, password} = this.state;
					this.props.dispatch({type: authCommands.LOGIN, payload: {email, password}});
				}}>
					<Layout direction={"column"} className={classes.content}>
						<Typography variant={"title"} color={"primary"} className={classes.line}>
							Access your account
						</Typography>
						<Typography variant={"body1"} color={"textSecondary"} className={classes.line}>
							Getting started is quick and simple, Just fill out the info below !
						</Typography>

						<Layout direction={"column"} className={classes.section}>
							<TextField className={classes.line}  placeholder={"Email"}></TextField>
							<TextField className={classes.line}  placeholder={"Password"} type={"password"} />
						</Layout>

						<Layout direction={"column"}>
							<Typography variant={"body1"} gutterBottom align={"center"} className={classes.line}>
								<span>Forgot your password?, Reset you account </span>.
								<Link href={"/auth/reset"}>here</Link>
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
						</Layout>
					</Layout>
				</form>
			</Layout>
		</AuthContainer>
	}
}

const Index = withStyles((theme)=>{
	return {
		line:{
			marginBottom:2*theme.spacing.unit
		},
		section:{
			marginBottom:2*theme.spacing.unit
		}
	}
})(_Index)
export default Index;