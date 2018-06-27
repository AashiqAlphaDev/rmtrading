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
} from "../../../stores/entities/vet-centers/actions";
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
		},
		body: {
			marginTop: theme.spacing.unit * 2
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
		this.props.dispatch({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: this.props.match.params.center_id}})
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
			                         backButton={{url: "/super-admin/dashboard/vet-centers"}}
			                         className={classes.body}
			>
				<div>
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
			</AnnotatedSection>;
		} else {
			return <div></div>
		}
	}

});

export default connect(store => store)(Index);