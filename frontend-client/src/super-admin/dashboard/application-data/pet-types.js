import React from "react"
import {Paper, Typography, TableHead, TableRow, Table, TableCell, TableBody} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {QUERY_PET_TYPES, REQUEST_DELETE_PET_TYPE} from "../../../stores/entities/pet-types/actions";
import {IconButton} from "@material-ui/core/es/index";
import {DeleteIcon, EditIcon} from "mdi-react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
})(class extends React.PureComponent {
	componentWillMount() {
		this.props.dispatch({type: QUERY_PET_TYPES});
	}

	render() {
		const {classes} = this.props;
		return <AnnotatedSection
			title={"Pet Type list"}
			desc={"These are the list of existing Inventories"}
			backButton={{url: "/super-admin/dashboard"}}
			className={classes.body}>
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.props.petTypes.list.map((item, index) => {
								return <TableRow key={index}>
									<TableCell>
										{item.name}
									</TableCell>
									<TableCell>
										<IconButton>
											<DeleteIcon color="primary" onClick={() => {
												this.props.dispatch({
													type: REQUEST_DELETE_PET_TYPE,
													payload: {pet_type_id: item._id}
												});
											}}/>
										</IconButton>
										<Link
											to={`/super-admin/dashboard/application-data/pet-types/${item._id}/manage`}>
											<IconButton>
												<EditIcon color="primary"/>
											</IconButton>
										</Link>
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

export default connect(store => store)(Index);