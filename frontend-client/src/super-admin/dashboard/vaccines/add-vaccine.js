import React from "react"
import {Paper, TextField, Button} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import Layout from "../../../components/layout";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import AutoSuggest from "../../../components/auto-suggest";
import {connect} from "react-redux";
import style from "../style";
import _ from "underscore"
import {
	COUNTRY_CLEAR_MATCHES,
	QUERY_COUNTRIES,
	REQUEST_ADD_COUNTRY
} from "../../../stores/entities/countries/actions";
import {CLEAR_VACCINES, REQUEST_ADD_VACCINE} from "../../../stores/entities/vaccines/actions";
import {
	BREED_CLEAR_MATCHES,
	PET_TYPE_CLEAR_MATCHES,
	QUERY_BREEDS,
	QUERY_PET_TYPES, REQUEST_ADD_BREED,
	REQUEST_ADD_PET_TYPE
} from "../../../stores/entities/pet-types/actions";
import {DISEASE_CLEAR_MATCHES, QUERY_DISEASES, REQUEST_ADD_DISEASE} from "../../../stores/entities/diseases/actions";
import {Checkbox, FormControlLabel} from "@material-ui/core/es/index";
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
		selectedCountry: null,
		selectedBreed: null,
		selectedPetType: null,
		country_query: "",
		breed_query: "",
		pet_type_query: "",
		disease_query: "",
		selectedDiseases: [],
		remarks: "",
		forFemale: true,
		forMale: true
	};

	componentWillMount() {
		this.props.dispatch({type: CLEAR_VACCINES});
	}

	handleCountrySuggestionsFetchRequested(event) {
		this.props.dispatch({type: QUERY_COUNTRIES, payload: {query: event.value}});
	}

	handlePetTypesSuggestionsFetchRequested(event) {
		this.props.dispatch({type: QUERY_PET_TYPES, payload: {query: event.value}});
	}

	handleDiseaseSuggestionsFetchRequested(event) {
		this.props.dispatch({type: QUERY_DISEASES, payload: {query: event.value}});
	}

	handleBreedSuggestionsFetchRequested(event) {
		this.props.dispatch({
			type: QUERY_BREEDS,
			payload: {pet_type_id: this.state.selectedPetType._id, query: event.value}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.countries.addedCountry) {
			this.setState({selectedCountry: nextProps.countries.addedCountry});
			this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
		}
		if (nextProps.petTypes.addedPetType) {
			this.setState({selectedPetType: nextProps.petTypes.addedPetType});
			this.props.dispatch({type: PET_TYPE_CLEAR_MATCHES});
		}
		if (nextProps.petTypes.addedBreed) {
			this.setState({selectedBreed: nextProps.petTypes.addedBreed});
			this.props.dispatch({type: BREED_CLEAR_MATCHES});
		}
		if (nextProps.diseases.addedDisease) {
			this.state.selectedDiseases.push(nextProps.diseases.addedDisease)
			this.setState({});
			this.props.dispatch({type: DISEASE_CLEAR_MATCHES});
		}
	}

	render() {
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccine"}
		                         desc={"Please provide the information to add Vaccine."}
		                         backButton={{url: "/super-admin/dashboard/vaccines"}} className={classes.body}>
			{
				this.props.vaccines.vaccineAdded &&
				<Redirect to={"/super-admin/dashboard/vaccines"}/>
			}
			<Paper className={classes.paperPage}>
				<form onSubmit={(e) => {
					e.preventDefault();
					if (this.state.selectedCountry && this.state.selectedPetType) {
						let vaccineData = {
							name: this.state.name,
							diseases: _.map(this.state.selectedDiseases,(item)=>{return item._id}),
							country: this.state.selectedCountry._id,
							pet_type: this.state.selectedPetType._id,
							breed: this.state.selectedBreed ? this.state.selectedBreed._id : null,
							remarks: this.state.remarks,
							gender: {
								for_male: this.state.forMale,
								for_female: this.state.forFemale,
							}
						};
						this.props.dispatch({type: REQUEST_ADD_VACCINE, payload: vaccineData})
					}
				}}>
					<Layout direction={"column"}>
						<InputContainer label={"Vaccine Name"}>
							<TextField onChange={(e) => {
								this.setState({name: e.target.value})
							}}/>
						</InputContainer>
						<AutoSuggest
							multiple={true}
							onDelete={(deletedItem)=>{this.setState({selectedDiseases:_.filter(this.state.selectedDiseases, (item)=>{return item._id != deletedItem._id})})}}
							suggestions={this.props.diseases.list.length === 0 && !this.state.selectedDisease ? [{
								name: `+ Add ${this.state.disease_query}`,
								action: "create_new",
								value: {name: this.state.disease_query}
							}] : this.props.diseases.list}
							onSuggestionsFetchRequested={this.handleDiseaseSuggestionsFetchRequested.bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type: DISEASE_CLEAR_MATCHES});
							}}
							disabled={this.props.diseases.addingDiseaseInProgress}
							placeholder={"Disease"}
							values={this.state.selectedDiseases}
							value={this.state.disease_query}
							onBlur={() => {
								if (!this.state.selectedDisease) {
									this.setState({disease_query: ""})
								}
							}}
							onChange={(event, payload) => {
								event.preventDefault();
								const {newValue} = payload;
								if(event.keyCode==40 ||event.keyCode==38){
									return;
								}
								if (typeof newValue === 'string') {
									this.setState({selectedDisease: null});
									this.setState({disease_query: newValue});
								}
								else {
									if (newValue.action) {
										this.props.dispatch({type: REQUEST_ADD_DISEASE, payload: newValue.value});
									}
									else {
										if(Boolean(!_.find(this.state.selectedDiseases, (item)=>{return item._id===newValue._id}))){
											this.state.selectedDiseases.push(newValue);
											this.setState({disease_query: ""});
										}
									}
								}
							}}
						/>
						<AutoSuggest
							suggestions={this.props.countries.list.length === 0 && !this.state.selectedCountry ? [{
								name: `+ Add ${this.state.country_query}`,
								action: "create_new",
								value: {name: this.state.country_query}
							}] : this.props.countries.list}
							onSuggestionsFetchRequested={this.handleCountrySuggestionsFetchRequested.bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
							}}
							disabled={this.props.countries.addingCountryInProgress}
							placeholder={"Country"}
							value={this.state.country_query}
							onBlur={() => {
								if (!this.state.selectedCountry) {
									this.setState({country_query: ""})
								}
							}}
							onChange={(event, payload) => {
								event.preventDefault();
								const {newValue} = payload;
								if (typeof newValue === 'string') {
									this.setState({selectedCountry: null});
									this.setState({country_query: newValue});
								}
								else {
									if (newValue.action) {
										this.props.dispatch({type: REQUEST_ADD_COUNTRY, payload: newValue.value});
									}
									else {
										this.setState({selectedCountry: newValue});
										this.setState({country_query: newValue.name});
									}
								}
							}}
						/>
						<AutoSuggest
							suggestions={this.props.petTypes.list.length === 0 && !this.state.selectedPetType ? [{
								name: `+ Add ${this.state.pet_type_query}`,
								action: "create_new",
								value: {name: this.state.pet_type_query}
							}] : this.props.petTypes.list}
							onSuggestionsFetchRequested={this.handlePetTypesSuggestionsFetchRequested.bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type: PET_TYPE_CLEAR_MATCHES});
							}}
							disabled={this.props.petTypes.addingPetTypeInProgress}
							placeholder={"Pet Type"}
							value={this.state.pet_type_query}
							onBlur={() => {
								if (!this.state.selectedPetType) {
									this.setState({pet_type_query: ""})
								}
							}}
							onChange={(event, payload) => {
								event.preventDefault();
								const {newValue} = payload;
								if (typeof newValue === 'string') {
									this.setState({selectedPetType: null});
									this.setState({pet_type_query: newValue});
								}
								else {
									if (newValue.action) {
										this.props.dispatch({type: REQUEST_ADD_PET_TYPE, payload: newValue.value});
									}
									else {
										this.setState({selectedPetType: newValue});
										this.setState({pet_type_query: newValue.name});
									}
								}
							}}
						/>
						<Layout>
							<AutoSuggest
								suggestions={this.props.petTypes.breed_list.length === 0 && !this.state.selectedBreed ? [{
									name: `+ Add ${this.state.breed_query}`,
									action: "create_new",
									value: {name: this.state.breed_query}
								}] : this.props.petTypes.breed_list}
								onSuggestionsFetchRequested={this.handleBreedSuggestionsFetchRequested.bind(this)}
								onSuggestionsClearRequested={() => {
									this.props.dispatch({type: BREED_CLEAR_MATCHES});
								}}
								onBlur={() => {
									if (!this.state.selectedBreed) {
										this.setState({breed_query: ""})
									}
								}}
								disabled={!this.state.selectedPetType}
								placeholder={"Breed"}
								value={this.state.breed_query}
								onChange={(event, payload) => {
									event.preventDefault();
									const {newValue} = payload;
									if (typeof newValue === 'string') {
										this.setState({selectedBreed: null});
										this.setState({breed_query: newValue});
									}
									else {
										if (newValue.action) {
											this.props.dispatch({
												type: REQUEST_ADD_BREED,
												payload: {
													breed_data: newValue.value,
													pet_type_id: this.state.selectedPetType._id
												}
											});
										}
										else {
											this.setState({selectedBreed: newValue});
											this.setState({breed_query: newValue.name});
										}
									}
								}}
							/>
						</Layout>
						<Layout>
							<InputContainer label={"Gender"}>
								<Layout>
									<FormControlLabel
										control={
											<Checkbox
												checked={this.state.forMale}
												onChange={(e) => {
													this.setState({forMale: e.target.checked})
												}}
												color="primary"
											/>
										}
										label="Male"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={this.state.forFemale}
												onChange={(e) => {
													this.setState({forFemale: e.target.checked});
												}}
												color="primary"
											/>
										}
										label="Female"
									/>
								</Layout>
							</InputContainer>
						</Layout>
						<InputContainer label={"Remarks"}>
							<TextField value={this.state.remarks} onChange={(e) => {
								this.setState({remarks: e.target.value})
							}}/>
						</InputContainer>
						<Layout justifyContent={"flex-end"} className={classes.actions}>
							<Button> Clear </Button>
							<Button variant={"raised"} color={"primary"} type={"submit"}> Add </Button>
						</Layout>
					</Layout>
				</form>
			</Paper>
		</AnnotatedSection>;
	}

});

export default connect(store => store)(Index);