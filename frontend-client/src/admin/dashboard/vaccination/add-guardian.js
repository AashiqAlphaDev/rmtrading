import React from "react"
import {Paper, TextField, Button, Typography} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import Layout from "../../../components/layout";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import style from "../style";
import {REQUEST_CREATE_USER} from "../../../stores/users/actions";
import {
	BREED_CLEAR_MATCHES,
	PET_TYPE_CLEAR_MATCHES,
	REQUEST_ADD_BREED,
	REQUEST_ADD_PET_TYPE
} from "../../../stores/pet-types/actions";
import {REQUEST_ADD_VACCINE} from "../../../stores/vaccines/actions";
import {DISEASE_CLEAR_MATCHES, REQUEST_ADD_DISEASE} from "../../../stores/diseases/actions";
import {COUNTRY_CLEAR_MATCHES, REQUEST_ADD_COUNTRY} from "../../../stores/countries/actions";
import {Redirect} from "react-router-dom";

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
})(class extends React.PureComponent {

	state = {
		name: "",
		mobile_number: "",
		email: "",
		profile: {
			first_name: "",
			address: "",
			mobile_number: "",
			government_issued_id: ""
		}
	};

	render() {
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Guardian"}
		                         desc={"Please provide the information to add Vaccine."}
		                         backButton={{url: "/admin/dashboard/vaccinations"}} className={classes.body}>
			{
				this.props.vaccines.guardianAdded &&
				<Redirect to={"/super-admin/dashboard/vaccinations"}/>
			}
			<Paper className={classes.paperPage}>
				<form onSubmit={(e) => {
					e.preventDefault();
					let guardianData = {
						name: this.state.name,
						mobile_number: this.state.mobile_number,
						email: this.state.email,
						profile: {
							first_name: this.state.name,
							address: this.state.address,
							mobile_number: this.state.mobile_number,
							government_issued_id_type: this.state.government_issued_id_type,
							government_issued_id: this.state.government_issued_id
						}

					};
					this.props.dispatch({type: REQUEST_CREATE_USER, payload: guardianData});
				}}>

					<Layout direction={"column"}>
						<InputContainer label={"Name"}>
							<TextField onChange={(e) => {
								this.setState({name: e.target.value})
							}}/>
						</InputContainer>
						<InputContainer label={"Mobile Number"}>
							<TextField onChange={(e) => {
								this.setState({mobile_number: e.target.value})
							}}/>
						</InputContainer>
						<InputContainer label={"Email"}>
							<TextField onChange={(e) => {
								this.setState({email: e.target.value})
							}}/>
						</InputContainer>
						<InputContainer label={"City"}>
							<TextField onChange={(event) => {
								this.setState({city: event.target.value})
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Address"}>
							<TextField onChange={(event) => {
								this.setState({address: event.target.value})
							}}></TextField>
						</InputContainer>
						<Layout>
							<InputContainer label={"Government ID No"}>
								<TextField onChange={(event) => {
									this.setState({government_issued_id: event.target.value})
								}}></TextField>
							</InputContainer>
						</Layout>
					</Layout>
					<Layout justifyContent={"flex-end"} className={classes.actions}>
						<Button> Clear </Button>
						<Button variant={"raised"} color={"primary"} type={"submit"}> Add </Button>
					</Layout>
				</form>
			</Paper>
		</AnnotatedSection>


	}
});

export default connect(store => store)(Index);