import React from "react"
import Layout from "../../../components/layout";
import {authCommands} from "../../../../frontend-client/src/stores/entities/auth/sagas";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import AuthContainer from "../../../components/auth/auth-container";

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
							It happens.
						</Typography>
						<Typography variant={"body1"} color={"textSecondary"} className={classes.line}>
							Provide your email to reset your account.
						</Typography>
						<Layout direction={"column"} className={classes.section}>
							<TextField className={classes.line}  placeholder={"Email"}></TextField>
						</Layout>
						<Layout direction={"column"}>
							<Button type={"submit"} color={"primary"} variant={"raised"}>Reset</Button>
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