import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {REQUEST_PET_FETCH} from "../../../stores/pets/actions";
import {QUERY_VACCINATIONS} from "../../../stores/vaccinations/actions";
import moment from "moment"
import InputContainer from "../../../components/input"
import {
	Button, Dialog,
	DialogActions,
	DialogContent, DialogContentText,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow, TextField,
	Typography
} from "@material-ui/core/es/index";
import {InformationIcon, DeleteIcon, EditIcon} from "mdi-react";
import {Link, Redirect} from "react-router-dom";
import {REQUEST_ADD_QUEUE} from "../../../stores/vet-centers/actions";
import {REQUEST_ADD_VISIT} from "../../../stores/pet-types/actions";
import {CLEAR_VISIT, QUERY_VISITS} from "../../../stores/visits/actions";


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
			width: "100%",
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 2,
		},

		segment: {
			marginBottom: theme.spacing.unit * 3,
			padding: theme.spacing.unit * 1
		}
	}
})(class extends React.Component {
	state = {
		openAddBiometrics: false,
		data: {
			height: 0,
			weight: 0
		}
	}

	componentWillMount() {
		this.props.dispatch({type: REQUEST_PET_FETCH, payload: {pet_id: this.props.match.params.pet_id}});
		this.props.dispatch({type: QUERY_VISITS, payload: {pet_id: this.props.match.params.pet_id}});
		this.props.dispatch({type: CLEAR_VISIT});
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.body}>
			<Paper elevation={0}>
				{
					this.props.visitDetail._id &&
					<Redirect to={`/admin/dashboard/pets/${this.props.match.params.pet_id}/visits/${this.props.visitDetail._id}`} />
				}
				<Button onClick={()=>{
					this.props.dispatch({type:REQUEST_ADD_VISIT, payload:{pet:this.props.match.params.pet_id}});
				}}>Add Visit</Button>
				{
					this.props.visits.list &&
					 <Table>
					<TableHead>
						<TableRow>
						<TableCell>Sl No</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Pet Name</TableCell>
						<TableCell>Vet centre</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{
						this.props.visits.list.map((item, index) => {
							return <TableRow key={index}>
								<TableCell>
									<Typography variant={"body2"}>
										{index +1}
									</Typography>
								</TableCell>
								<TableCell>{item.date}</TableCell>
								<TableCell>{item.pet_name}</TableCell>
								<TableCell>{item.vet_centre}</TableCell>
							</TableRow>
						})
					}
					</TableBody>
					</Table>
				}
			</Paper>
		</div>;
	}
});

export default connect(store => store)(Index)