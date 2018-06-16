import React from "react";
import DashboardLayout from "./dashboard-layout"
import Layout from "../../components/layout";
import {withStyles} from "@material-ui/core/styles"


let Index = withStyles((theme)=>{
	return {
		body:{
			marginTop: theme.spacing.unit*1
		}
	}
})(class extends React.Component {
	render(){
		const {classes} = this.props;
		return <DashboardLayout location={this.props.location}>
			<Layout direction={"column"} className={`container ${classes.body}`}>
				Sample
			</Layout>
		</DashboardLayout>;
	}
});

export default Index;