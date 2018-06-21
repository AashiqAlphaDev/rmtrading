import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Layout from "../../components/layout";
import {AppBar, Toolbar} from "@material-ui/core/index";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {REQUEST_SUPER_ADMIN_LOGOUT} from "../../stores/auth/actions";
import {Tab, Tabs} from "@material-ui/core/es/index";
import _ from "underscore"

const pages = [
	{label: "Overview", url: "/super-admin/dashboard/"},
	{label: "Vet Centers", url: "/super-admin/dashboard/vet-centers"},
	{label: "Vaccines", url: "/super-admin/dashboard/vaccines"},
	{label: "Application Data", url: "/super-admin/dashboard/application-data"},
	{label: "Orders", url: "/super-admin/dashboard/orders"},
	{label: "Requests", url: "/super-admin/dashboard/requests"}
];

let Index = withStyles(() => (
	{
		fullScreen: {
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column"
		}
	}
))(class extends React.Component {
	render() {
		const {classes} = this.props;
		var currentTab = 0;
		if (this.props.currentPage !== "") {
			currentTab = _.findIndex(pages, (item) => {
				return item.url === this.props.currentPage;
			});
		}
		return <div className={classes.fullScreen}>
			<Layout direction={"column"} className={`flex`}>
				<AppBar position="static" color="default">
					<Toolbar className={`container`}>
						<Layout direction={"column"} className={`flex`}>
							<div className={`flex ${classes.logo}`}>
								<Link to={"/super-admin/dashboard/"}>
									<img src={"/logo.png"} style={{height: 40}} alt={"logo"}/>
								</Link>
							</div>
							<Layout direction="column">
								<Tabs centered fullWidth value={currentTab}>
									{
										pages.map((page, index) => {
											return <Tab label={page.label} component={Link} to={page.url} key={index}>
											</Tab>;
										})
									}
									<Tab label="Logout" className={classes.navButton} onClick={() => {
										this.props.dispatch({type: REQUEST_SUPER_ADMIN_LOGOUT})
									}}>
									</Tab>
								</Tabs>
							</Layout>
						</Layout>
					</Toolbar>
				</AppBar>
				{this.props.children}
			</Layout>
		</div>;
	}
});
export default connect(store => store)(Index)