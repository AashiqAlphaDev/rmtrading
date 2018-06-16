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
		console.log(this.props);
		if(!this.props.auth.superAdminCheckInProgress){
			if(this.props.auth.isSuperAdmin){
				return <DashboardLayout location={this.props.location}>
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