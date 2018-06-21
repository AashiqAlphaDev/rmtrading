import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, List, ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import AddCenter from "./add-center"
import Overview from "./overview"
import VaccinationCenterManage from "./vaccination-center-manage"
import {connect} from "react-redux"

const sideNavPages = [
	{label: "Add Vet Center", url: "/super-admin/dashboard/vet-centers/add-center"},
];

let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {
	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/super-admin/dashboard/vet-centers");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>
				<Layout className={classes.leftSection}>
					<Layout direction={"column"} className={classes.staticSection}>
						<Typography variant="title" className={classes.title}>
							Manage Vet Centers
						</Typography>
						<TextField className={classes.searchField} placeholder={"Search"}/>
						<List>
							{
								sideNavPages.map((item, index) => {
									return <Link key={index} to={item.url}>
										<ListItem button> {item.label} </ListItem>
									</Link>
								})
							}
						</List>
					</Layout>
				</Layout>
				<Layout direction={"column"} className={classes.rightSection}>
					<Switch>
						<Route exact path={"/super-admin/dashboard/vet-centers"} render={(props) => {
							return <Overview location={props.location}/>;
						}}/>
						<Route path={"/super-admin/dashboard/vet-centers/add-center"} render={(props) => {
							return <AddCenter location={props.location}/>;
						}}/>
						<Route exact path={"/super-admin/dashboard/vet-centers/:center_id/manage"} render={(props) => {
							return <VaccinationCenterManage location={props.location}
							                                centerId={props.match.params.center_id}/>;
						}}/>
					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);