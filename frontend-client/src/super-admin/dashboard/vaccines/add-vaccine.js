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
import {REQUEST_ADD_VET_CENTER} from "../../../stores/vet-centers/actions";
import {PET_TYPE_FETCH_MATCHES} from "../../../../../frontend/store/super-admin/app-data-actions";

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
		country_query:"",
		pet_type_query:"",
		breed_query:"",
		selectedCountry:null,
		selectedPetType:null,
		selectedBreed:null,
		selectedState:null,
		state_query:"",
		matched_states:[]
	};

	handleCountrySuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_COUNTRIES, payload:{query:event.value}});
	}
	handlePetTypesSuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_COUNTRIES, payload:{query:event.value}});
	}




	handleStateSuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_STATES, payload:{country_id:this.state.selectedCountry._id,query:event.value}});
	}
	handleBreedSuggestionsFetchRequested(event){
			this.props.dispatch({type:QUERY_STATES, payload:{country_id:this.state.selectedCountry._id,query:event.value}});
		}

	componentWillReceiveProps(nextProps){
		if(nextProps.countries.addedCountry){
			this.setState({selectedCountry:nextProps.countries.addedCountry});
			this.props.dispatch({type:COUNTRY_CLEAR_MATCHES});
		}
		if(nextProps.countries.addedState){
			this.setState({selectedState:nextProps.countries.addedState});
			this.props.dispatch({type:STATE_CLEAR_MATCHES});
		}
	}

	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccine"}
		                         desc={"Please provide the information to register Vaccine."}
		                         backButton={{url: "/super-admin/dashboard/vet-centers"}}>
			<Paper className={classes.paperPage}>
				<form onSubmit={(e)=>{
					e.preventDefault();
					if(!this.state.selectedState || !this.state.selectedCountry){
						return;
					}
					let vetCenterData = {
						name:this.state.name,
						related_disease:this.state.related_disease,
						pet_type:this.state.pet_type,
						breed:this.state.breed,
						gender:this.state.gender,
						remarks:this.state.remarks

					};
					this.props.dispatch({type:REQUEST_ADD_VET_CENTER, payload:vetCenterData})
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
						<Layout>
							<AutoSuggest
								suggestions={this.props.countries.state_list.length === 0 && !this.state.selectedState? [{
									name: `+ Add ${this.state.state_query}`,
									action: "create_new",
									value: {name:this.state.state_query}
								}] : this.props.countries.state_list}
								onSuggestionsFetchRequested={this.handleStateSuggestionsFetchRequested.bind(this)}
								onSuggestionsClearRequested={() => {
									this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
								}}
								onBlur={()=>{
									if(!this.state.selectedState){
										this.setState({state_query:""})
									}
								}}
								disabled={!this.state.selectedCountry}
								placeholder={"State"}
								value={this.state.state_query}
								onChange={(event, payload) => {
									event.preventDefault();
									const {newValue} = payload;
									if(typeof newValue === 'string'){
										this.setState({selectedState:null});
										this.setState({state_query:newValue});
									}
									else{
										if(newValue.action){
											this.props.dispatch({type:REQUEST_ADD_STATE, payload:{state_data:newValue.value, country_id:this.state.selectedCountry._id}});
										}
										else{
											this.setState({selectedState:newValue});
											this.setState({state_query:newValue.name});
										}
									}
								}}
							/>
						</Layout>
						<AutoSuggest
							suggestions={this.props.pet-types.list.length === 0 && !this.state.selectedPetType? [{
								name: `+ Add ${this.state.pet_type_query}`,
								action: "create_new",
								value: {name:this.state.pet_type_query}
							}] : this.props.countries.list}
							onSuggestionsFetchRequested={this.handlePetTypesSuggestionsFetchRequested().bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type:PET_TYPE_FETCH_MATCHES});
							}}
							disabled={this.props.pet-types.addingPetTypeInProgress}
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
										this.props.dispatch({type:REQUEST_ADD_COUNTRY, payload:newValue.value});
									}
									else{
										this.setState({selectedPetType:newValue});
										this.setState({pet_type_query:newValue.name});
									}
								}
							}}
						/>
						<AutoSuggest
							suggestions={this.props.pet-types.list.state_list.length === 0 && !this.state.selectedBreed? [{
								name: `+ Add ${this.state.breed_query}`,
								action: "create_new",
								value: {name:this.state.breed_query}
							}] : this.props.pet-types.list.state_list}
							onSuggestionsFetchRequested={this.handleBreedSuggestionsFetchRequested.bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
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
						<InputContainer label={"Related Disease"}>
							<TextField onChange={(event)=>{
								this.setState({related_disease:event.target.value})
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Gender"}>
							<TextField onChange={(event)=>{
								this.setState({gender:event.target.value})
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Remarks"}>
							<TextField onChange={(event)=>{
								this.setState({remarks:event.target.value})
							}}></TextField>
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

export default connect(store=>store)(Index);