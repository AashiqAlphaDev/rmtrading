import React from "react"
import Layout from "../../../components/layout";
import {Typography,TextField,List,ListItem} from "@material-ui/core/index";
import {Link, Switch} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"

const sideNavPages = [
	{label:"Countries", url:"/super-admin/dashboard/application-data/countries"},
	{label:"Vet Center Types", url:"/super-admin/dashboard/application-data/vet-center-types"},
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

					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store=>store)(Index);