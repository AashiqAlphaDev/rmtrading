import React from "react"
import {Paper,Typography,TableHead,TableRow,Table,TableCell,TableBody} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";

export default withStyles((theme)=>{
	return {
		...style(theme),
		actions:{
			marginTop:theme.spacing.unit*4,
			marginBottom:theme.spacing.unit*4
		}
	}
})(class extends React.PureComponent{
	render(){
		const {classes} = this.props;
		return <div>
			<div>
				<Typography variant="title" className={`${classes.title} flex`}>
					Pet Type list
				</Typography>
			</div>
			<Paper>
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
		</div>

	}
})