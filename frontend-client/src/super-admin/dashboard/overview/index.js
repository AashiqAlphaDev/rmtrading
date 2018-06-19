import React from "react"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody, TableCell, TableHead,
	TableRow,
	Typography
} from "@material-ui/core/es/index";
import {HospitalIcon} from "mdi-react"

let Index = withStyles((theme)=>{
	return {
		...style(theme),
		body:{
			overflow:"scroll"
		},
		content:{
			marginTop:theme.spacing.unit*2,
		},
		listCard:{
			flex:1,
			minWidth:200,
			margin:theme.spacing.unit*1
		},
		listTitle:{
			padding:theme.spacing.unit*2
		},
		card:{
			flex:1,
			minWidth:200,
			margin:theme.spacing.unit*1,
			padding:theme.spacing.unit*2
		},
		cardInfo:{
			marginLeft:theme.spacing.unit*2,
		}
	}
})(class extends React.Component {

	componentWillMount(){
		if(this.props.onPageChange){
			this.props.onPageChange("/super-admin/dashboard/");
		}
	}

	render(){
		const {classes} = this.props;
		return <div direction={"column"} flex={1} className={`${classes.body}`}>
			<div className={`container ${classes.content}`}>
				<Layout>
					<Paper className={classes.card} elevation={0}>
						<Layout>
							<HospitalIcon size={50}/>
							<Layout direction={"column"} className={classes.cardInfo}>
								<Typography variant={"title"}>Vaccinations</Typography>
								<Typography>30,000</Typography>
							</Layout>
						</Layout>
					</Paper>
					<Paper className={classes.card} elevation={0}>
						<Layout>
							<HospitalIcon size={50}/>
							<Layout direction={"column"} className={classes.cardInfo}>
								<Typography variant={"title"}>Visits</Typography>
								<Typography>30,000</Typography>
							</Layout>
						</Layout>
					</Paper>
					<Paper className={classes.card} elevation={0}>
						<Layout>
							<HospitalIcon size={50}/>
							<Layout direction={"column"} className={classes.cardInfo}>
								<Typography variant={"title"}>Pets</Typography>
								<Typography>30,000</Typography>
							</Layout>
						</Layout>
					</Paper>
				</Layout>
				<Layout>
					<Paper className={classes.card} elevation={0}>
						<Layout>
							<HospitalIcon size={50}/>
							<Layout direction={"column"} className={classes.cardInfo}>
								<Typography variant={"title"}>Vaccines</Typography>
								<Typography>30,000</Typography>
							</Layout>
						</Layout>
					</Paper>
					<Paper className={classes.card} elevation={0}>
						<Layout>
							<HospitalIcon size={50}/>
							<Layout direction={"column"} className={classes.cardInfo}>
								<Typography variant={"title"}>Diseases</Typography>
								<Typography>30,000</Typography>
							</Layout>
						</Layout>
					</Paper>
					<Paper className={classes.card} elevation={0}>
						<Layout>
							<HospitalIcon size={50}/>
							<Layout direction={"column"} className={classes.cardInfo}>
								<Typography variant={"title"}>Vet Centers</Typography>
								<Typography>30,000</Typography>
							</Layout>
						</Layout>
					</Paper>
				</Layout>
				<Layout>
					<Paper className={classes.listCard} elevation={0}>
						<Layout direction={"column"}>
							<Typography className={classes.listTitle} gutterBottom variant={"title"}>Top States</Typography>
							<Divider />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell numeric>Count</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										[1,2,3,4,5,6].map((i)=>{
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
					<Paper className={classes.listCard} elevation={0}>
						<Layout direction={"column"}>
							<Typography className={classes.listTitle} gutterBottom variant={"title"}>Top Vet Centers</Typography>
							<Divider />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell numeric>Count</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										[1,2,3,4,5,6].map((i)=>{
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
					<Paper className={classes.listCard} elevation={0}>
						<Layout direction={"column"}>
							<Typography className={classes.listTitle} gutterBottom variant={"title"}>Top Vaccines</Typography>
							<Divider />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell numeric>Count</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										[1,2,3,4,5,6].map((i)=>{
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
				<Layout>
					<Paper className={classes.listCard} elevation={0}>
						<Layout direction={"column"}>
							<Typography className={classes.listTitle} gutterBottom variant={"title"}>Recent Vaccinations</Typography>
							<Divider />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell numeric>Count</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										[1,2,3,4,5,6].map((i)=>{
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
});

export default connect(store=>store)(Index);