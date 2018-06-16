import React from "react";
import DashboardLayout from "./dashboard-layout"
import VetCenters from "./vet-centers"
import ApplicationData from "./application-data"
import {connect} from "react-redux"
import {CHECK_SUPER_ADMIN} from "../../stores/auth/actions";
import {Redirect, Route} from "react-router-dom";


let Index = (class extends React.Component {
	componentDidMount(){
		this.props.dispatch({type:CHECK_SUPER_ADMIN});
	}
	render(){
		if(this.props.auth.hasOwnProperty('superAdminCheckInProgress') && !this.props.auth.superAdminCheckInProgress){
			if(this.props.auth.isSuperAdmin){
				return <DashboardLayout location={this.props.location}>
					{
						this.props.auth.redirect &&
						<Redirect to={this.props.auth.redirect}/>
					}
					<Route path={"/super-admin/dashboard/vet-centers"} render={()=>{
						return <VetCenters location={this.props.location} />
					}}/>
					<Route path={"/super-admin/dashboard/application-data"} render={()=>{
						return <ApplicationData location={this.props.location} />
					}}/>
				</DashboardLayout>
			}
			else{
				return <Redirect to={"/super-admin/auth"}/>
			}
		}
		else{
			return <div></div>
		}
	}
});

export default connect(store=>store)(Index);