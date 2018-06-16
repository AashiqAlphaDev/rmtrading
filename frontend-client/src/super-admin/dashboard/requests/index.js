import React from "react"
import Layout from "../../../components/layout";
import {Typography,TextField,List,ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import Overview from "./overview"
import {connect} from "react-redux"

const sideNavPages = [
	{label:"All Requests", url:"/super-admin/dashboard/vaccines/add-vaccine"},
	{label:"Pending", url:"/super-admin/dashboard/vaccines/upload-vaccines"},
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
							Manage Requests
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
						<Route exact path={"/super-admin/dashboard/vaccines/"} render={(props)=>{
							return <Overview location={props.location} />;
						}}/>
						<Route path={"/super-admin/dashboard/vaccines/search"} render={()=>{
							return <div>Search</div>;
						}}/>
						<Route exact path={"/super-admin/dashboard/vaccines/:vaccine_id/detail"} render={()=>{
							return <div>Center Id</div>;
						}}/>
					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store=>store)(Index);