import React from "react";
import DashboardLayout from "./dashboard-layout"
import VetCenters from "./vet-centers"
import {connect} from "react-redux"
import {CHECK_SUPER_ADMIN} from "../../stores/auth/actions";
import {Redirect} from "react-router-dom";


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
					<VetCenters />
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