import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core/index";
import {connect} from "react-redux";
import {QUERY_VACCINES, REQUEST_DELETE_VACCINE} from "../../../stores/entities/vaccines/actions";
import {IconButton} from "@material-ui/core/es/index";
import {ArrowRightIcon, DeleteIcon, EditIcon} from "mdi-react";
import {Link} from "react-router-dom";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			marginLeft: theme.spacing.unit * 2,
			display: "flex",
			flexDirection: "column"
		},
		title: {
			background: "#e6ecf0",
			position: "fixed",
			width: "100%",
			padding: theme.spacing.unit * 1,
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 2,
		},
		list: {
			marginTop: 40 + theme.spacing.unit * 3,
			marginBottom: theme.spacing.unit * 3
		}
	}
})(class extends React.Component {


	componentWillMount() {
		let searchParams = new URLSearchParams(this.props.location.search);
		this.props.dispatch({type: QUERY_VACCINES, payload: {query: searchParams.get("q")}})
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.body}>
			<Typography variant="title" gutterBottom className={classes.title}>
				20 Vaccination Centers around 10 countries.
			</Typography>
			<Paper className={classes.list} elevation={0}>
				{
					(this.props.vaccines.list.docs && this.props.vaccines.list.docs.length > 0) &&
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Vaccination Center Name</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.props.vaccines.list.docs.map((item, index) => {
									return <TableRow key={index}>

										<TableCell>
											<Typography variant={"body2"}>
												{item.name}
											</Typography>
										</TableCell>
										<TableCell>
											<IconButton>
												<DeleteIcon color="primary" onClick={() => {
													this.props.dispatch({
														type: REQUEST_DELETE_VACCINE,
														payload: {vaccine_id: item._id}
													});
												}}/>
											</IconButton>
											<Link to={`/super-admin/dashboard/vaccines/${item._id}/`}>
												<IconButton>
													<EditIcon color="primary"/>
												</IconButton>
											</Link>
											<IconButton>
												<ArrowRightIcon color="primary"/>
											</IconButton>
										</TableCell>
									</TableRow>
								})
							}
						</TableBody>
					</Table>
				}
				{
					(this.props.vaccines.list.docs && this.props.vaccines.list.docs.length === 0) &&
					<p>No Results</p>
				}
			</Paper>
		</div>;
	}
});

export default connect(store => store)(Index);