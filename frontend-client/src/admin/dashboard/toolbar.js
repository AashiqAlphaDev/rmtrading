import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import Layout from "../../components/layout";
import {raiseEvent} from "../../components/util";
import {dashboardUiEvents} from "./store/saga"
import {Avatar, Paper, Typography} from "@material-ui/core/es/index";
import {AppointmentsIcon} from "../../components/icons";
import {Link} from "react-router-dom";

const pages = [
    {
        label: "Overview", url: "/admin/dashboard/overview"
    },
    {
        label: "Pets", url: "/admin/dashboard/vet-centers"
    },
    {
        label: "appointments", url: "/admin/dashboard/vaccines"
    }
];


class _Index extends React.Component {

    componentWillMount=raiseEvent(dashboardUiEvents.DASHBOARD_WILL_LOAD,this)

    render() {
        const {classes} = this.props;

        return  <Layout>
                <Paper className={classes.dashboardTopPanel}>
                        <Layout direction={"column"} flex={1} alignItems={"flex-end"} justifyContent={"center"} className={classes.body}>
                            <Layout alignItems={"center"} flex={1} >
                                <Avatar
                                    alt="Profile"
                                    src="https://openclipart.org/download/277084/Male-Avatar-3.svg"
                                    className={classes.avatar}
                                />
                                <Typography variant={"body2"}>
                                    Karthik1729
                                </Typography>
                            </Layout>
                        </Layout>
                    </Paper>
                </Layout>
    }
}

const Index = connect(store => store)(withStyles((theme) => {
    return {
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
        }


    }
})(_Index));

export default Index