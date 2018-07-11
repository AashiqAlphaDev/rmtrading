import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import AuthContainer from "../../../components/auth/auth-container";
import Link from "next/link"
import {connect} from "react-redux"
import {authCommands} from "../../../store/domain/auth";
import {setStateKey} from "../../../components/util"
import {isAdmin} from "../../../api/api";
import Router from "next/router";

let _Index = class extends React.Component {

	state = {email:"", password:""};
	setStateKey = setStateKey.bind(this);

	static async getInitialProps(ctx){
		let result = await isAdmin(ctx.session_id);
		if (result) {
			const {res} = ctx;
			if (res) {
				res.writeHead(302, {
					Location: '/dashboard'
				});
				res.end();
				res.finished = true;
			} else {
				Router.push('/dashboard');
			}
		}
	}

	render() {
		const {classes} = this.props;
		return <AuthContainer>
			<Layout direction={"column"} className={classes.container}
			               justifyContent={"center"} flex={1}>
				<form onSubmit={(e) => {
					e.preventDefault();
					const {email, password} = this.state;
					this.props.dispatch({type: authCommands.ADMIN_LOGIN, payload: {email, password}});
				}}>
					<Layout direction={"column"} className={classes.content}>
						<Typography variant={"title"} color={"primary"} className={classes.line}>
							Access your account
						</Typography>
						<Typography variant={"body1"} color={"textSecondary"} className={classes.line}>
							Getting started is quick and simple, Just fill out the info below !
						</Typography>

						<Layout direction={"column"} className={classes.section}>
							<TextField className={classes.line} value={this.state.email} onChange={this.setStateKey("email")} placeholder={"Email"}></TextField>
							<TextField className={classes.line} value={this.state.password} onChange={this.setStateKey("password")} placeholder={"Password"} type={"password"} />
						</Layout>

						<Layout direction={"column"}>
							<Typography variant={"body1"} gutterBottom align={"center"} className={classes.line}>
								<span>Forgot your password?, Reset you account </span>
								<Link href={"/auth/reset"}><a>here</a></Link>.
							</Typography>
							<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
						</Layout>
					</Layout>
				</form>
			</Layout>
		</AuthContainer>
	}
};

const Index = withStyles((theme)=>{
	return {
		line:{
			marginBottom:2*theme.spacing.unit
		},
		section:{
			marginBottom:2*theme.spacing.unit
		}
	}
})(connect(store=>store)(_Index))
export default Index;