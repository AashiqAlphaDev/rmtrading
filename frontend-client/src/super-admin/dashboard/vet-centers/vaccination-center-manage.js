import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import InputContainer from "../../../components/input"
import {connect} from "react-redux";
import style from "../style";
import {
	REQUEST_ADD_ADMIN,
	REQUEST_ADD_QUEUE,
	REQUEST_DELETE_ADMIN, REQUEST_DELETE_QUEUE,
	REQUEST_VET_CENTER_FETCH
} from "../../../stores/vet-centers/actions";
import {
	Button,
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, IconButton,
	List,
	ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, TextField,
	Typography
} from "@material-ui/core/es/index";
import Add from '@material-ui/icons/Add';
import {DeleteIcon} from "mdi-react";
import Layout from "../../../components/layout";

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
		}
	}
})(class extends React.Component {

	state = {
		openAddAdmin: false,
		newAdminEmail: "",
		openAddQueue: false,
		newQueueName: "",
	};

	componentWillMount() {
		this.props.dispatch({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: this.props.centerId}})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.vetCenterDetail.addedAdmin) {
			this.setState({openAddAdmin: false, newAdminEmail: ""});
		}
		if (nextProps.vetCenterDetail.addedQueue) {
			this.setState({openAddQueue: false, newQueueName: ""});
		}
	}

	render() {
		const {classes} = this.props;
		if (this.props.vetCenterDetail._id) {
			return <AnnotatedSection title={this.props.vetCenterDetail.name}
			                         desc={"Please provide the information to register Vaccination Center."}
			                         backButton={{url: "/super-admin/dashboard/vet-centers"}}>
				<div>
					<Paper className={`${classes.paperPage}`}>
						<Layout direction={"column"}>
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Appointment Settings
							</Typography>
							<InputContainer label={"Slot Length in min."}>
								<TextField
									autoFocus
									type="number"
									fullWidth
									onChange={(event) => {
										this.setState({newAdminEmail: event.target.value})
									}}
								/>
							</InputContainer>
							<Layout justifyContent={"flex-end"} className={classes.actions}>
								<Button> Clear </Button>
								<Button variant={"raised"} color={"primary"} type={"submit"}> Save </Button>
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
							payload: {queue_data:{name: this.state.newQueueName}, center_id: this.props.vetCenterDetail._id}
						});
					}}>
						<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To subscribe to this website, please enter your email address here. We will send
								updates occasionally.
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
							<Button onClick={()=>{this.setState({openAddQueue:false})}} color="primary">
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
			</AnnotatedSection>;
		} else {
			return <div></div>
		}
	}

});

export default connect(store => store)(Index);