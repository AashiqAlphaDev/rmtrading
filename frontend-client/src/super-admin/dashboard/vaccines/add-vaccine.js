import React from "react"
import {Paper,TextField,Button} from "@material-ui/core/index";
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
import {REQUEST_ADD_VACCINE} from "../../../stores/vaccines/actions";
import {
	BREED_CLEAR_MATCHES,
	PET_TYPE_CLEAR_MATCHES,
	QUERY_BREEDS,
	QUERY_PET_TYPES, REQUEST_ADD_BREED,
	REQUEST_ADD_PET_TYPE
} from "../../../stores/pet-types/actions";

let Index = withStyles((theme)=>{
	return {
		...style(theme),
		actions:{
			marginTop:theme.spacing.unit*4,
			marginBottom:theme.spacing.unit*4
		}
	}
})(class extends React.PureComponent{

	state={
		selectedCountry:null,
		selectedBreed:null,
		selectedPetType:null,
		country_query:"",
		breed_query:"",
		pet_type_query:""
	};

	handleCountrySuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_COUNTRIES, payload:{query:event.value}});
	}

	handlePetTypesSuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_PET_TYPES, payload:{query:event.value}});
	}

	handleBreedSuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_BREEDS, payload:{pet_type_id:this.state.selectedPetType._id,query:event.value}});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.countries.addedCountry){
			this.setState({selectedCountry:nextProps.countries.addedCountry});
			this.props.dispatch({type:COUNTRY_CLEAR_MATCHES});
		}
		if(nextProps.petTypes.addedPetType){
			this.setState({selectedPetType:nextProps.petTypes.addedPetType});
			this.props.dispatch({type:PET_TYPE_CLEAR_MATCHES});
		}
		if(nextProps.petTypes.addedBreed){
			this.setState({selectedBreed:nextProps.petTypes.addedBreed});
			this.props.dispatch({type:BREED_CLEAR_MATCHES});
		}
	}

	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccination Center"}
		                         desc={"Please provide the information to register Vaccination Center."}
		                         backButton={{url: "/super-admin/dashboard/vaccines"}}>
			<Paper className={classes.paperPage}>
				<form onSubmit={(e)=>{
					e.preventDefault();
					if(!this.state.selectedState || !this.state.selectedCountry){
						return;
					}
					let vaccineData = {
						name:this.state.name,
						address:{
							city:this.state.city,
							country:this.state.selectedCountry._id,
							state:this.state.selectedState._id,
							address:this.state.address,
							address2:this.state.address2,
							zip_code:this.state.zip_code
						},
						contact:{
							name:this.state.contact_name,
							phNo:this.state.contact_number,
							email:this.state.contact_email,
							fax:this.state.contact_fax,
						}
					};
					this.props.dispatch({type:REQUEST_ADD_VACCINE, payload:vaccineData})
				}}>
				<Layout direction={"column"}>
					<InputContainer label={"Vaccine Name"}>
						<TextField onChange={(e)=>{this.setState({name:e.target.value})}}/>
					</InputContainer>
					<AutoSuggest
						suggestions={this.props.countries.list.length === 0 && !this.state.selectedCountry? [{
							name: `+ Add ${this.state.country_query}`,
							action: "create_new",
							value: {name:this.state.country_query}
						}] : this.props.countries.list}
						onSuggestionsFetchRequested={this.handleCountrySuggestionsFetchRequested.bind(this)}
						onSuggestionsClearRequested={() => {
							this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
						}}
						disabled={this.props.countries.addingCountryInProgress}
						placeholder={"Country"}
						value={this.state.country_query}
						onBlur={()=>{
							if(!this.state.selectedCountry){
								this.setState({country_query:""})
							}
						}}
						onChange={(event, payload) => {
							event.preventDefault();
							const {newValue} = payload;
							if(typeof newValue === 'string'){
								this.setState({selectedCountry:null});
								this.setState({country_query:newValue});
							}
							else{
								if(newValue.action){
									this.props.dispatch({type:REQUEST_ADD_COUNTRY, payload:newValue.value});
								}
								else{
									this.setState({selectedCountry:newValue});
									this.setState({country_query:newValue.name});
								}
							}
						}}
					/>
					<AutoSuggest
						suggestions={this.props.petTypes.list.length === 0 && !this.state.selectedPetType? [{
							name: `+ Add ${this.state.pet_type_query}`,
							action: "create_new",
							value: {name:this.state.pet_type_query}
						}] : this.props.petTypes.list}
						onSuggestionsFetchRequested={this.handlePetTypesSuggestionsFetchRequested.bind(this)}
						onSuggestionsClearRequested={() => {
							this.props.dispatch({type: PET_TYPE_CLEAR_MATCHES});
						}}
						disabled={this.props.petTypes.addingPetTypeInProgress}
						placeholder={"Pet Type"}
						value={this.state.pet_type_query}
						onBlur={()=>{
							if(!this.state.selectedPetType){
								this.setState({pet_type_query:""})
							}
						}}
						onChange={(event, payload) => {
							event.preventDefault();
							const {newValue} = payload;
							if(typeof newValue === 'string'){
								this.setState({selectedPetType:null});
								this.setState({pet_type_query:newValue});
							}
							else{
								if(newValue.action){
									this.props.dispatch({type:REQUEST_ADD_PET_TYPE, payload:newValue.value});
								}
								else{
									this.setState({selectedPetType:newValue});
									this.setState({pet_type_query:newValue.name});
								}
							}
						}}
					/>
					<Layout>
						<AutoSuggest
							suggestions={this.props.petTypes.breed_list.length === 0 && !this.state.selectedBreed? [{
								name: `+ Add ${this.state.breed_query}`,
								action: "create_new",
								value: {name:this.state.breed_query}
							}] : this.props.petTypes.breed_list}
							onSuggestionsFetchRequested={this.handleBreedSuggestionsFetchRequested.bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type: BREED_CLEAR_MATCHES});
							}}
							onBlur={()=>{
								if(!this.state.selectedBreed){
									this.setState({breed_query:""})
								}
							}}
							disabled={!this.state.selectedPetType}
							placeholder={"Breed"}
							value={this.state.breed_query}
							onChange={(event, payload) => {
								event.preventDefault();
								const {newValue} = payload;
								if(typeof newValue === 'string'){
									this.setState({selectedBreed:null});
									this.setState({breed_query:newValue});
								}
								else{
									if(newValue.action){
										this.props.dispatch({type:REQUEST_ADD_BREED, payload:{breed_data:newValue.value, pet_type_id:this.state.selectedPetType._id}});
									}
									else{
										this.setState({selectedBreed:newValue});
										this.setState({breed_query:newValue.name});
									}
								}
							}}
						/>
					</Layout>
					<Layout>
						<InputContainer label={"Address"}>
							<TextField onChange={(event)=>{
								this.setState({address:event.target.value})
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Address Line 2"}>
							<TextField onChange={(event)=>{
								this.setState({address2:event.target.value})
							}}></TextField>
						</InputContainer>
					</Layout>
					<InputContainer label={"Zip Code"}>
						<TextField onChange={(event)=>{
							this.setState({zip_code:event.target.value})
						}}></TextField>
					</InputContainer>
					<Layout>
						<InputContainer label={"Contact Person"}>
							<TextField onChange={(event)=>{
								this.setState({contact_name:event.target.value})
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Contact Number"}>
							<TextField onChange={(event)=>{
								this.setState({contact_number:event.target.value})
							}}></TextField>
						</InputContainer>
					</Layout>
					<Layout>
						<InputContainer label={"Center Email"}>
							<TextField onChange={(event)=>{
								this.setState({contact_email:event.target.value})
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Center Fax"}>
							<TextField onChange={(event)=>{
								this.setState({contact_fax:event.target.value})
							}}></TextField>
						</InputContainer>
					</Layout>
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

export default connect(store=>store)(Index);