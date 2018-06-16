import React from "react"
import Layout from "../../../components/layout";
import {Typography,TextField,List,ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";

const sideNavPages = [
	{label:"Add Vet Center", url:"/super-admin/dashboard/vet-centers/add-vet-center"},
	{label:"Upload Vet Centers", url:"/super-admin/dashboard/vet-centers/upload-vet-centers"},
	{label:"Download Vet Centers", url:"/super-admin/dashboard/vet-centers/download-vet-centers"},
]

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
							Manage Vet Centers
						</Typography>
						<TextField className={classes.searchField} placeholder={"Search"}/>
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
						<Route exact path={"/super-admin/dashboard/vet-centers/"} render={()=>{
							return <div>Vet Centers</div>;
						}}/>
						<Route path={"/super-admin/dashboard/vet-centers/add-center"} render={()=>{
							return <div>Add Center</div>;
						}}/>
						<Route path={"/super-admin/dashboard/vet-centers/search"} render={()=>{
							return <div>Search</div>;
						}}/>
						<Route exact path={"/super-admin/dashboard/vet-centers/:center_id/detail"} render={()=>{
							return <div>Center Id</div>;
						}}/>
					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default Index;