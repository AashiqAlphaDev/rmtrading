import React from "react"
import Layout from "../../../components/layout";
import {Button, TextField, Typography} from "@material-ui/core/es/index";
import InputContainer from "../../../components/input"
import {raiseEvent, setStateKey} from "../../../components/util";
import {authCommands} from "../../../stores/entities/auth/sagas";
import {signupUiEvents} from "./store/saga";
import {connect} from "react-redux"
import {Link} from "react-router-dom";

export default connect(store=>store)(class extends React.Component{

	setStateKey=setStateKey.bind(this);
	componentWillMount=raiseEvent(signupUiEvents.SIGNUP_PAGE_WILL_LOAD,this)

	render(){
		const {classes} = this.props;
		return <Layout direction={"column"} className={classes.container} alignItems={"center"} justifyContent={"center"} flex={1}>
			<form onSubmit={(e)=>{
				e.preventDefault();
				const {name,email, password} = this.state;
				this.props.dispatch({type:authCommands.SIGN_UP, payload:{name,email, password}});
			}}>
				<Layout direction={"column"} className={classes.content}>
					<Typography variant={"title"} color={"primary"}>
						Let’s Get Started…
					</Typography>
					<Typography variant={"body1"} color={"primary"}>
						Getting started is quick and simple, Just fill out the info below !
					</Typography>
					<InputContainer label={"Name"}>
						<TextField  onChange={this.setStateKey("name")}/>
					</InputContainer>
					<InputContainer label={"Email"}>
						<TextField onChange={this.setStateKey("email")}/>
					</InputContainer>
					<InputContainer label={"Password"}>
						<TextField onChange={this.setStateKey("password")}/>
					</InputContainer>
					<Button color={"primary"} variant={"raised"}>Register</Button>
				</Layout>
			</form>
			<Link to={"/admin/auth/login"}>login</Link>
		</Layout>
	}
})