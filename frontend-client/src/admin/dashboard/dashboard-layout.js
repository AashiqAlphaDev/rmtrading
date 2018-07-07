import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import Layout from "../../components/layout";
import {raiseEvent} from "../../components/util";
import {dashboardUiEvents} from "./store/saga"
import {Avatar, Paper, Typography} from "@material-ui/core/es/index";
import {AppointmentsIcon, OverviewIcon, PetsIcon} from "../../components/icons";
import {Link} from "react-router-dom";


let Icon = (_Icon) => {
    return (props) => (<_Icon/>)
};


const pages = [
    {
        icon: () => {
            return <OverviewIcon/>
        }, label: "Overview", url: "/admin/dashboard/overview"
    },
    {
        icon: () => {
            return <PetsIcon/>
        }, label: "Pets", url: "/admin/dashboard/pets"
    },
    {
        icon: () => {
            return <AppointmentsIcon/>
        }, label: "Appointments", url: "/admin/dashboard/appointments"
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
                        let PageIcon = Icon(page.icon);
                        return <Link to={page.url} key={index}>
                                    <Layout alignItems={"center"}>
                                        <span className={classes.menuIcon}><PageIcon/></span>

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
           fontSize:50
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