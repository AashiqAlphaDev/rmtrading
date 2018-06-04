import React from "react";
import AdminLayoutWrapper from "../../layouts/super-admin-layout";
import {connect} from "react-redux";
import Container from "../../components/container";
import withRoot from "../../src/withRoot";
import {Typography} from "@material-ui/core";

const Index = withRoot((theme)=>{
	return {
		body: {
			padding:theme.spacing.unit,
			paddingTop:theme.spacing.unit*2
		}
	}
})(({classes}) => (
	<Container className={classes.body}>
		<Typography variant={"subheading"}>
			3rd Party
		</Typography>
	</Container>
))

export default (AdminLayoutWrapper(connect(store => store)(Index), {url:"/super-admin/3rd-party"}))