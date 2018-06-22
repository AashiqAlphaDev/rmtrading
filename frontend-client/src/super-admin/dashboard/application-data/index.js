import React from "react"
import Layout from "../../../components/layout";
import {Link, Switch, Route} from "react-router-dom";
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
							<Route exact path={"/super-admin/dashboard/application-data/pet-types/:pet_id/manage"} render={(props)=>{
                                return <ManagePetTypes location={props.location} />
                            }} />

							<Route exact path={"/super-admin/dashboard/application-data/countries"} render={(props) => {
								return <Countries location={props.location}/>;
							}}/>

							<Route path={"/super-admin/dashboard/application-data/inventory"} render={(props) => {
								return <Inventory location={props.location}/>;
							}}/>
							<Route path={"/super-admin/dashboard/application-data/pet-types"} render={(props) => {
								return <PetTypes location={props.location}/>;
							}}/>
							<Route path={"/super-admin/dashboard/application-data/diseases"} render={(props) => {
								return <Diseases location={props.location}/>;
							}}/>

						</Switch>

					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);