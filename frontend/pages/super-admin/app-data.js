import React from "react";
import AdminLayoutWrapper from "../../layouts/super-admin-layout";
import {connect} from "react-redux";
import Container from "../../components/container";
import withRoot from "../../src/withRoot";
import {Typography,Chip} from "@material-ui/core";

const Index = withRoot((theme)=>{
	return {
		body: {
			padding:theme.spacing.unit,
			paddingTop:theme.spacing.unit*2
		},
		chip:{

		}
	}
})(({classes}) => (
	<Container className={classes.body}>
		<Typography variant={"subheading"}>Interests</Typography>
		<Typography variant={"subheading"}>Search Filters</Typography>
	</Container>
))

export default (AdminLayoutWrapper(connect(store => store)(Index), {url:"/super-admin/app-data"}))