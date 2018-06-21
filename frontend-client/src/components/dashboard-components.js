import React from "react"
import {
	Avatar, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow,
	Typography
} from "@material-ui/core/es/index";
import Layout from "./layout";
import {HospitalIcon} from "mdi-react";

const OverViewMetric = ({title, metric, classes}) => (
	<Paper className={classes.card}>
		<Layout>
			<Avatar className={classes.cardIcon}>
				<HospitalIcon className={classes.cardIconSvg}/>
			</Avatar>
			<Layout direction={"column"} className={classes.cardInfo}>
				<Typography color={"textSecondary"}>{title}</Typography>
				<Typography variant={"title"}>{metric}</Typography>
			</Layout>
		</Layout>
	</Paper>
);


const MetricDataCard = class extends React.Component{
	render(){
		const {classes, title, body, MetricCardIcon, data} = this.props;
		return <Paper className={classes.listCard}>
			<Layout direction={"column"}>
				<Typography className={classes.listTitle} gutterBottom variant={"title"}>
					<Layout alignItems={"center"}>
						{
							MetricCardIcon &&
							<MetricCardIcon className={classes.titleIconSvg} />
						}
						{title}
					</Layout>
				</Typography>
				<Divider/>
				{body && body}
				{
					data &&
					<Table>
						<TableHead>
							<TableRow>
								{
									data.columnTitles.map((item, i) => {
										if (typeof item === 'string') {
											return <TableCell key={i}>{item}</TableCell>
										}
										else {
											return <TableCell numeric={item.isNumeric} key={i}>{item.label}</TableCell>
										}
									})
								}

							</TableRow>
						</TableHead>
						<TableBody>
							{
								data.data.map((item, i) => {
									return <TableRow key={i}>
										{item.map((_item, i) => {
											return <TableCell key={i}
											                  numeric={typeof _item !== 'string'}>{_item}</TableCell>
										})}
									</TableRow>
								})
							}
						</TableBody>
					</Table>
				}
			</Layout>
		</Paper>


	}
}
export {OverViewMetric, MetricDataCard}