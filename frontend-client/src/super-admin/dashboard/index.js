import React from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core"
import DashboardLayout from "./dashboard-layout"
import Layout from "../../components/layout";
import _ from "underscore"


const pages = [
	{label: "Pet Registration", url: "/admin/dashboard/pet-registration"},
	{label: "Vaccination", url: "/admin/dashboard/vaccination-centers"},
	{label: "Manage Staff", url: "/admin/dashboard/staff"},
	{label: "Requests", url: "/admin/dashboard/request"},
	{label: "Manage Appointments", url: "/admin/dashboard/inventory"},
];


let Index = (class extends React.Component {
	render(){
		const {classes} = this.props;
		return <Layout direction={"column"}>
			<AppBar position="static" color="default">
				<Toolbar className={`container`}>
					<Typography variant="title" color="inherit" className={`flex`}>
						Admin Dashboard
					</Typography>
					<Layout>
						{
							pages.map((page, index) => {
								return <Button key={index} href={page.url} className={classes.navButton} color={(index === _.findIndex(pages,(item)=>{return this.props.location.pathname===item.url})) ? 'primary' : 'default'}>
									{page.label}
								</Button>
							})
						}
					</Layout>
				</Toolbar>

			</AppBar>
		</Layout>;
	}
});

export default DashboardLayout(Index);