import React from "react";
import {withStyles} from "@material-ui/core/styles";
import style from "./style";
import Layout from "../../components/layout";
import {AppBar, Toolbar} from "@material-ui/core/index";
import {Link} from "react-router-dom";
import {REQUEST_LOGOUT} from "../../stores/auth/actions";
import {connect} from "react-redux"
import {
	DialogContent,
	Divider,
	ExpansionPanel, ExpansionPanelDetails,
	IconButton,
	Menu,
	MenuItem, Tabs
} from "@material-ui/core/es/index";
import Tab from "@material-ui/core/es/Tab/Tab";
import _ from "underscore";
import {MagnifyIcon, SettingsOutlineIcon} from "mdi-react";

let Icon = (_Icon) => {
	return (props) => (<_Icon {...props} size={20}/>)
};


const pages = [
	{
		icon: ({className}) => {
			return <span className={`icon-home ${className}`}></span>
		}, label: "Overview", url: "/admin/dashboard"
	},
	{
		icon: ({className}) => {
			return <span className={`icon-dog ${className}`}></span>
		}, label: "Pets", url: "/admin/dashboard/vaccinations"
	},
	{
		icon: ({className}) => {
			return <span className={`icon-time ${className}`}></span>
		}, label: "Appointments", url: "/admin/dashboard/appointments"
	},
	{
		icon: ({className}) => {
			return <span className={`icon-box ${className}`}></span>
		}, label: "Store", url: "/admin/dashboard/store"
	},
];

let Index = withStyles((theme) => {
	return (
		{
			...style(theme),
			fullScreen: {
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column"
			},
			selected: {
				fill: theme.palette.secondary.main
			},
			navIcon: {
				margin: theme.spacing.unit * 1
			}
		}
	)
})(class extends React.Component {
	state = {
		anchorEl: null,
		showSearchDialogue: false
	}

	componentWillMount() {

	}

	render() {
		const {classes} = this.props;
		var currentTab = false;
		if (this.props.currentPage !== "") {
			currentTab = _.findIndex(pages, (item) => {
				return item.url === this.props.currentPage
			});
			currentTab = currentTab == -1 ? false : currentTab;
		}
		return <div className={classes.fullScreen}>
			<Layout direction={"column"} className={`flex`}>
				<AppBar position="static" color="default">
					<Toolbar>
						<Layout direction={"column"} className={`flex`}>
							<Layout alignItems={"center"}>
								<div className={`flex`}>
									<Link to={"/admin/dashboard/"} className={classes.logo}>
										<img src={"/logo.png"} style={{height: 30}} alt={"logo"}/>
									</Link>
								</div>
								{
									<Tabs centered value={currentTab}>
										{
											pages.map((page, index) => {
												let PageIcon = Icon(page.icon);
												let iconClass = (index === currentTab) ? classes.selected : '';
												return <Tab classes={{label: classes.tabIcon}}
												            label={
													            <Layout alignItems={"center"}>
														            <PageIcon
															            className={`${iconClass} ${this.props.classes.navIcon}`}/>
														            {page.label}
													            </Layout>
												            }
												            component={Link}
												            to={page.url}
												            key={index}/>;
											})
										}
									</Tabs>
								}
								<div>
									<IconButton onClick={() => {
										this.setState({showSearchDialogue: true});
									}}>
										<MagnifyIcon/>
									</IconButton>
									<IconButton onClick={(event) => {
										this.setState({anchorEl: event.currentTarget})
									}}>
										<SettingsOutlineIcon/>
									</IconButton>
									<Menu
										anchorEl={this.state.anchorEl}
										open={Boolean(this.state.anchorEl)}
										onClose={() => {
											this.setState({anchorEl: null})
										}}
									>
										<MenuItem onClick={() => {
											this.props.dispatch({type: REQUEST_LOGOUT});
										}}>Logout</MenuItem>
									</Menu>
								</div>
							</Layout>
						</Layout>
					</Toolbar>
				</AppBar>
				{this.props.children}
			</Layout>
		</div>;
	}

});

export default connect(store => store)(Index);