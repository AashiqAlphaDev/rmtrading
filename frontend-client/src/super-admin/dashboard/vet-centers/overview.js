import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {Typography,Paper,IconButton} from "@material-ui/core/index";
import {connect} from "react-redux";
import {QUERY_VET_CENTERS} from "../../../stores/vet-centers/actions";
import {Table,TableHead,TableRow,TableCell,TableBody} from "@material-ui/core/index";
import {EditIcon, ArrowRightIcon, DeleteIcon} from "mdi-react";

let Index = withStyles((theme)=>{
	return {
		...style(theme),
		body:{
			marginLeft:theme.spacing.unit*2,
			display:"flex",
			flexDirection:"column"
		},
		title:{
			background:"#e6ecf0",
			width:"100%",
			paddingTop:theme.spacing.unit*3,
			paddingBottom:theme.spacing.unit*2,
		},

		segment:{
			marginBottom:theme.spacing.unit*3,
			padding:theme.spacing.unit*1
		}
	}
})(class extends React.Component{
	componentWillMount(){
		this.props.dispatch({type:QUERY_VET_CENTERS});
	}
	render(){
		const {classes} = this.props;
		console.log(this.props);
		return <div className={classes.body}>
			<Typography variant="title" gutterBottom className={classes.title}>
				20 Vaccination Centers around 10 countries.
			</Typography>
			<Paper className={classes.list} elevation={0}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Vaccination Center Name</TableCell>
							<TableCell>Contact Name</TableCell>
							<TableCell>Contact Mobile</TableCell>
							<TableCell>Contact Email</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.props.vetCenters.centers.docs &&
							this.props.vetCenters.centers.docs.map((item, index) => {
								return <TableRow key={index}>

									<TableCell>
										<Typography variant={"body2"}>
											{item.name}
										</Typography>
									</TableCell>
									<TableCell>{item.contact && item.contact.name}</TableCell>
									<TableCell>{item.contact && item.contact.phNo}</TableCell>
									<TableCell>{item.contact && item.contact.email}</TableCell>
									<TableCell>
										<IconButton mini>
											<EditIcon color="primary" />
										</IconButton>
										<IconButton mini>
											<ArrowRightIcon color="primary" />
										</IconButton>
									</TableCell>
								</TableRow>
							})
						}
					</TableBody>
				</Table>
			</Paper>
		</div>;
	}
});

export default connect(store=>store)(Index)