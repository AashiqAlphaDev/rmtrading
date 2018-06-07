import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import {
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@material-ui/core";
import style from "../style"
import PetRegistrationTmpl from "./pet-registration-tmpl"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <PetRegistrationTmpl>
			<div>
				<Typography variant="title" className={`${classes.title} flex`}>
					Search Results
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
		</PetRegistrationTmpl>
	}
})

export default connect(store => store)(Index)