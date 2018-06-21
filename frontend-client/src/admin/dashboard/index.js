import React from "react";
import DashboardLayout from "./dashboard-layout"
import {Redirect, Route} from "react-router-dom";
import Pets from "./pets"
import OverView from "./overview"
import Vaccination from "./vaccination"
import Requests from "./requests"
import {connect} from "react-redux";

let Index = (class extends React.Component {
	state = {
		url: ""
	};

	componentDidMount() {

	}

	onPageChange(url) {
		console.log(url)
		this.setState({url})
	}

	render() {
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
				return <Vaccination {...props} onPageChange={this.onPageChange.bind(this)}/>
			}}/>
			<Route path={"/admin/dashboard/requests"} render={(props) => {
				return <Requests {...props} onPageChange={this.onPageChange.bind(this)}/>
			}}/>
		</DashboardLayout>
	}


});

export default connect(store => store)(Index);