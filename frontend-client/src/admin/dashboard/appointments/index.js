import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import InputContainer from "../../../components/input"
import {connect} from "react-redux";
import style from "../style";
import _ from "underscore"
import {
	REQUEST_ADD_ADMIN,
	REQUEST_ADD_QUEUE, REQUEST_ADD_SLOT,
	REQUEST_DELETE_ADMIN, REQUEST_DELETE_QUEUE, REQUEST_DELETE_SLOT, REQUEST_UPDATE_SLOT_INTERVAL,
	REQUEST_VET_CENTER_FETCH
} from "../../../stores/vet-centers/actions";
import {
	Button,
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, Divider, IconButton,
	List,
	ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField,
	Typography
} from "@material-ui/core/es/index";
import Add from '@material-ui/icons/Add';
import {DeleteIcon} from "mdi-react";
import Layout from "../../../components/layout";
import {Delete} from "@material-ui/icons/es/index";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4
		},
		paper: {
			marginTop: theme.spacing.unit * 1,
			display: "flex"
		},
		section: {
			flex: 1
		},
		section2: {
			flex: 3,
			borderLeft: "1px solid #cccccc6b"
		},
		dialog: {
			minWidth: 500
		}
	}
})(class extends React.Component {


	state = {
		openAddAdmin: false,
		newAdminEmail: "",
		openAddQueue: false,
		openAddSlot: false,
		newQueueName: "",
		newSlotFrom: 0,
		newSlotTo: 0,
		currentQueue: null
	};

	componentWillMount() {
		this.props.dispatch({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: "self"}});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.vetCenterDetail.addedAdmin) {
			this.setState({openAddAdmin: false, newAdminEmail: ""});
		}
		if (nextProps.vetCenterDetail.addedQueue) {
			this.setState({openAddQueue: false, newQueueName: ""});
		}
		if (this.state.currentQueue) {
			this.setState({
				currentQueue: _.find(this.props.vetCenterDetail.queues, (item) => {
					return item._id === this.state.currentQueue._id
				})
			});
		}
	}

	render() {
		const {classes} = this.props;
		if (this.props.vetCenterDetail._id) {
			return <AnnotatedSection title={this.props.vetCenterDetail.name}
			                         desc={"Please provide the information to register Vaccination Center."}
			                         backButton={{url: "/super-admin/dashboard/pets"}}>
				<div>
					<Paper className={`${classes.paperPage}`}>
						<Layout alignItems="center">
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Number of appointments per hour
							</Typography>
							<Layout>
								<Select value={this.props.vetCenterDetail.appointments_per_hour} onChange={(e) => {
									this.props.dispatch({
										type: REQUEST_UPDATE_SLOT_INTERVAL,
										payload: {
											slot_interval: e.target.value,
											center_id: this.props.vetCenterDetail._id
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
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={classes.section}>
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Appointment Queues
							</Typography>
							<Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
								this.setState({openAddQueue: true});
							}}>
								<Add/>
								Add Queue
							</Button>
						</div>
						<List className={classes.section2}>
							{
								this.props.vetCenterDetail.queues.length > 0 &&
								this.props.vetCenterDetail.queues.map((item) => {
									return <ListItem key={item._id}>
										<ListItemText>
											{item.name}
										</ListItemText>
										<ListItemSecondaryAction>
											<Button onClick={() => {
												this.setState({currentQueue: item, openAddSlot: true});

											}}>
												Manage Slots
											</Button>
											<IconButton onClick={() => {
												this.props.dispatch({
													type: REQUEST_DELETE_QUEUE,
													payload: {
														center_id: this.props.vetCenterDetail._id,
														queue_id: item._id
													}
												})
											}}>
												<DeleteIcon/>
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								})
							}
							{
								(this.props.vetCenterDetail.queues.length === 0) &&
								<ListItem>No Queues Created</ListItem>
							}
						</List>
					</Paper>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={classes.section}>
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Manage Admins
							</Typography>
							<Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
								this.setState({openAddAdmin: true});
							}}>
								<Add/>
								Add Admin
							</Button>
						</div>
						{
							this.props.vetCenterDetail.admins &&
							<List className={classes.section2}>
								{
									this.props.vetCenterDetail.admins.length > 0 &&
									this.props.vetCenterDetail.admins.map((item) => {
										return <ListItem key={item._id}>
											<ListItemText>
												{item.email}
											</ListItemText>
											<ListItemSecondaryAction>
												<IconButton onClick={() => {
													this.props.dispatch({
														type: REQUEST_DELETE_ADMIN,
														payload: {
															center_id: this.props.vetCenterDetail._id,
															admin_id: item._id
														}
													})
												}}>
													<DeleteIcon/>
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									})
								}
								{
									(this.props.vetCenterDetail.admins.length === 0) &&
									<ListItem>No Admins Created</ListItem>
								}
							</List>
						}
					</Paper>
				</div>

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
							type: REQUEST_ADD_QUEUE,
							payload: {
								queue_data: {name: this.state.newQueueName},
								center_id: this.props.vetCenterDetail._id
							}
						});
					}}>
						<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
						<DialogContent>

							<DialogContentText>
								<Typography gutterBottom>
									To subscribe to this website, please enter your email address here. We will send
									updates occasionally.
								</Typography>
							</DialogContentText>
							<InputContainer label={"Queue Name"}>
								<TextField
									autoFocus
									type="Queue Name"
									fullWidth
									onChange={(event) => {
										this.setState({newQueueName: event.target.value})
									}}
								/>
							</InputContainer>
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
				<Dialog
					open={this.state.openAddAdmin}
					onClose={() => {
						this.setState({openAddAdmin: false})
					}}
					aria-labelledby="form-dialog-title"
				>
					<form onSubmit={(event) => {
						event.preventDefault();
						this.props.dispatch({
							type: REQUEST_ADD_ADMIN,
							payload: {email: this.state.newAdminEmail, center_id: this.props.vetCenterDetail._id}
						});
					}}>
						<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To subscribe to this website, please enter your email address here. We will send
								updates occasionally.
							</DialogContentText>
							<InputContainer label={"Email Address"}>
								<TextField
									autoFocus
									type="email"
									fullWidth
									onChange={(event) => {
										this.setState({newAdminEmail: event.target.value})
									}}
								/>
							</InputContainer>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
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
					<Dialog
						open={this.state.openAddSlot}
						onClose={() => {
							this.setState({openAddSlot: false})
						}}
					>
						<form className={classes.dialog} onSubmit={(event) => {
							event.preventDefault();
							this.props.dispatch({
								type: REQUEST_ADD_SLOT,
								payload: {
									slot_data: {from: this.state.newSlotFrom, to: this.state.newSlotTo},
									center_id: this.props.vetCenterDetail._id,
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
													var hour = (item.from) / this.props.vetCenterDetail.appointments_per_hour;
													var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (item.from % this.props.vetCenterDetail.appointments_per_hour);
													fromLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
												})();
												(() => {
													var hour = (item.to) / this.props.vetCenterDetail.appointments_per_hour;
													var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (item.to % this.props.vetCenterDetail.appointments_per_hour);
													toLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
												})();
												return <ListItem key={item._id}>
													<ListItemText>
														{fromLabel} - {toLabel}
													</ListItemText>
													<ListItemSecondaryAction>
														<IconButton onClick={() => {
															this.props.dispatch({
																type: REQUEST_DELETE_SLOT,
																payload: {
																	center_id: this.props.vetCenterDetail._id,
																	queue_id: this.state.currentQueue._id,
																	slot_id: item._id
																}
															})
														}}>
															<Delete/>
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
												_.range(24 * this.props.vetCenterDetail.appointments_per_hour).map((i) => {
													var hour = (i) / this.props.vetCenterDetail.appointments_per_hour;
													var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (i % this.props.vetCenterDetail.appointments_per_hour);
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
												_.range(24 * this.props.vetCenterDetail.appointments_per_hour).map((i) => {
													var hour = (i) / this.props.vetCenterDetail.appointments_per_hour;
													var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (i % this.props.vetCenterDetail.appointments_per_hour);
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
			</AnnotatedSection>;
		} else {
			return <div></div>
		}
	}

});

export default connect(store => store)(Index);