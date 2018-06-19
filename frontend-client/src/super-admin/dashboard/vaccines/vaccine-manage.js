import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import style from "../style";
import {REQUEST_VACCINE_FETCH} from "../../../stores/vaccines/actions";
import {Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core/es/index";
import {REQUEST_DELETE_QUEUE} from "../../../stores/vet-centers/actions";
import {DeleteIcon} from "mdi-react";

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


	state = {};

	componentWillMount() {
		// console.log(this.props);
		this.props.dispatch({type: REQUEST_VACCINE_FETCH, payload: {vaccine_id: this.props.vaccineId}})
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		const {classes} = this.props;
		if (this.props.vaccineDetail._id) {
			return <AnnotatedSection title={this.props.vaccineDetail.name}
			                         desc={"Please provide the information to register Vaccination Center."}
			                         backButton={{url: "/super-admin/dashboard/vaccines"}}>
				<div>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={`${classes.section}`}>
							Child Dosages
						</div>
						<div className={`${classes.section2}`}>
							{
								this.props.vaccineDetail.child_vaccine_schedules.length > 0 &&
								this.props.vaccineDetail.child_vaccine_schedules.map((item) => {
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
														vaccine_id: this.props.vaccineDetail._id,
														schedules_id: item._id
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
								(this.props.vaccineDetail.child_vaccine_schedules.length === 0) &&
								<ListItem>No Queues Created</ListItem>
							}
						</div>
					</Paper>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={`${classes.section}`}>
							Adult Dosages
						</div>
						<div className={`${classes.section2}`}>
							{
								this.props.vaccineDetail.child_vaccine_schedules.length > 0 &&
								this.props.vaccineDetail.child_vaccine_schedules.map((item) => {
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
														vaccine_id: this.props.vaccineDetail._id,
														schedules_id: item._id
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
								(this.props.vaccineDetail.child_vaccine_schedules.length === 0) &&
								<ListItem>No Queues Created</ListItem>
							}
						</div>
					</Paper>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={`${classes.section}`}>
							Booster Dosages
						</div>
						<div className={`${classes.section2}`}>
							{
								this.props.vaccineDetail.child_vaccine_schedules.length > 0 &&
								this.props.vaccineDetail.child_vaccine_schedules.map((item) => {
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
														vaccine_id: this.props.vaccineDetail._id,
														schedules_id: item._id
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
								(this.props.vaccineDetail.child_vaccine_schedules.length === 0) &&
								<ListItem>No Queues Created</ListItem>
							}
						</div>
					</Paper>
				</div>
			</AnnotatedSection>;
		} else {
			return <div>sample</div>;
		}
	}

});

export default connect(store => store)(Index);