import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import Layout from "../../components/layout";
import {raiseEvent} from "../../components/util";
import {dashboardUiEvents} from "./store/saga"
import {Avatar, Paper, Typography} from "@material-ui/core/es/index";
import {AppointmentsIcon, OverviewIcon, PetsIcon} from "../../components/icons";
import {Link} from "react-router-dom";


let MenuIcon =(iconType) =>{
    if(iconType=="Overview")
    {
        return <OverviewIcon/>
    }
    else if(iconType=="Pets")
    {
        return <PetsIcon/>
    }
    else if(iconType=="Appointments")
    {
        return <AppointmentsIcon/>
    }
};

const pages = [
    {
        label: "Overview", url: "/admin/dashboard/overview"
    },
    {
        label: "Pets", url: "/admin/dashboard/pets"
    },
    {
        label: "Appointments", url: "/admin/dashboard/appointments"
    }
];


class _Index extends React.Component {

    componentWillMount=raiseEvent(dashboardUiEvents.DASHBOARD_WILL_LOAD,this)

    render() {
        const {classes} = this.props;

        return <Layout>
			<Layout className={classes.dashboardPanel}  direction={"column"}>
                {
                    pages.map((page, index) => {
                        return <Link to={page.url} key={index}>
                                    <Layout>
                                        <MenuIcon iconType={page.label}/>
                                        <Typography variant={"title"} className={classes.menuItem}>
                                            {page.label}
                                        </Typography>
                                    </Layout>
                                </Link>
                    })
                }
			</Layout>
		</Layout>
    }
}

const Index = connect(store => store)(withStyles((theme) => {
    return {
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
        fullScreen: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        },
        menuItem:{
            color:"#FFFFFF"
        }



    }
})(_Index));

export default Index