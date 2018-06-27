import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import InputContainer from "../../../components/input"
import style from "../style";
import {Button, MenuItem, Select, TextField} from "@material-ui/core/es/index";
import {QUERY_BREEDS, QUERY_PET_TYPES} from "../../../stores/entities/pet-types/actions";
import {REQUEST_CREATE_PET} from "../../../stores/entities/pets/actions";
import Layout from "../../../components/layout";
import {DatePicker} from "material-ui-pickers";
import {Redirect} from "react-router-dom";
import moment from "moment"

let Index = withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit * 4
		},
		body: {
			marginTop: theme.spacing.unit * 2
		}
	}
})(class extends React.Component {

	state = {
		name: "",
		pet_type: null,
		breed: null,
		date_of_birth:new Date(),
		chip_id:"",
	};

	componentWillMount() {
		this.props.dispatch({type: QUERY_PET_TYPES});
	}


	render() {
		const {classes} = this.props;
		return <AnnotatedSection title={"Register Pet"} desc={"Please provide necessary information to register pet."}
		                         backButton={{url: "/admin/dashboard/vaccinations"}} className={classes.body}>
			{
				this.props.petDetail.petCreated &&
				<Redirect to={`/admin/dashboard/pets/${this.props.petDetail._id}`} />
			}
			<form onSubmit={(e) => {
				e.preventDefault();
				this.props.dispatch({
					type: REQUEST_CREATE_PET, payload: {
						name: this.state.name,
						pet_type: this.state.pet_type,
						breed: this.state.breed,
						chip_id: this.state.chip_id,
						date_of_birth: this.state.date_of_birth,
						owner: this.props.match.params.guardian_id
					}
				})
			}}>
				<Paper className={classes.paperPage}>
					<InputContainer label={"Name"}>
						<TextField value={this.state.name} onChange={(event) => {
							this.setState({name: event.target.value});
						}}></TextField>
					</InputContainer>
					<InputContainer label={"Pet Type"}>
						{
							this.props.petTypes.list.length > 0 &&
							<Select value={this.state.pet_type || ''} onChange={(event) => {
								this.setState({pet_type: event.target.value, breed: null});
								this.props.dispatch({type: QUERY_BREEDS, payload: {pet_type_id: event.target.value}});
							}}>
								{
									this.props.petTypes.list.map((item) => {
										return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
									})
								}
							</Select>
						}
						{
							this.props.petTypes.list.length == 0 &&
							<Select disabled value={"none"}>
							</Select>
						}
					</InputContainer>
					<InputContainer label={"Breed"}>
						{
							this.props.petTypes.breed_list.length > 0 &&
							<Select value={this.state.breed || ''} onChange={(event) => {
								this.setState({breed: event.target.value})
							}}>
								{
									this.props.petTypes.breed_list.map((item) => {
										return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
									})
								}
							</Select>
						}
						{
							this.props.petTypes.breed_list.length == 0 &&
							<Select disabled value={"none"}>
							</Select>
						}
					</InputContainer>
					<InputContainer label={"Chip Id"}>
						<TextField value={this.state.chip_id} onChange={(event) => {
							this.setState({chip_id: event.target.value});
						}}></TextField>
					</InputContainer>
					<InputContainer label="Date Of Birth">
						<DatePicker
							value={this.state.date_of_birth}
							onChange={(date) => {
								console.log(date);
								this.setState({date_of_birth:date});
							}}
							labelFunc={(date)=>{
								return moment(date).format('MMMM Do YYYY');
							}}
							animateYearScrolling={false}
						/>
					</InputContainer>
					<Layout justifyContent={"flex-end"} className={classes.actions}>
						<Button> Clear </Button>
						<Button variant={"raised"} color={"primary"} type={"submit"}> Add </Button>
					</Layout>
				</Paper>
			</form>
		</AnnotatedSection>;
	}

});

export default connect(store => store)(Index);