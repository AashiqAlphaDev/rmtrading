import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {REQUEST_PET_FETCH} from "../../../stores/pets/actions";
import moment from "moment"
import {
	Button,
	Dialog,
	DialogContent,
	Divider, IconButton,
	Paper,
	Slide,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography
} from "@material-ui/core/es/index";
import {InformationIcon} from "mdi-react";
import {Redirect} from "react-router-dom";
import {REQUEST_ADD_VISIT} from "../../../stores/pet-types/actions";
import {CLEAR_VISIT, QUERY_VISITS} from "../../../stores/visits/actions";
import Layout from "../../../components/layout";
import QrReader from 'react-qr-reader';
import {REQUEST_UPDATE_TOKEN} from "../../../stores/tokens/actions";
import {REQUEST_DELETE_VET_CENTER} from "../../../stores/vet-centers/actions";


function Transition(props) {
	return <Slide direction="up" {...props} />;
}


let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			marginTop: theme.spacing.unit * 2
		},
		paper: {
			minHeight: 200,
			flexDirection: "column",
			display: "flex"
		},
		rightSectionPaper: {
			flex: 1,
			marginLeft: theme.spacing.unit * 2,
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		title: {
			width: "100%",
			paddingTop: theme.spacing.unit * 2,
			paddingBottom: theme.spacing.unit * 2,
		},

		segment: {
			marginBottom: theme.spacing.unit * 3,
			padding: theme.spacing.unit * 1
		},
		subhead: {
			paddingTop: theme.spacing.unit * 1,
			paddingBottom: theme.spacing.unit * 1,
			paddingLeft: theme.spacing.unit * 4
		},
		buttonLayout: {
			marginTop: theme.spacing.unit * 3
		}


	}
})(class extends React.Component {
	state = {
		openAddBiometrics: false,
		data: {
			height: 0,
			weight: 0
		},
		showScanner: false
	}
	dateFromObjectId = function (objectId) {
		return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
	};

	componentWillMount() {
		this.props.dispatch({type: REQUEST_PET_FETCH, payload: {pet_id: this.props.match.params.pet_id}});
		this.props.dispatch({type: QUERY_VISITS, payload: {pet_id: this.props.match.params.pet_id}});
		this.props.dispatch({type: CLEAR_VISIT});
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.body}>

			{
				this.props.visitDetail._id &&
				<Redirect
					to={`/admin/dashboard/pets/${this.props.match.params.pet_id}/visits/${this.props.visitDetail._id}`}/>
			}
			{

				this.props.petDetail._id &&
				<Layout>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<Layout flex={1}>
							<Layout direction="column">
								<Typography variant={"title"}>
									{this.props.petDetail.name}
								</Typography>
								<Typography variant={"subheading"}>
									({this.props.petDetail.data.pet_type} - {this.props.petDetail.data.breed}) owned
									by {this.props.petDetail.data.owner_name}
								</Typography>
								<Typography variant={"caption"}>
									{moment(this.props.petDetail.date_of_birth).format('MMMM Do YYYY')} (2 years)
								</Typography>
								<Layout direction="column" flex={1} justifyContent={"flex-end"}>
									<Button size={"small"} onClick={() => {
										this.setState({showScanner: true})
									}} variant={"raised"} color={"primary"}>Assign Token</Button>
								</Layout>
							</Layout>
						</Layout>
					</Paper>
					<Paper className={`${classes.paperPage}  ${classes.rightSectionPaper}`}>

						{
							this.props.visits.list.length === 0 &&
							<Layout direction={"column"} flex={1}>
								<Typography variant={"subheading"} align={"center"}>
									No Records Found
								</Typography>
								{
									this.props.visitDetail._id &&
									<Redirect
										to={`/admin/dashboard/pets/${this.props.match.params.pet_id}/visits/${this.props.visitDetail._id}`}/>
								}
								<Layout direction={"column"} alignItems={"center"}>
									<Button variant={"raised"} color={"primary"} style={{"margin-top": 10}}
									        size={"small"}
									        onClick={() => {
										        this.props.dispatch({
											        type: REQUEST_ADD_VISIT,
											        payload: {pet: this.props.match.params.pet_id}
										        });
									        }}>Add Visit</Button>
								</Layout>
							</Layout>
						}

						{
							this.props.visits.list.length > 0 &&
							<Layout direction="column" flex={1}>

								<Layout alignItems={"center"}>
								<div style={{"flex":1}}>
										<Typography variant={"title"} className={classes.title} >
											Visits
										</Typography>
								</div>

										<Button  onClick={() => {
											this.props.dispatch({
												type: REQUEST_ADD_VISIT,
												payload: {pet: this.props.match.params.pet_id}
											});
										}}>Add Visit</Button>

								</Layout>
								<Divider/>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>#</TableCell>
											<TableCell>Date of visit</TableCell>
											<TableCell>Vaccination Center</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											this.props.visits.list.map((item, index) => {
												return <TableRow key={index}>
													<TableCell>{index + 1}</TableCell>
													<TableCell>{moment(this.dateFromObjectId(item._id)).format("MMMM Do YYYY")}</TableCell>
													<TableCell>{item.data.vet_center}</TableCell>
													<TableCell>
														<IconButton><InformationIcon/>
														</IconButton>

													</TableCell>
												</TableRow>
											})
										}
									</TableBody>
								</Table>
							</Layout>
						}
					</Paper>


				</Layout>
			}


			<Dialog
				TransitionComponent={Transition}
				open={this.state.showScanner}
				onClose={() => {
					this.setState({showScanner: false})
				}}
			>
				<DialogContent>
					<QrReader
						delay={this.state.delay}
						onError={(err) => {
							console.log(err)
						}}
						onScan={(result) => {
							if (result) {
								this.props.dispatch({
									type: REQUEST_UPDATE_TOKEN,
									payload: {token_id: result, data: {pet: this.props.match.params.pet_id}}
								});
								this.setState({showScanner: false});
							}
						}}
						style={{width: 400, height: 400}}
					/>
				</DialogContent>
			</Dialog>
		</div>;
	}
});

export default connect(store => store)(Index)