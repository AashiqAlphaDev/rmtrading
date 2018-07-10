import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {AppointmentsIcon, PetsIcon, SyringeIcon, VetCenterIcon, VisitsIcon} from "../../../components/icons";
import Layout from "../../../components/layout";
import {Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core/es/index";
import {raiseEvent} from "../../../components/util";
import {overviewUiEvents} from "./store/saga"

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
]

class _Index extends React.Component {
	componentWillMount = raiseEvent(overviewUiEvents.OVERVIEW_MENU_ITEM_WILL_LOAD, this)

	render() {
		const {classes} = this.props;
		return <div direction={"column"} flex={1} className={`${classes.body}`}>
			<div className={classes.content}>
				<Layout>
					{
						overViewMetrics.map((item, index) => {
							return <Paper className={classes.card} elevation={0} key={index}>
								<Layout alignItems={"center"}>
									{item.icon}
									<Layout direction={"column"} className={classes.cardInfo}>
										<Typography variant={"subheading"}
										            color={"textSecondary"}>{item.label}</Typography>
										<Typography variant={"title"}>{item.count}</Typography>
									</Layout>
								</Layout>
							</Paper>;
						})
					}
				</Layout>
				<Layout>
					{
						[1, 2, 3, 4].map((index) => {
							return <Paper className={classes.listCard} elevation={0} key={index}>
								<Layout direction={"column"}>
									<Typography className={classes.listTitle} gutterBottom variant={"title"}>Top
										States</Typography>
									<Divider/>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Name</TableCell>
												<TableCell numeric>Count</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{
												[1, 2, 3, 4, 5, 6].map((i) => {
													return <TableRow key={i}>
														<TableCell>Sample {i}</TableCell>
														<TableCell numeric>100</TableCell>
													</TableRow>
												})
											}
										</TableBody>
									</Table>
								</Layout>
							</Paper>
						})
					}
				</Layout>
				<Layout>
					<Paper className={classes.listCard} elevation={0}>
						<Layout direction={"column"}>
							<Typography className={classes.listTitle} gutterBottom variant={"title"}>Recent
								Vaccinations</Typography>
							<Divider/>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell numeric>Count</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										[1, 2, 3, 4, 5, 6].map((i) => {
											return <TableRow key={i}>
												<TableCell>Sample {i}</TableCell>
												<TableCell numeric>100</TableCell>
											</TableRow>
										})
									}
								</TableBody>
							</Table>
						</Layout>
					</Paper>

				</Layout>
			</div>
		</div>;
	}
}

const Index = connect(store => store)(withStyles((theme) => {
	return {
		cardIcon: {
			fontSize: 50
		},
		body: {
			overflow: "scroll"
		},
		content: {
			marginTop: theme.spacing.unit * 2,
		},
		listCard: {
			flex: 1,
			margin: theme.spacing.unit * 1
		},
		listTitle: {
			padding: theme.spacing.unit * 2
		},
		card: {
			flex: 1,
			margin: theme.spacing.unit * 1,
			padding: theme.spacing.unit * 2
		},
		cardInfo: {
			marginLeft: theme.spacing.unit * 2,
		}
	}
})(_Index));

export default Index