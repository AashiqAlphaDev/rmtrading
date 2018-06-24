import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {REQUEST_PET_FETCH} from "../../../stores/pets/actions";
import {QUERY_VACCINATIONS} from "../../../stores/vaccinations/actions";
import InputContainer from "../../../components/input"
import {
	Button, Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow, Paper
} from "@material-ui/core/es/index";
import {REQUEST_PET_TYPE_FETCH} from "../../../stores/pet-types/actions";
import moment from "moment"
import Layout from "../../../components/layout";
import QrReader from 'react-qr-reader';


var dates = {
	convert: function (d) {
		return (
			d.constructor === Date ? d :
				d.constructor === Array ? new Date(d[0], d[1], d[2]) :
					d.constructor === Number ? new Date(d) :
						d.constructor === String ? new Date(d) :
							typeof d === "object" ? new Date(d.year, d.month, d.date) :
								NaN
		);
	},
	compare: function (a, b) {
		return (
			isFinite(a = this.convert(a).valueOf()) &&
			isFinite(b = this.convert(b).valueOf()) ?
				(a > b) - (a < b) :
				NaN
		);
	},
	inRange: function (d, start, end) {
		return (
			isFinite(d = this.convert(d).valueOf()) &&
			isFinite(start = this.convert(start).valueOf()) &&
			isFinite(end = this.convert(end).valueOf()) ?
				start <= d && d <= end :
				NaN
		);
	}
}


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
		},
		paper: {
			marginTop: theme.spacing.unit * 1,
			display: "flex"
		},
	}
})(class extends React.Component {
	state = {
		openAddBiometrics: false,
		data: {
			height: 0,
			weight: 0
		},
		sample: false,
		isBarCode: false
	}

	componentWillMount() {
		this.props.dispatch({type: REQUEST_PET_FETCH, payload: {pet_id: this.props.match.params.pet_id}});
		this.props.dispatch({type: QUERY_VACCINATIONS, payload: {pet_id: this.props.match.params.pet_id}});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.petDetail.pet_type != nextProps.petTypes.petTypeDetail._id) {
			this.props.dispatch({type: REQUEST_PET_TYPE_FETCH, payload: {pet_type_id: nextProps.petDetail.pet_type}})
		}
	}

	render() {
		const {classes} = this.props;
		if (this.props.petTypes.petTypeDetail) {
			return <div className={classes.body}>
				<Paper className={`${classes.paperPage} ${classes.paper}`}>
					<Button onClick={() => {
						this.setState({openAddBiometrics: true});
					}}> Record Reading </Button>
				</Paper>

				{
					this.props.vaccinations.list.length > 0 &&
					<Paper className={`${classes.paperPage} ${classes.paper}`}>

						<Table>
							<TableHead>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Vaccine Name</TableCell>
									<TableCell>Dose</TableCell>
									<TableCell>Start Date</TableCell>
									<TableCell>Due Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.props.vaccinations.list.map((item, index) => {
										var inRange = dates.inRange(new Date(), new Date(item.catch_up_period.start), new Date(item.catch_up_period.due_date))
										return <TableRow key={index} style={inRange ? {} : {opacity: 0.5}}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>{item.data.vaccine}</TableCell>
											<TableCell>{item.dose}</TableCell>
											<TableCell>{moment(item.catch_up_period.start).format("MMMM Do YYYY")}</TableCell>
											<TableCell>{moment(item.catch_up_period.due_date).format("MMMM Do YYYY")}</TableCell>
											<TableCell><Button disabled={!inRange} onClick={() => {
												this.setState({currentVaccine: item});
											}}>Vaccinate</Button></TableCell>
										</TableRow>
									})
								}
							</TableBody>
						</Table>
					</Paper>
				}

				<Dialog
					open={Boolean(this.state.currentVaccine)}
					onClose={() => {
						this.setState({currentVaccine: null});
					}}
					aria-labelledby="form-dialog-title"
				>
					<form onSubmit={(event) => {
						event.preventDefault();
					}}>
						<DialogTitle id="form-dialog-title">Vaccination Detail</DialogTitle>
						<DialogContent>
							<Layout direction={"column"}>
								<Button onClick={() => {
									this.setState({isBarCode: !this.state.isBarCode})
								}}>{this.state.isBarCode ? "QR Code" : "Bar Code"}</Button>
								{
									this.state.isBarCode &&
									<div>
										<Typography>Please enter barcode of vaccination vail</Typography>
										<TextField autoFocus onChange={(e)=>{
											this.setState({vaccination_code:e.target.value});
										}}/>
									</div>
								}

								{
									!this.state.isBarCode &&
									<div>
										{
											this.state.vaccination_code &&
											<div>
											<Typography>Vaccination Code:{this.state.vaccination_code}</Typography>
												<Button onClick={()=>{this.setState({vaccination_code:null})}}>Scan Again</Button>
											</div>
										}
										{
											!this.state.vaccination_code &&
											<QrReader
												delay={this.state.delay}
												onError={(err) => {
													console.log(err);
												}}
												onScan={(result) => {
													if (result) {
														this.setState({vaccination_code: result});
													}
												}}
												style={{width: 400, height: 400}}
											/>
										}
									</div>
								}
							</Layout>
						</DialogContent>
					</form>
				</Dialog>

				<Dialog
					open={this.state.openAddBiometrics}
					onClose={() => {
						this.setState({openAddBiometrics: false})
					}}
					aria-labelledby="form-dialog-title"
				>
					<form onSubmit={(event) => {
						event.preventDefault();
					}}>
						<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
						<DialogContent>

							<DialogContentText>
								<Typography gutterBottom>
									Kindly enter the details of the pet To be vaccinated.
								</Typography>
							</DialogContentText>
							{
								this.props.petTypes.petTypeDetail.vaccination_fields &&
								this.props.petTypes.petTypeDetail.vaccination_fields.map((item) => {
									return <InputContainer label={item.name}>
										<TextField
											autoFocus
											type=""
											fullWidth
											onChange={(event) => {
												this.state.data[item.name] = event.target.value;
												this.setState({});
											}}
										/>
									</InputContainer>
								})
							}
						</DialogContent>
						<DialogActions>
							<Button onClick={() => {
								this.setState({openAddBiometrics: false})
							}} color="primary">
								Cancel
							</Button>
							<Button type="submit" color="primary">
								Save Reading
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			</div>
		}
		else {
			return <div></div>
		}
	}
});

export default connect(store => store)(Index)