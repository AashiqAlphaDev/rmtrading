import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import AuthContainer from "../../../components/auth/auth-container";
import Link from "next/link"
import {connect} from "react-redux"
import {authCommands} from "../../../store/domain/auth";


let _Index = class extends React.Component {

    state = {username:"", password:""};


	render() {
		const {classes} = this.props;
		return <AuthContainer>
			<Layout direction={"column"} className={classes.container} justifyContent={"center"} flex={1}>
				<form onSubmit={(e) => {
					e.preventDefault();
					const {username, password} = this.state;
					this.props.dispatch({type: authCommands.SUPER_ADMIN_LOGIN, payload: {username, password}});
				}}>
					<Layout direction={"column"} className={classes.content}>
						<Typography variant={"title"} color={"primary"} className={classes.line}>
							Access your account
						</Typography>
						<Typography variant={"body1"} color={"textSecondary"} className={classes.line}>
							Getting started is quick and simple, Just fill out the info below !
						</Typography>
						<Layout direction={"column"} className={classes.section}>
							<TextField className={classes.line} value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder={"Username"}></TextField>
							<TextField className={classes.line} value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} placeholder={"Password"} type={"password"} />
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
			marginBottom: 2*theme.spacing.unit
		},
		section:{
			marginBottom: 2*theme.spacing.unit
		}
	}
})(connect(store=>store)(_Index))
export default Index;