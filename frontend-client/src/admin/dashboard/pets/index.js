import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, List, ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import Overview from "./overview"

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
				<Switch>
					<Route exact path={"/admin/dashboard/pets/:pet_id"} render={(props) => {
						return <Overview {...props} />;
					}}/>
				</Switch>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);