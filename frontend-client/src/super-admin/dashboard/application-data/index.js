import React from "react"
import Layout from "../../../components/layout";
import {Switch, Route} from "react-router-dom";
import Tokens from "../tokens";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import Countries from "./countries"
import PetTypes from "./pet-types"
import Diseases from "./diseases"
import Inventory from "./inventory"
import ManagePetTypes from "./manage-pet-types"


let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {
	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/super-admin/dashboard/application-data");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>

				<Layout direction={"column"} flex={1}>
					<Switch>

						<Switch>
							<Route exact path={"/super-admin/dashboard/application-data/pet-types/:pet_type_id/manage"}
							       render={(props) => {
								       console.log(props);
								       return <ManagePetTypes {...props} />
							       }}/>

							<Route exact path={"/super-admin/dashboard/application-data/countries"} render={(props) => {
								return <Countries {...props}/>;
							}}/>

							<Route path={"/super-admin/dashboard/application-data/inventory"} render={(props) => {
								return <Inventory {...props}/>;
							}}/>
							<Route path={"/super-admin/dashboard/application-data/pet-types"} render={(props) => {
								return <PetTypes {...props}/>;
							}}/>
							<Route path={"/super-admin/dashboard/application-data/diseases"} render={(props) => {
								return <Diseases {...props}/>;
							}}/>
							<Route path={"/super-admin/dashboard/application-data/tokens"} render={(props) => {
								return <Tokens {...props} />
							}}/>

						</Switch>

					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);