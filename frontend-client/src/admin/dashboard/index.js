import React from "react";
import DashboardLayout from "./dashboard-layout";
import {Redirect, Route} from "react-router-dom";

import OverView from "./overview";
import Pets from "./registration";
import Appointments from "./appointments";
import {connect} from "react-redux";
import {CHECK_ADMIN} from "../../stores/auth/actions";

let Index = (class extends React.Component {
	state = {
		url: ""
	};

	componentWillMount() {
		this.props.dispatch({type: CHECK_ADMIN});
	}

	onPageChange(url) {
		this.setState({url})
	}

	render() {
		if (this.props.auth.hasOwnProperty('adminCheckInProgress') && !this.props.auth.adminCheckInProgress) {
			if (this.props.auth.isAdmin) {
				return <DashboardLayout location={this.props.location} currentPage={this.state.url}>
					{
						this.props.auth.redirect &&
						<Redirect to={this.props.auth.redirect}/>
					}
					<Route exact path={"/admin/dashboard"} render={(props) => {
						return <OverView {...props} onPageChange={this.onPageChange.bind(this)}/>
					}}/>
					<Route path={"/admin/dashboard/pets"} render={(props) => {
						return <Pets {...props} onPageChange={this.onPageChange.bind(this)}/>
					}}/>
					<Route path={"/admin/dashboard/vaccinations"} render={(props) => {
						return <Pets {...props} onPageChange={this.onPageChange.bind(this)}/>
					}}/>
					<Route path={"/admin/dashboard/appointments"} render={(props) => {
						return <Appointments {...props} onPageChange={this.onPageChange.bind(this)}/>
					}}/>
				</DashboardLayout>
			}
			else {
				return <Redirect to={"/admin/auth/login"}/>
			}
		}
		else {
			return <div></div>
		}
	}
});

export default connect(store => store)(Index);