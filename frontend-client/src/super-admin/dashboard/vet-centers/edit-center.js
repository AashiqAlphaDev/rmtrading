import React from "react"
import {Paper, TextField, Button} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import Layout from "../../../components/layout";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import AutoSuggest from "../../../components/auto-suggest";
import {connect} from "react-redux";
import style from "../style";
import {
	COUNTRY_CLEAR_MATCHES,
	QUERY_COUNTRIES,
	QUERY_STATES,
	REQUEST_ADD_COUNTRY,
	REQUEST_ADD_STATE,
	STATE_CLEAR_MATCHES
} from "../../../stores/countries/actions";
import {
	CLEAR_VET_CENTER,
	REQUEST_ADD_VET_CENTER,
	REQUEST_VET_CENTER_FETCH,
	VET_CENTER_FETCH_FAILED
} from "../../../stores/vet-centers/actions";
import {Redirect} from "react-router-dom";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 3,
			margin: theme.spacing.unit * 1
		},
		body: {
			marginTop: theme.spacing.unit * 2
		},
		actionButton: {
			marginLeft: theme.spacing.unit * 1,
		}
	}
})(class extends React.PureComponent {

	state = {
		country_query: "",
		selectedCountry: null,
		selectedState: null,
		state_query: "",
		matched_states: []
	};

	componentWillMount() {
		this.props.dispatch({type: CLEAR_VET_CENTER});
		this.props.dispatch({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: this.props.match.params.center_id}});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.countries.addedCountry) {
			this.setState({selectedCountry: nextProps.countries.addedCountry});
			this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
		}
		if (nextProps.countries.addedState) {
			this.setState({selectedState: nextProps.countries.addedState});
			this.props.dispatch({type: STATE_CLEAR_MATCHES});
		}
	}

	render() {
		const {classes} = this.props;
		if (this.props.vetCenterDetail._id) {
			if (!this.props.vetCenterDetail.data) {
				this.props.vetCenterDetail.data = {};
			}
			return <AnnotatedSection
				title={`${this.props.vetCenterDetail.name}`}
				desc={`${this.props.vetCenterDetail.data.country ? this.props.vetCenterDetail.data.country : ""} ${this.props.vetCenterDetail.address.city}`}
				backButton={{url: "/super-admin/dashboard/vet-centers"}}
				className={classes.body}>
				<Paper className={classes.paperPage}>
					<form onSubmit={(e) => {
						e.preventDefault();
						if (!this.state.selectedState || !this.state.selectedCountry) {
							return;
						}
						let vetCenterData = {
							name: this.state.name,
							address: {
								city: this.state.city,
								country: this.state.selectedCountry._id,
								state: this.state.selectedState._id,
								address: this.state.address,
								address2: this.state.address2,
								zip_code: this.state.zip_code
							},
							contact: {
								name: this.state.contact_name,
								phNo: this.state.contact_number,
								email: this.state.contact_email,
								fax: this.state.contact_fax,
							}
						};
						this.props.dispatch({type: REQUEST_ADD_VET_CENTER, payload: vetCenterData})
					}}>
						<Layout direction={"column"}>
							<InputContainer label={"Contact Person"}>
								<TextField onChange={(event) => {
									this.setState({contact_name: event.target.value})
								}}></TextField>
							</InputContainer>
							<InputContainer label={"Contact Number"}>
								<TextField onChange={(event) => {
									this.setState({contact_number: event.target.value})
								}}></TextField>
							</InputContainer>
							<InputContainer label={"Vaccination Department Email"}>
								<TextField onChange={(event) => {
									this.setState({contact_email: event.target.value})
								}}></TextField>
							</InputContainer>
							<InputContainer label={"Vaccination Department Fax"}>
								<TextField onChange={(event) => {
									this.setState({contact_fax: event.target.value})
								}}></TextField>
							</InputContainer>
							<Layout justifyContent={"flex-end"} className={classes.actions}>
								<Button className={classes.actionButton}> Clear </Button>
								<Button className={classes.actionButton} variant={"raised"} color={"primary"}
								        type={"submit"}> Save </Button>
							</Layout>
						</Layout>
					</form>
				</Paper>
			</AnnotatedSection>
		}
		else {
			return <div></div>;
		}
	}

});

export default connect(store => store)(Index);