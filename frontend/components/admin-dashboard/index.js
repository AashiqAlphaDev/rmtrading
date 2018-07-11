import React from "react"
import Layout from "../layout";
import {withStyles} from "@material-ui/core/styles";
import {List} from "@material-ui/core/index";
import {ListItem} from "@material-ui/core/index";
import {ListItemText} from "@material-ui/core/index";
import {ListItemIcon} from "@material-ui/core/index";
import {AppointmentsIcon, OverviewIcon, PetsIcon} from "../icons";
import Link from "next/link"
import {Typography} from "@material-ui/core/index";
import {withRouter} from 'next/router'


const pages = [
	{
		Icon: () => {
			return <OverviewIcon size={32}/>;
		},
		label: "Overview",
		url: "/dashboard/overview"
	},
	{
		Icon: () => {
			return <PetsIcon size={32}/>;
		},
		label: "Pets",
		url: "/dashboard/pets"
	},
	{
		Icon: () => {
			return <AppointmentsIcon size={32}/>
		},
		label: "Appointments",
		url: "/dashboard/appointments"
	}
];


let Sidebar = ({classes, router})=>{
	return <Layout className={classes.sidebar} direction={"column"} justifyContent={"center"}>
		<List>
			{
				pages.map((page)=>{
					let isActive = router.pathname == page.url;
					return <Link href={page.url} key={page.url}>
						<ListItem className={isActive?classes.sideBarActiveItem:classes.sideBarItem}>
							<ListItemIcon>
								<page.Icon />
							</ListItemIcon>
							<ListItemText >
								<Typography variant={"subheading"} className={isActive?classes.sideBarActiveItemTitle:classes.sideBarItemTitle}>
									{page.label}
								</Typography>
							</ListItemText>
						</ListItem>
					</Link>
				})
			}
		</List>
	</Layout>
}

let _DashboardContainer = (props) => {
	const {children, classes, router} = props;
	return <Layout className={classes.body}>
		<Sidebar classes={classes} router={router}/>
		{children}
	</Layout>
}

let DashboardContainer = withStyles((theme)=>{
	return {
		body:{
			height:"100%"
		},
		sidebar:{
			minWidth:300,
			background:theme.palette.primary.dark
		},
		sideBarItemTitle:{
			opacity:0.5,
			color:"#FFF"
		},
		sideBarActiveItemTitle:{
			color:theme.palette.primary.dark
		},
		sideBarItem:{

		},
		sideBarActiveItem:{
			background:"#FFF"
		}
	}
})(withRouter(_DashboardContainer));

export default DashboardContainer;
