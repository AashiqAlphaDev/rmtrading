import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, List, ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import Overview from "./overview"
import PetVaccination from "./pet-vaccination"

import {connect} from "react-redux"

const sideNavPages = [
	{label: "Register New Pet", url: "/admin/dashboard/pets/choose-guardian"},
];

let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/admin/dashboard/pets");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>
				<Layout className={classes.leftSection}>
					<Layout direction={"column"} className={classes.staticSection}>
						<Typography variant="title" className={classes.title}>
							Manage Pet
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
						<Route exact path={"/admin/dashboard/vaccinations"} render={(props) => {
							return <Overview {...props} />;
						}}/>
						<Route exact path={"/admin/dashboard/vaccinations/:pet_id"} render={(props) => {
							return <PetVaccination {...props} />;
						}}/>
					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);