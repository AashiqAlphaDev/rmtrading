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
	Typography
} from "@material-ui/core/es/index";
import {REQUEST_PET_TYPE_FETCH} from "../../../stores/pet-types/actions";

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
	state= {
		openAddBiometrics:false,
		data:{
			height:0,
			weight:0
		},
		sample:false
	}

	componentWillMount() {
		this.props.dispatch({type:REQUEST_PET_FETCH, payload:{pet_id:this.props.match.params.pet_id}});
		this.props.dispatch({type:QUERY_VACCINATIONS,payload:{pet_id:this.props.match.params.pet_id}});

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.petDetail.pet_type && !nextProps.petTypes.petTypeDetail){
			this.props.dispatch({type:REQUEST_PET_TYPE_FETCH, payload:{pet_type_id:nextProps.petDetail.pet_type}})
		}
	}

	render() {
		const {classes} = this.props;
		if(this.props.petTypes.petTypeDetail){
			return <div className={classes.body}>
				<Button onClick={()=>{
					this.setState({openAddBiometrics:true});
				}}> Record Reading </Button>
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
							{JSON.stringify(this.props.petTypes.petTypeDetail)}
							{
								this.props.petTypes.petTypeDetail.vaccination_fields &&
								this.props.petTypes.petTypeDetail.vaccination_fields.map((item)=>{
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
								Add
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			</div>
		}
		else{
			return <div></div>
		}
	}
});

export default connect(store => store)(Index)