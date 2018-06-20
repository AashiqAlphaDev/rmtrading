import React from "react";
import DashboardLayout from "./dashboard-layout"
import {Redirect, Route} from "react-router-dom";
import Pets from "./pets"
import OverView from "./overview"
import {connect} from "react-redux";

let Index = (class extends React.Component {
	state={
		url:""
	};
	componentDidMount(){

	}

	onPageChange(url){
		this.setState({url})

	}
	render() {
        return <DashboardLayout location={this.props.location} currentPage={this.state.url}>
            {
                this.props.auth.redirect &&
				<Redirect to={this.props.auth.redirect}/>
            }
			<Route exact path={"/admin/dashboard"} render={() => {
                return <OverView location={this.props} onPageChange={this.onPageChange.bind(this)}/>
            }}/>
            <Route path={"/admin/dashboard/pets"} render={() => {
                return <Pets location={this.props} onPageChange={this.onPageChange.bind(this)}/>
            }}/>

		</DashboardLayout>
    }


});

export default connect(store=>store)(Index);