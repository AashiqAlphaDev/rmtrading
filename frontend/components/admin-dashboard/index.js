import React from "react"
import Layout from "../layout";
import {withStyles} from "@material-ui/core/styles";
import {List} from "@material-ui/core/index";
import {ListItem} from "@material-ui/core/index";
import {ListItemText} from "@material-ui/core/index";
import {ListItemIcon} from "@material-ui/core/index";
import {AppointmentsIcon, OverviewIcon, PetsIcon} from "../icons";
import Link from "next/link"
import Button from "@material-ui/core/Button/Button";


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


let Sidebar = ()=>{
	return <Layout>
		<List>
			{
				pages.map((page)=>{
					return <Link href={page.url} key={page.url}>
						<ListItem>
							<ListItemIcon>
								<page.Icon />
							</ListItemIcon>
							<ListItemText primary={page.label} />
						</ListItem>
					</Link>
				})
			}
		</List>
	</Layout>
}

let _DashboardContainer = ({children, classes}) => {
	return <Layout className={classes.body}>
		<Sidebar />
		{children}
	</Layout>
}

let DashboardContainer = withStyles({
	body:{
		height:"100%"
	}
})(_DashboardContainer)

export default DashboardContainer;
