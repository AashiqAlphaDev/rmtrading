import React from "react";
import DashboardLayout from "./dashboard-layout"
import VetCenters from "./vet-centers"
import ApplicationData from "./application-data"
import Vaccines from "./vaccines"
import Requests from "./requests"
import Orders from "./oders"
import Overview from "./overview"
import {connect} from "react-redux"
import {CHECK_SUPER_ADMIN} from "../../stores/auth/actions";
import {Redirect, Route} from "react-router-dom";



let Index = (class extends React.Component {
	state={
		url:""
	};
	componentDidMount(){
		this.props.dispatch({type:CHECK_SUPER_ADMIN});
	}
	onPageChange(url){
		this.setState({url})
	}
	render(){
		if(this.props.auth.hasOwnProperty('superAdminCheckInProgress') && !this.props.auth.superAdminCheckInProgress){
			if(this.props.auth.isSuperAdmin){
				return <DashboardLayout location={this.props.location} currentPage={this.state.url}>
					{
						this.props.auth.redirect &&
						<Redirect to={this.props.auth.redirect}/>
					}
					<Route exact path={"/super-admin/dashboard/"} render={()=>{
						return <Overview location={this.props.location} onPageChange={this.onPageChange.bind(this)} />
					}}/>
					<Route path={"/super-admin/dashboard/vet-centers"} render={()=>{
						return <VetCenters location={this.props.location} onPageChange={this.onPageChange.bind(this)} />
					}}/>
					<Route path={"/super-admin/dashboard/application-data"} render={()=>{
						return <ApplicationData location={this.props.location} onPageChange={this.onPageChange.bind(this)} />
					}}/>
					<Route path={"/super-admin/dashboard/vaccines"} render={()=>{
						return <Vaccines location={this.props.location} onPageChange={this.onPageChange.bind(this)} />
					}}/>
					<Route path={"/super-admin/dashboard/orders"} render={()=>{
						return <Orders location={this.props.location} onPageChange={this.onPageChange.bind(this)} />
					}}/>
					<Route path={"/super-admin/dashboard/requests"} render={()=>{
						return <Requests location={this.props.location} onPageChange={this.onPageChange.bind(this)} />
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