import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import Layout from "../../components/layout";
import {raiseEvent} from "../../components/util";
import {dashboardUiEvents} from "./store/saga"
import {Avatar, Paper, Typography} from "@material-ui/core/es/index";


class _Index extends React.Component {
	componentWillMount = raiseEvent(dashboardUiEvents.DASHBOARD_WILL_LOAD, this)

	render() {
		const {classes} = this.props;
		return <Paper className={classes.dashboardTopPanel} elevation={0}>
			<Layout>
				<Layout flex={1}>

				</Layout>
				<Layout alignItems={"center"}>
					<Avatar alt="Profile" src="https://openclipart.org/download/277084/Male-Avatar-3.svg"
					        className={classes.avatar}/>
					<Typography variant={"body2"}>
						Karthik1729
					</Typography>
				</Layout>
			</Layout>
		</Paper>
	}
}

const Index = connect(store => store)(withStyles((theme) => {
	return {
		dashboardTopPanel: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
		},
		menuIcon: {
			height: 300,
			width: 300
		},
		avatar: {
			margin: 10,
			width: 44,
			height: 44
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