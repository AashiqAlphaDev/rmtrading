import React from "react";
import DashboardLayout from "./dashboard-layout";
import {Redirect, Route} from "react-router-dom";

import OverView from "./overview";
import Pets from "./pets";
import Registration from "./registration";
import Appointments from "./appointments";
import {connect} from "react-redux";
import {uiEvents} from "../../stores/ui/saga";

let Index = (class extends React.Component {
	state = {
		url: ""
	};

	componentWillMount() {
		this.props.dispatch({type: uiEvents.ADMIN_DASHBOARD_PAGE_LOAD});
	}

	onPageChange(url) {
		this.setState({url})
	}

	render() {
		if (!this.props.ui.dashboard.main.check_in_progress) {
			if (this.props.auth.current_user.is_admin) {
				return <DashboardLayout location={this.props.location} currentPage={this.state.url}>
					<Route exact path={"/admin/dashboard"} render={(props) => {
						return <OverView {...props} onPageChange={this.onPageChange.bind(this)}/>
					}}/>
					<Route path={"/admin/dashboard/registration"} render={(props) => {
						return <Registration {...props} onPageChange={this.onPageChange.bind(this)}/>
					}}/>
					<Route path={"/admin/dashboard/pets"} render={(props) => {
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