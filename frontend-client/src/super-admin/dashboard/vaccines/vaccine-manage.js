import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import style from "../style";
import {REQUEST_ADD_DOSAGE, REQUEST_DELETE_DOSAGE, REQUEST_VACCINE_FETCH} from "../../../stores/vaccines/actions";
import {
	Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
	ListItem,
	List,
	ListItemSecondaryAction,
	ListItemText, Slide, TextField, Typography, Tabs, Tab
} from "@material-ui/core/es/index";
import {DeleteIcon} from "mdi-react";
import {Add} from "@material-ui/icons/es/index";
import Layout from "../../../components/layout";
import InputContainer from "../../../components/input";

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

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
		openAddDosage:false,
		newDosageNotifyPeriod:0,
		newDosageDuePeriod:0,
		newDosageInterval:0,
		newDosageIntervalStart:0,
		newDosageIntervalEnd:0,
		newDosageType:null,
		newDosageRecurringType:false
	};

	componentWillMount() {
		this.props.dispatch({type: REQUEST_VACCINE_FETCH, payload: {vaccine_id: this.props.vaccineId}})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.vaccineDetail.addedDosage) {
			this.setState({openAddDosage:false});
		}
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
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Child Dosages
							</Typography>
							<Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
								this.setState({openAddDosage: true, newDosageType:"child"});
							}}>
								<Add/>
								Add Dosage
							</Button>
						</div>
						<div className={`${classes.section2}`}>
							<List>
							{
								this.props.vaccineDetail.child_vaccine_schedules.length > 0 &&
								this.props.vaccineDetail.child_vaccine_schedules.map((item,i) => {
									return <ListItem key={item._id}>
										<ListItemText>
											{`Dose ${i+1}`}
										</ListItemText>
										<ListItemSecondaryAction>
											<IconButton onClick={() => {
												this.props.dispatch({
													type: REQUEST_DELETE_DOSAGE,
													payload: {
														dosageType:"child",
														vaccine_id: this.props.vaccineDetail._id,
														schedule_id: item._id
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
								<ListItem>No Schedules Created</ListItem>
							}
							</List>
						</div>
					</Paper>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={`${classes.section}`}>
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Adult Dosages
							</Typography>
							<Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
								this.setState({openAddDosage: true, newDosageType:"adult"});
							}}>
								<Add/>
								Add Dosage
							</Button>
						</div>
						<div className={`${classes.section2}`}>
							<List>
							{
								this.props.vaccineDetail.adult_vaccine_schedules.length > 0 &&
								this.props.vaccineDetail.adult_vaccine_schedules.map((item,i) => {
									return <ListItem key={item._id}>
										<ListItemText>
											{`Dose ${i+1}`}
										</ListItemText>
										<ListItemSecondaryAction>
											<IconButton onClick={() => {
												this.props.dispatch({
													type: REQUEST_DELETE_DOSAGE,
													payload: {
														dosageType:"adult",
														vaccine_id: this.props.vaccineDetail._id,
														schedule_id: item._id
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
								(this.props.vaccineDetail.adult_vaccine_schedules.length === 0) &&
								<ListItem>No Schedules Created</ListItem>
							}
							</List>
						</div>
					</Paper>
					<Paper className={`${classes.paperPage} ${classes.paper}`}>
						<div className={`${classes.section}`}>
							<Typography variant="subheading" gutterBottom className={`flex`}>
								Booster Dosages
							</Typography>
							<Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
								this.setState({openAddDosage: true, newDosageType:"booster"});
							}}>
								<Add/>
								Add Dosage
							</Button>
						</div>
						<div className={`${classes.section2}`}>
							<List>
							{
								this.props.vaccineDetail.booster_vaccine_schedules.length > 0 &&
								this.props.vaccineDetail.booster_vaccine_schedules.map((item,i) => {
									return <ListItem key={item._id}>
										<ListItemText>
											{`Dose ${i+1}`}
										</ListItemText>
										<ListItemSecondaryAction>
											<IconButton onClick={() => {
												this.props.dispatch({
													type: REQUEST_DELETE_DOSAGE,
													payload: {
														dosageType:"booster",
														vaccine_id: this.props.vaccineDetail._id,
														schedule_id: item._id
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
								(this.props.vaccineDetail.booster_vaccine_schedules.length === 0) &&
								<ListItem>No Schedules Created</ListItem>
							}
							</List>
						</div>
					</Paper>
				</div>
				<Dialog
					TransitionComponent={Transition}
					open={this.state.openAddDosage}
					onClose={() => {
						this.setState({openAddDosage: false})
					}}
				>
					<form className={classes.dialog} onSubmit={(event) => {
						event.preventDefault();
						let scheduleData = {
							catch_up_period:{
								notify_period:this.state.newDosageNotifyPeriod,
								due_period:this.state.newDosageDuePeriod
							}
						};
						if(this.state.newDosageRecurringType){
							scheduleData.interval = this.state.newDosageInterval;
						} else {
							scheduleData.period = {
								start:this.state.newDosageIntervalStart,
								end:this.state.newDosageIntervalEnd
							};
						}
						this.props.dispatch({
							type: REQUEST_ADD_DOSAGE,
							payload: {
								vaccine_id:this.props.vaccineDetail._id,
								dosageType:this.state.newDosageType,
								schedule_data: scheduleData
							}
						});
					}}>
						<DialogTitle>Add Dosage</DialogTitle>
						<DialogContent>
							<Layout direction={"column"} className={classes.paper}>
								<Layout>
									<InputContainer label={"Notify Period (in weeks)" }  >
										<TextField placeholder={"Notify Period"} type={"number"}  onChange={(event) => {
											this.setState({newDosageNotifyPeriod: event.target.value})
										}}/>
									</InputContainer>
									<InputContainer label={"Due Period (in weeks)"} >
										<TextField placeholder={"Due Period"} type={"number"}  onChange={(event) => {
											this.setState({newDosageDuePeriod: event.target.value})
										}}/>
									</InputContainer>
								</Layout>
								<InputContainer>
									<Tabs fullWidth value={this.state.newDosageRecurringType?1:0} onChange={(e,v)=>{
										this.setState({newDosageRecurringType:v==1});
									}}>
										<Tab  label={"One Time"}></Tab>
										<Tab label={"Recurring"}></Tab>
									</Tabs>
								</InputContainer>
								{
									this.state.newDosageRecurringType &&
									<InputContainer label={"Interval (in weeks)"}>
										<TextField placeholder={"Interval"} type={"number"}  onChange={(event) => {
											this.setState({newDosageInterval: event.target.value})
										}}/>
									</InputContainer>
								}
								{
									!this.state.newDosageRecurringType &&
									<Layout>
										<InputContainer label={"Start (in weeks)"}>
											<TextField placeholder={"Start"} type={"number"}  onChange={(event) => {
												this.setState({newDosageIntervalStart: event.target.value})
											}}/>
										</InputContainer>
										<InputContainer label={"End (in weeks)"}>
											<TextField placeholder={"End"} type={"number"}  onChange={(event) => {
												this.setState({newDosageIntervalEnd: event.target.value})
											}}/>
										</InputContainer>
									</Layout>
								}


							</Layout>
						</DialogContent>
						<DialogActions>
							<Button onClick={()=>{this.setState({openAddDosage: false});}} color="primary">
								Cancel
							</Button>
							<Button color="primary" type={"submit"}>
								Add Dosage
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			</AnnotatedSection>;
		} else {
			return <div></div>;
		}
	}
});

export default connect(store => store)(Index);