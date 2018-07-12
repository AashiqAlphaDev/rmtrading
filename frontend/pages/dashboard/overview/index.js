import React from "react"
import DashboardContainer from "../../../components/admin-dashboard";
import {checkAdmin} from "../index";
import {PetsIcon, SyringeIcon, VetCenterIcon, VisitsIcon} from "../../../components/icons";
import Layout from "../../../components/layout";
import {Paper, Typography} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles";


let overViewMetrics = [
	{
		label: "Vaccinations",
		count: "30,000",
		icon: <VetCenterIcon size={44}/>
	},
	{
		label: "Visits",
		count: "30,000",
		icon: <VisitsIcon size={44}/>
	},
	{
		label: "Pets",
		count: "30,000",
		icon: <PetsIcon size={44}/>
	},
	{
		label: "Vaccines",
		count: "30,000",
		icon: <SyringeIcon  size={44}/>
	}
];


let _Index = ({classes})=>{
	return <DashboardContainer>
		<Layout>
			{
				overViewMetrics.map((item, index)=>{
					return <Paper key={index} elevation={0} className={classes.card}>
						<Layout alignItems={"center"}>
							{item.icon}
							<Layout direction={"column"} className={classes.titleTitles}>
								<Typography variant={"subheading"} color={"textSecondary"}>{item.label}</Typography>
								<Typography variant={"title"}>{item.count}</Typography>
							</Layout>
						</Layout>
					</Paper>
				})
			}
		</Layout>
	</DashboardContainer>
};

let Index = withStyles((theme) => {
	return {
		card:{
			margin:theme.spacing.unit*2,
			flex:1,
			padding:theme.spacing.unit*2
		},
		titleTitles:{
			marginLeft:theme.spacing.unit*2,
		}
	}
})(checkAdmin(_Index));

export default Index