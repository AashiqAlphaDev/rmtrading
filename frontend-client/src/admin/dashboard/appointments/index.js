import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Layout from "../../../components/layout";
import {raiseEvent} from "../../../components/util";
import {appointmentsUiEvents} from "./store/saga";
import {
	Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	Divider,
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	MenuItem, Paper,
	Select,
	Table,
	TableBody, TableCell,
	TableHead, TableRow, TextField,
	Typography, List
} from "@material-ui/core/es/index";
import {AppointmentsIcon, DeleteIcon, EditIcon} from "../../../components/icons";
import {vetCenterCommands} from "../../../stores/entities/vet-centers/sagas";
import InputContainer from "../../../components/input"
import _ from "underscore"

class _Index extends React.Component {
	componentWillMount = raiseEvent(appointmentsUiEvents.APPOINTMENTS_MENU_ITEM_WILL_LOAD, this);
	state = {
		openAddQueue: false,
		openAddSlot: false,
		newQueueName: "",
		newSlotFrom: 0,
		newSlotTo: 0,
		currentQueue: null
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.currentQueue){

		}
	}

	render() {
		const {classes} = this.props;
		if (this.props.entities.vaccination_center.centers._id) {
			return <Layout direction={"column"} flex={1} className={classes.body} vaccinationCenter={this.props.entities.vaccination_center.centers}>
				<Layout className={` ${classes.flex}`} direction={"column"}>
					<Layout alignItems={"flex-start"}>
						<Paper className={`${classes.paper} ${classes.sidePanel} ${classes.paperPage} flex`}
						       elevation={0}>
							<Layout direction={"column"} flex={1}>
								<Layout className={classes.title}>
									<Typography variant="title" gutterBottom className={`flex`}>
										Appointment Queues
									</Typography>
									<Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
										this.setState({openAddQueue: true});
									}}>
										Add Queue
									</Button>
								</Layout>
								{
									(this.props.entities.vaccination_center.centers.queues.length !== 0) &&
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Name</TableCell>
												<TableCell></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{
												this.props.entities.vaccination_center.centers.queues.length > 0 &&
												this.props.entities.vaccination_center.centers.queues.map((item) => {
													return <TableRow key={item._id}>
														<TableCell>
															{item.name}
														</TableCell>
														<TableCell numeric>
															<IconButton onClick={() => {
																this.setState({currentQueue: item, openAddSlot: true});

															}}>
																<EditIcon/>
															</IconButton>
															<IconButton onClick={() => {
																this.props.dispatch({
																	type: vetCenterCommands.DELETE_QUEUE,
																	payload: {
																		center_id: this.props.entities.vaccination_center.centers._id,
																		queue_id: item._id
																	}
																})
															}}>
																<DeleteIcon/>
															</IconButton>
														</TableCell>
													</TableRow>
												})
											}
										</TableBody>
									</Table>
								}
							</Layout>
						</Paper>
						<Paper className={`${classes.paperPage} ${classes.paper} ${classes.sidePanel}`} elevation={0}>
							<Layout direction={"column"} alignItems={"center"} flex={1}>
								<AppointmentsIcon size={44}/>
								<Typography variant="title" gutterBottom align={"center"}>
									Number of
								</Typography>
								<Typography variant="title" gutterBottom className={classes.sidePanelTitle}
								            align={"center"}>
									appointments per hour
								</Typography>
								<Layout>
									<Select className={`flex`}
									        value={this.props.entities.vaccination_center.centers.appointments_per_hour}
									        style={{width: 230, paddingBottom: 10}}
									        onChange={(e) => {

										        this.props.dispatch({
											        type: vetCenterCommands.UPDATE_SLOT_INTERVAL,
											        payload: {
												        slot_interval: e.target.value,
												        center_id: this.props.entities.vaccination_center.centers._id
											        }
										        });

									        }}>
										{
											[1, 2, 3, 4].map((item) => {
												return <MenuItem key={item} value={item}>
													{item}
												</MenuItem>
											})
										}
									</Select>
								</Layout>
							</Layout>
						</Paper>
					</Layout>
					<Dialog
						open={this.state.openAddQueue}
						onClose={() => {
							this.setState({openAddQueue: false})
						}}
						aria-labelledby="form-dialog-title"
					>
						<form onSubmit={(event) => {
							event.preventDefault();
							this.props.dispatch({
								type: vetCenterCommands.ADD_QUEUE,
								payload: {
									queue_data: {name: this.state.newQueueName},
									center_id: this.props.entities.vaccination_center.centers._id
								}
							});
							this.setState({openAddQueue: false})
						}}>
							<DialogTitle id="form-dialog-title">Add a Queue</DialogTitle>
							<DialogContent>
								<DialogContentText gutterBottom>
									Add a queue to vet-center to manage time slots of the queue.
								</DialogContentText>
								<TextField
									autoFocus
									placeholder={"Queue Name"}
									fullWidth
									onChange={(event) => {
										this.setState({newQueueName: event.target.value})
									}}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => {
									this.setState({openAddQueue: false})
								}} color="primary">
									Cancel
								</Button>
								<Button type="submit" color="primary">
									Add
								</Button>
							</DialogActions>
						</form>
					</Dialog>
					{
						this.state.currentQueue &&
						<Dialog open={this.state.openAddSlot} onClose={() => {this.setState({openAddSlot: false});}}>
							<form className={classes.dialog} onSubmit={(event) => {
								event.preventDefault();
								this.props.dispatch({
									type: vetCenterCommands.ADD_SLOT,
									payload: {
										slot_data: {from: this.state.newSlotFrom, to: this.state.newSlotTo},
										center_id: this.props.entities.vaccination_center.centers._id,
										queue_id: this.state.currentQueue._id
									}
								});
							}}>
								<DialogTitle>Manage Slots</DialogTitle>
								<DialogContent>
									<Divider/>
									<Layout direction={`column`}>
										<List>
											{
												this.state.currentQueue.time_slots.map((item) => {
													var fromLabel = null;
													var toLabel = null;
													(() => {
														var hour = (item.from) / this.props.entities.vaccination_center.centers.appointments_per_hour;
														var min = (60 / this.props.entities.vaccination_center.centers.appointments_per_hour) * (item.from % this.props.entities.vaccination_center.centers.appointments_per_hour);
														fromLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
													})();
													(() => {
														var hour = (item.to) / this.props.entities.vaccination_center.centers.appointments_per_hour;
														var min = (60 / this.props.entities.vaccination_center.centers.appointments_per_hour) * (item.to % this.props.entities.vaccination_center.centers.appointments_per_hour);
														toLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
													})();
													return <ListItem key={item._id}>
														<ListItemText>
															{fromLabel} - {toLabel}
														</ListItemText>
														<ListItemSecondaryAction>
															<IconButton onClick={() => {
																this.props.dispatch({
																	type: vetCenterCommands.DELETE_SLOT,
																	payload: {
																		center_id: this.props.entities.vaccination_center.centers._id,
																		queue_id: this.state.currentQueue._id,
																		slot_id: item._id
																	}
																})
															}}>
																<DeleteIcon />
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
												})
											}
											{
												this.state.currentQueue.time_slots.length === 0 &&
												<ListItem>No Slots Added</ListItem>
											}
										</List>
									</Layout>
									<Divider/>
									<Layout className={classes.paper} alignItems={`flex-end`}>
										<InputContainer label={"From"}>
											<Select value={parseInt(this.state.newSlotFrom)} onChange={e => {
												this.setState({newSlotFrom: e.target.value})
											}}>
												{
													_.range(24 * this.props.entities.vaccination_center.centers.appointments_per_hour).map((i) => {
														var hour = (i) / this.props.entities.vaccination_center.centers.appointments_per_hour;
														var min = (60 / this.props.entities.vaccination_center.centers.appointments_per_hour) * (i % this.props.entities.vaccination_center.centers.appointments_per_hour);
														return <MenuItem key={i}
														                 value={i}>{("0" + Math.floor(hour)).slice(-2)}:{("0" + min).slice(-2)}</MenuItem>
													})
												}
											</Select>
										</InputContainer>
										<InputContainer label={"To"}>
											<Select value={parseInt(this.state.newSlotTo)} onChange={e => {
												this.setState({newSlotTo: e.target.value})
											}}>
												{
													_.range(24 * this.props.entities.vaccination_center.centers.appointments_per_hour).map((i) => {
														var hour = (i) / this.props.entities.vaccination_center.centers.appointments_per_hour;
														var min = (60 / this.props.entities.vaccination_center.centers.appointments_per_hour) * (i % this.props.entities.vaccination_center.centers.appointments_per_hour);
														return <MenuItem key={i}
														                 value={i}>{("0" + Math.floor(hour)).slice(-2)}:{("0" + min).slice(-2)}</MenuItem>
													})
												}
											</Select>
										</InputContainer>
										<Button type="submit" color="primary">
											Add
										</Button>
									</Layout>
								</DialogContent>
							</form>
						</Dialog>
					}
				</Layout>
			</Layout>
		}
		else return <div></div>
	}
}

const Index = connect(store => store)(withStyles((theme) => {
	return {
		actions: {
			marginTop: theme.spacing.unit * 4
		},
		paper: {
			marginLeft: theme.spacing.unit * 1,
			marginRight: theme.spacing.unit * 1,
			display: "flex"
		},
		section: {
			flex: 1
		},
		dialog: {
			minWidth: 500
		},
		body: {
			marginTop: theme.spacing.unit * 2
		},
		title: {
			padding: theme.spacing.unit * 2
		},
		icon: {
			border: `2px solid ${theme.palette.grey['200']}`,
			background: "none",
			padding: 10,
			margin: theme.spacing.unit * 2
		},
		sidePanel: {
			padding: theme.spacing.unit * 2,
			alignItems: "center",
			justifyContent: "center",
			width: 350
		},
		sidePanelTitle: {
			paddingBottom: 10
		}
	}
})(_Index));

export default Index

























