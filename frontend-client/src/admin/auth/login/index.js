import React from "react"
import Layout from "../../../components/layout";
import {Button, TextField, Typography} from "@material-ui/core/es/index";
import InputContainer from "../../../components/input"
import {connect} from "react-redux"
import {authCommands} from "../../../stores/entities/auth/sagas";
import {raiseEvent, setStateKey} from "../../../components/util";
import {loginUiEvents} from "./store/saga";
import Link from "react-router-dom/es/Link";




export default connect(store=>store)(
	class extends React.Component{

		setStateKey=setStateKey.bind(this);
		componentWillMount=raiseEvent(loginUiEvents.LOGIN_PAGE_WILL_LOAD,this);

		render(){
			const {classes} = this.props;
			return <Layout direction={"column"} className={classes.container} alignItems={"center"} justifyContent={"center"} flex={1}>
				<form onSubmit={(e)=>{
					e.preventDefault();
					const {email, password} = this.state;
					this.props.dispatch({type:authCommands.LOGIN, payload:{email, password}});
				}}>
					<Layout direction={"column"} className={classes.content}>
						<Typography variant={"title"} color={"primary"}>
							Let’s Get Started…
						</Typography>
						<Typography variant={"body1"} color={"primary"}>
							Getting started is quick and simple, Just fill out the info below !
						</Typography>
						<InputContainer label={"Email"}>
							<TextField onChange={this.setStateKey("email")}></TextField>
						</InputContainer>
						<InputContainer label={"Password"}>
							<TextField onChange={this.setStateKey("password")} />
						</InputContainer>
						<Button type={"submit"} color={"primary"} variant={"raised"}>Login</Button>
					</Layout>
				</form>
				<Link to={"/admin/auth/register"}>signup</Link>
			</Layout>
		}
	}
)