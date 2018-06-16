import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {Typography,Paper,Table,TableHead,TableRow,TableCell,TableBody} from "@material-ui/core/index";

export default withStyles((theme)=>{
	return {
		...style(theme),
		body:{
			marginLeft:theme.spacing.unit*2,
			display:"flex",
			flexDirection:"column"
		},
		title:{
			background:"#e6ecf0",
			position:"fixed",
			width:"100%",
			padding:theme.spacing.unit*1,
			paddingTop:theme.spacing.unit*3,
			paddingBottom:theme.spacing.unit*2,
		},
		list:{
			marginTop:40+theme.spacing.unit*3,
			marginBottom:theme.spacing.unit*3
		}
	}
})(class extends React.Component{
	render(){
		const {classes} = this.props;
		return <div className={classes.body}>
			<Typography variant="title" gutterBottom className={classes.title}>
				20 Vaccination Centers around 10 countries.
			</Typography>
			<Paper className={classes.list} elevation={0}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Vaccine</TableCell>
							<TableCell>Disease</TableCell>
							<TableCell>Country</TableCell>
							<TableCell>Pet</TableCell>
							<TableCell>Breed</TableCell>
							<TableCell>Gender</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							[1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {
								return <TableRow key={index}>
									<TableCell>Vaccine</TableCell>
									<TableCell>Disease</TableCell>
									<TableCell >Country</TableCell>
									<TableCell >Pet</TableCell>
									<TableCell >Breed</TableCell>
									<TableCell >Gender</TableCell>
									<TableCell >Notes</TableCell>
								</TableRow>
							})
						}
					</TableBody>
				</Table>
			</Paper>
		</div>;
	}
})