import React from "react";
import DashboardLayout from "./dashboard-layout"
import Layout from "../../components/layout";
import {withStyles} from "@material-ui/core/styles"
import {Redirect, Route} from "react-router-dom";
import Pets from "./pets"
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
			<Route exact path={"/super-admin/dashboard/pet-registeration"} render={() => {
                return <Pets location={this.props} onPageChange={this.onPageChange.bind(this)}/>
            }}/>

		</DashboardLayout>
    }


});

export default connect(store=>store)(Index);