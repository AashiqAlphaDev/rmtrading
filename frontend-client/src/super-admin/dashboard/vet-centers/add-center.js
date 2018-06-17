import React from "react"
import {Paper,TextField,Button} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import Layout from "../../../components/layout";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import AutoSuggest from "../../../components/auto-suggest";
import {connect} from "react-redux";
import style from "../style";
import {COUNTRY_CLEAR_MATCHES, QUERY_COUNTRIES, REQUEST_ADD_COUNTRY,REQUEST_ADD_STATE} from "../../../stores/countries/actions";

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
		selectedCountry:null,
		state_query:"",
		matched_states:[]
	};

	handleCountrySuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_COUNTRIES, payload:{query:event.value}});
	}

	getStates(value){
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		let count = 0;
		return inputLength === 0
			? []
			: this.state.selectedCountry.states.filter(suggestion => {
				const keep =
					count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

				if (keep) {
					count += 1;
				}

				return keep;
			});
	}

	handleStateSuggestionsFetchRequested(event){
		this.setState({matched_states:this.getStates(event.value)});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.countries.addedCountry){
			this.setState({selectedCountry:nextProps.countries.addedCountry});
			this.props.dispatch({type:COUNTRY_CLEAR_MATCHES});
		}
	}

	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccination Center"}
		                         desc={"Please provide the information to register Vaccination Center."}
		                         backButton={{url: "/super-admin/dashboard/vet-centers"}}>
			<Paper className={classes.paperPage}>
				<Layout direction={"column"}>
					<InputContainer label={"Vaccination Center Name"}>
						<TextField onChange={(e)=>{this.setState({name:e.target.value})}}/>
					</InputContainer>
					<InputContainer label={"Type"}>
						<TextField onChange={(e)=>{this.setState({type:e.target.value})}}/>
					</InputContainer>
					<AutoSuggest
						suggestions={this.props.countries.list.length == 0 ? [{
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
						onChange={(event, payload) => {
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
							suggestions={this.state.matched_states.length == 0 ? [{
								name: `+ Add ${this.state.state_query}`,
								action: "create_new",
								value: {name:this.state.state_query}
							}] : this.state.matched_states}
							onSuggestionsFetchRequested={this.handleStateSuggestionsFetchRequested.bind(this)}
							onSuggestionsClearRequested={() => {
								this.props.dispatch({type: COUNTRY_CLEAR_MATCHES});
							}}
							disabled={this.state.selectedCountry}
							placeholder={"State"}
							value={this.state.state_query}
							onChange={(event, payload) => {
								const {newValue} = payload;
								if(typeof newValue === 'string'){
									this.setState({selectedState:null});
									this.setState({state_query:newValue});
								}
								else{
									if(newValue.action){
										this.props.dispatch({type:REQUEST_ADD_STATE, payload:newValue.value});
									}
									else{
										this.setState({state_query:newValue.name});
									}
								}
							}}
						/>
						<InputContainer label={"City"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<Layout>
						<InputContainer label={"Address"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"Address Line 2"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<InputContainer label={"Zip Code"}>
						<TextField></TextField>
					</InputContainer>
					<Layout>
						<InputContainer label={"Contact Person"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"Contact Number"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<Layout>
						<InputContainer label={"Center Email"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"Center Fax"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<Layout justifyContent={"flex-end"} className={classes.actions}>
						<Button> Clear </Button>
						<Button variant={"raised"} color={"primary"}> Add </Button>
					</Layout>
				</Layout>
			</Paper>
		</AnnotatedSection>;
	}

});

export default connect(store=>store)(Index);