import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Layout from "../../components/layout";
import {raiseEvent} from "../../components/util";
import {dashboardUiEvents} from "./store/saga";
import Overview from "./overview";
import Pets from "./pets";
import Appointments from "./appointments";
import DashboardLayout from "./dashboard-layout";
import Toolbar from "./toolbar";

import {Route} from "react-router-dom";


class _Index extends React.Component {

    onPageChange(url){
        this.setState({url})
    };
    state={
        url:""
    };
    componentWillMount=raiseEvent(dashboardUiEvents.DASHBOARD_WILL_LOAD,this)

    render() {
        const {classes} = this.props;

        return <div className={classes.fullScreen}>
			<Layout flex={1}>
			    <DashboardLayout location={this.props.location.pathname}/>
                <Layout direction={"column"} flex={1}>
                <Toolbar/>
                    <Route exact path={"/admin/dashboard"} render={()=>{
                        return <Overview location={this.props} onPageChange={this.onPageChange.bind(this)} />
                    }}/>

                    <Route exact path={"/admin/dashboard/overview"} render={()=>{
                    return <Overview location={this.props} onPageChange={this.onPageChange.bind(this)} />
                    }}/>

                    <Route exact path={"/admin/dashboard/pets"} render={()=>{
                        return <Pets location={this.props} onPageChange={this.onPageChange.bind(this)} />
                    }}/>
                    <Route exact path={"/admin/dashboard/appointments"} render={()=>{
                        return <Appointments location={this.props} onPageChange={this.onPageChange.bind(this)} />
                    }}/>

                </Layout>
            </Layout>


        </div>


    }
}

const Index = connect(store => store)(withStyles((theme) => {
    return {
        fullScreen: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        },
        dashboardPanel:{
            width:300,
            backgroundColor:"#001935"
        },
        dashboardTopPanel:{

            flex:1,
            height:76
        },
        body:{
            padding:theme.spacing.unit*1,
        },
        menuIcon:{
            height:300,
            width:300
        },
        avatar: {
            margin:10,
            width: 40,
            height: 40
        },


    }
})(_Index));

export default Index