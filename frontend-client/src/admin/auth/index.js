import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import Layout from "../../components/layout";
import {Paper, Typography} from "@material-ui/core/es/index";
import {Route} from "react-router-dom";
import Login from "./login"
import Register from "./signup"
import {signupUiEvents} from "./signup/store/saga";
import {raiseEvent} from "../../components/util";
import {authUiEvents} from "./store/saga";


class _Index extends React.Component {

	componentWillMount=raiseEvent(authUiEvents.AUTH_PAGE_WILL_LOAD,this)

	render() {
		const {classes} = this.props;
		return <Layout flex={1} className={classes.body}>
			<Layout flex={1}>
				<Layout direction={"column"} justifyContent={"center"} className={classes.titleContainer}>
					<Typography variant={"display3"} gutterBottom>
						<span className={classes.title}>
							<span>Every pet </span>
							<span className={classes.titleHighlight}>deserves </span>
							<span>a celebrity</span>
							<span className={classes.titleHighlight}> care !</span>
						</span>
					</Typography>
					<Typography variant={"title"}>
						<span className={classes.subTitle}>
							Getting started is only a few clicks away.
						</span>
					</Typography>
				</Layout>
			</Layout>
			<Paper className={classes.paper}>
				<Route path={"/admin/auth/login"} render={()=>{
					return <Login classes={classes} />
				}} />
				<Route path={"/admin/auth/register"} render={()=>{
					return <Register classes={classes} />
				}} />
			</Paper>
		</Layout>
	}
}

const Index = connect(store => store)(withStyles((theme) => {
	return {
		body:{
			backgroundColor:theme.palette.primary.dark
		},
		container: {
			width: 480
		},
		titleContainer:{
			padding:theme.spacing.unit*4,
		},
		title: {
			color: "rgba(255, 255, 255, 0.7)"
		},
		subTitle:{
			color: "rgb(255, 255, 255)"
		},
		titleHighlight: {
			color: "#FFF"
		},
		content:{
			width:350
		},
		paper:{
			display:"flex"
		}
	}
})(_Index));

export default Index