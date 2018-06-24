import React from "react"
import Layout from "../../../components/layout";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import Overview from "./overview"
import Visit from "./visit"

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
			<Layout direction={"column"} className={`container`}>
				<Switch>
					<Route exact path={"/admin/dashboard/pets/:pet_id"} render={(props) => {
						return <Overview {...props} />;
					}}/>
					<Route exact path={"/admin/dashboard/pets/:pet_id/visits/:visit_id"} render={(props) => {
						return <Visit {...props} />;
					}}/>
				</Switch>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);