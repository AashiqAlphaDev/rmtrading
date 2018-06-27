import React from "react"
import {Paper, Typography, TableHead, TableRow, Table, TableCell, TableBody} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux"
import {QUERY_DISEASES, REQUEST_DELETE_DISEASE} from "../../../stores/entities/diseases/actions";
import {IconButton} from "@material-ui/core/es/index";
import {DeleteIcon} from "mdi-react";
import AnnotatedSection from "../../../components/annotated-section";

let Index = withStyles((theme) => {
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
})(class extends React.Component {
	componentWillMount() {
		this.props.dispatch({type: QUERY_DISEASES});
	}

	render() {
		const {classes} = this.props;
		return <AnnotatedSection
			title={"Disease list"}
			desc={"These are the list of existing Diseases"}
			backButton={{url: "/super-admin/dashboard"}}
			className={classes.body}>
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>NAme</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.props.diseases.list.map((item, index) => {
								return <TableRow key={index}>
									<TableCell>
										{item.name}
									</TableCell>
									<TableCell>
										<IconButton>
											<DeleteIcon color="primary" onClick={() => {
												this.props.dispatch({
													type: REQUEST_DELETE_DISEASE,
													payload: {disease_id: item._id}
												});
											}}/>
										</IconButton>
									</TableCell>
								</TableRow>
							})
						}
					</TableBody>
				</Table>
			</Paper>
		</AnnotatedSection>

	}
});
export default connect(store => store)(Index)