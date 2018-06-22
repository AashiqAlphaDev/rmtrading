import React from "react";
import Layout from "../../../components/layout";
import {Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import style from "../style";
import Overview from "./overview";
import PetVaccination from "./pet-vaccination";
import AddGuardian from "./add-guardian"
import AddPet from "./add-pet"
import {connect} from "react-redux";


let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/admin/dashboard/vaccinations");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout direction={"column"} className={`container flex`}>
				<Switch>
					<Route exact path={"/admin/dashboard/vaccinations"} render={(props) => {
						return <Overview {...props} />;
					}}/>
					<Route exact path={"/admin/dashboard/vaccinations/add-guardian"} render={(props) => {
						return <AddGuardian {...props} />;
					}}/>
					<Route exact path={"/admin/dashboard/vaccinations/:guardian_id/add-pet"} render={(props) => {
						return <AddPet {...props} />;
					}}/>
					<Route exact path={"/admin/dashboard/vaccinations/:pet_id"} render={(props) => {
						return <PetVaccination {...props} />;
					}}/>
				</Switch>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);