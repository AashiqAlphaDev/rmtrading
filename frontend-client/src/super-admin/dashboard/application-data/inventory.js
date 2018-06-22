import React from "react"
import {Paper, Typography, TableHead, TableRow, Table, TableCell, TableBody} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import AnnotatedSection from "../../../components/annotated-section";

export default withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit * 4
		},
		body: {
			marginTop: theme.spacing.unit * 2
		}
	}
})(class extends React.PureComponent {
	render() {
		const {classes} = this.props;
		return <AnnotatedSection
			title={"Inventory list"}
			desc={"These are the list of existing Inventories"}
			backButton={{url: "/super-admin/dashboard"}}
			className={classes.body}>
			<Typography variant="title" className={`${classes.title} flex`}>
				Inventory list
			</Typography>

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
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {
								return <TableRow key={index}>
									<TableCell>Vaccine</TableCell>
									<TableCell>Disease</TableCell>
									<TableCell>Country</TableCell>
									<TableCell>Pet</TableCell>
									<TableCell>Breed</TableCell>
									<TableCell>Gender</TableCell>
									<TableCell>Notes</TableCell>
								</TableRow>
							})
						}
					</TableBody>
				</Table>
			</Paper>

		</AnnotatedSection>
	}
})