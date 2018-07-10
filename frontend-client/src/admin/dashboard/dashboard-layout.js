import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import Layout from "../../components/layout";
import {raiseEvent} from "../../components/util";
import {dashboardUiEvents} from "./store/saga"
import {List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core/es/index";
import {AppointmentsIcon, OverviewIcon, PetsIcon} from "../../components/icons";
import {Link, withRouter} from "react-router-dom";


let Icon = (_Icon) => {
	return (props) => (<_Icon {...props}/>)
};


const pages = [
	{
		icon: () => {
			return <OverviewIcon size={32}/>;
		},
		label: "Overview",
		url: "/admin/dashboard/overview"
	},
	{
		icon: () => {
			return <PetsIcon size={32}/>;
		},
		label: "Pets",
		url: "/admin/dashboard/pets"
	},
	{
		icon: () => {
			return <AppointmentsIcon size={32}/>
		},
		label: "Appointments",
		url: "/admin/dashboard/appointments"
	}
];


class _Index extends React.Component {

	componentWillMount = raiseEvent(dashboardUiEvents.DASHBOARD_WILL_LOAD, this)

	render() {
		const {classes} = this.props;
		return <Layout>
			<Layout className={classes.dashboardPanel} direction={"column"}>
				<List>
					{
						pages.map((page, index) => {
							let PageIcon = Icon(page.icon);
							let isActive = this.props.location.pathname == page.url;
							return <Link to={page.url} key={index}>
								<ListItem className={isActive ? classes.activeItem : classes.item}>
									<ListItemIcon>
										<PageIcon/>
									</ListItemIcon>
									<ListItemText className={isActive ? classes.activeItemTitle : ''}>
										<Typography variant={"subheading"} className={isActive ? classes.activeItemTitle : classes.itemTitle}>
											{page.label}
										</Typography>
									</ListItemText>
								</ListItem>
							</Link>
						})
					}
				</List>
			</Layout>
		</Layout>
	}
}

const Index = connect(store => store)(withStyles((theme) => {
	return {
		dashboardPanel: {
			width: 300,
			background: "#001935"
		},
		item: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
		},
		activeItem: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
			background: "#FFF",
			color: "#001935"
		},
		activeItemTitle: {
			color: "#001935"
		},
		itemTitle: {
			color: "#FFF"
		}
	}
})(withRouter(_Index)));

export default Index