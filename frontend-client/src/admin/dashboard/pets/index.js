import React from "react"
import Layout from "../../../components/layout";
import {Typography,TextField,List,ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import Overview from "./overview"
import AddPet from "./add-pet"
import ChooseGuardian from "./choose-guardian"
import AddGuardian from "./add-guardian"

import {connect} from "react-redux"

const sideNavPages = [
	{label:"Register New Pet", url:"/admin/dashboard/pets/choose-guardian"},
];

let Index = withStyles((theme)=>{
	return {
		...style(theme),
	}
})(class extends React.Component {

	componentWillMount(){
		console.log("here")
		if(this.props.onPageChange){
			this.props.onPageChange("/admin/dashboard/pets");
		}
	}

	render(){
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
						<Route exact path={"/admin/dashboard/pets"} render={(props)=>{
							return <Overview location={props.location} />;
						}}/>
						<Route exact path={"/admin/dashboard/pets/choose-guardian"} render={(props)=>{
                            return <ChooseGuardian location={props.location} />;
                        }}/>
						<Route exact path={"/admin/dashboard/pets/add-guardian"} render={(props)=>{
                            return <AddGuardian {...props.location} />;
                        }}/>
						<Route exact path={"/admin/dashboard/pets/:guardian_id/add-pet"} render={(props)=>{
                            return <AddPet {...props.location} />;
                        }}/>
					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store=>store)(Index);