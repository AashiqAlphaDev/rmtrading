import React from "react";
import DashboardLayout from "./dashboard-layout"
import Layout from "../../components/layout";
import {withStyles} from "@material-ui/core/styles"
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {CHECK_ADMIN} from "../../stores/auth/actions";


let Index = withStyles((theme)=>{
	return {
		body:{
			marginTop: theme.spacing.unit*1
		}
	}
})(class extends React.Component {

	componentDidMount(){
		this.props.dispatch({type:CHECK_ADMIN});
	}

	render(){
		const {classes} = this.props;
		console.log(this.props);
		if(this.props.auth.hasOwnProperty('adminCheckInProgress') && !this.props.auth.adminCheckInProgress) {
			if (this.props.auth.isAdmin) {
				return <DashboardLayout location={this.props.location}>
					{
						this.props.auth.redirect &&
						<Redirect to={this.props.auth.redirect}/>
					}
					<Layout direction={"column"} className={`container ${classes.body}`}>
						Sample
					</Layout>
				</DashboardLayout>;
			}
			else{
				return <Redirect to={"/admin/auth/login"}/>;
			}
		}
		else{
			return <div></div>
		}
	}
});

export default connect(store=>store)(Index);