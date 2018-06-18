import React from "react"
import Layout from "../../../components/layout";
import {Typography,List,ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import Countries from "./countries"
import PetTypes from "./pet-types"
import Diseases from "./diseases"
import Inventory from "./inventory"
import VetCenterTypes from "./vet-center-types"

const sideNavPages = [
	{label:"Countries", url:"/super-admin/dashboard/application-data/countries"},
	{label:"Inventory", url:"/super-admin/dashboard/application-data/inventory"},
	{label:"Pet Types", url:"/super-admin/dashboard/application-data/pet-types"},
	{label:"Diseases", url:"/super-admin/dashboard/application-data/diseases"}
];

let Index = withStyles((theme)=>{
	return {
		...style(theme),
	}
})(class extends React.Component {
	render(){
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>
				<Layout className={classes.leftSection}>
					<Layout direction={"column"} className={classes.staticSection}>
						<Typography variant="title" className={classes.title}>
							Application Data
						</Typography>
						<List>
							{
								sideNavPages.map((item, index)=>{
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

						<Switch>
                            <Route exact path={"/super-admin/dashboard/application-data/countries"} render={(props)=>{
                                return <Countries location={props.location} />;
                            }}/>
                            <Route path={"/super-admin/dashboard/application-data/vet-center-types"} render={(props)=>{
                                return <VetCenterTypes location={props.location}/>;
                            }}/>
							<Route path={"/super-admin/dashboard/application-data/inventory"} render={(props)=>{
                                return <Inventory location={props.location}/>;
                            }}/>
							<Route path={"/super-admin/dashboard/application-data/pet-types"} render={(props)=>{
                                return <PetTypes location={props.location}/>;
                            }}/>
							<Route path={"/super-admin/dashboard/application-data/diseases"} render={(props)=>{
                                return <Diseases location={props.location}/>;
                            }}/>




						</Switch>

					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store=>store)(Index);