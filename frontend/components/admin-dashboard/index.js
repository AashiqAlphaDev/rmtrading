import React from "react"
import Layout from "../layout";
import {withStyles} from "@material-ui/core/styles";
import {List, ListItem,ListItemText,ListItemIcon, AppBar,Toolbar, Button} from "@material-ui/core/index";
import {AppointmentsIcon, OverviewIcon, PetsIcon} from "../icons";
import Link from "next/link"
import {Typography} from "@material-ui/core/index";
import {withRouter} from 'next/router'
import {connect} from "react-redux"
import {authCommands} from "../../store/domain/auth";

let pageTitles = {
	"/dashboard/overview":"Overview",
	"/dashboard/pets":"Pets",
	"/dashboard/appointments":"Appointments"
};

const pages = [
	{
		Icon: () => {
			return <OverviewIcon size={32}/>;
		},
		url: "/dashboard/overview"
	},
	{
		Icon: () => {
			return <PetsIcon size={32}/>;
		},
		url: "/dashboard/pets"
	},
	{
		Icon: () => {
			return <AppointmentsIcon size={32}/>
		},
		url: "/dashboard/appointments"
	}
];


let Sidebar = ({classes, path})=>{
	return <Layout className={classes.sidebar} direction={"column"} justifyContent={"center"}>
		<List>
			{
				pages.map((page)=>{
					let isActive = path == page.url;
					return <Link href={page.url} key={page.url}>
						<ListItem className={isActive?classes.sideBarActiveItem:classes.sideBarItem}>
							<ListItemIcon>
								<page.Icon />
							</ListItemIcon>
							<ListItemText >
								<Typography variant={"subheading"} className={isActive?classes.sideBarActiveItemTitle:classes.sideBarItemTitle}>
									{pageTitles[page.url]}
								</Typography>
							</ListItemText>
						</ListItem>
					</Link>
				})
			}
		</List>
	</Layout>
}

let AppToolbar = ({path, classes, dispatch})=>{
	return <AppBar position="static" color="default">
		<Toolbar>
			<Typography variant={"title"} className={classes.navTitle}>
				{pageTitles[path]}
			</Typography>
			<Button onClick={()=>{
				dispatch({type:authCommands.ADMIN_LOGOUT})
			}}>
				Logout
			</Button>
		</Toolbar>
	</AppBar>
}

let _DashboardContainer = (props) => {
	const {children, classes, router, dispatch} = props;
	return <Layout className={classes.body}>
		<Sidebar classes={classes} path={router.pathname}/>
		<Layout flex={1} direction={"column"} style={{borderLeft:"1px solid rgba(0, 0, 0, 0.12)"}}>
			<AppToolbar dispatch={dispatch} classes={classes} path={router.pathname} />
			{children}
		</Layout>
	</Layout>
}

let DashboardContainer = withStyles((theme)=>{
	return {
		body:{
			height:"100%"
		},
		sidebar:{
			minWidth:300,
			background:theme.palette.primary.dark,

		},
		sideBarItemTitle:{
			color:"#FFF"
		},
		sideBarActiveItemTitle:{
			color:theme.palette.primary.dark
		},
		sideBarItem:{
			opacity:0.5,
		},
		sideBarActiveItem:{
			background:"#FFF"
		},
		navTitle:{
			flex:1
		}
	}
})(withRouter(connect(store=>store)(_DashboardContainer)));

export default DashboardContainer;
