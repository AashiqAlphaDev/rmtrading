import React from "react"
import Layout from "../../../components/layout";
import {Button, TextField, Typography} from "@material-ui/core/es/index";
import {connect} from "react-redux"
import {authCommands} from "../../../stores/entities/auth/sagas";
import {raiseEvent, setStateKey} from "../../../components/util";
import {loginUiEvents} from "./store/saga";
import {Redirect} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"


let _Index = class extends React.Component {

	setStateKey = setStateKey.bind(this);
	componentWillMount = raiseEvent(loginUiEvents.LOGIN_PAGE_WILL_LOAD, this);

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} className={classes.container} alignItems={"center"}
		               justifyContent={"center"} flex={1}>
			{
				this.props.ui.auth.login.redirect &&
				<Redirect to={this.props.ui.auth.login.redirect}/>
			}
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
						<TextField className={classes.line} onChange={this.setStateKey("email")} placeholder={"Email"}></TextField>
						<TextField className={classes.line} onChange={this.setStateKey("password")} placeholder={"Password"} type={"password"} />
					</Layout>

					<Layout direction={"column"}>
						<Typography variant={"body1"} gutterBottom align={"center"} className={classes.line}>
							Forgot your password?, Reset you account here.
						</Typography>
						<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
					</Layout>
				</Layout>
			</form>
		</Layout>
	}
}


const Index = connect(store => store)(withStyles((theme)=>{
	return {
		line:{
			marginBottom:2*theme.spacing.unit
		},
		section:{
			marginBottom:2*theme.spacing.unit
		}
	}
})(_Index))
export default Index;

