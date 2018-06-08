import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import style from "../style"
import VaccineCenterTmpl from "./vaccine-centers-tmpl"
import Layout from "../../../components/layout";
import {
	TextField,
	Radio,
	Button,
	FormControlLabel,
	RadioGroup,
	Select,
	MenuItem,
	Input,
	Paper
} from "@material-ui/core";
import {AnnotatedSection} from "../../../components/page-layout";
import InputContainer from "../../../components/input"
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';


function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion.label, query);
	const parts = parse(suggestion.label, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
					) : (
						<strong key={String(index)} style={{ fontWeight: 500 }}>
							{part.text}
						</strong>
					);
				})}
			</div>
		</MenuItem>
	);
}

function renderSuggestionsContainer(options) {
	const { containerProps, children } = options;
	return (

		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

const Index = withRoot(style)(class extends React.Component {

	state = {
		hospitalType:"Hospital",
		selected_disease:"",
		disease_suggestions:[]
	};

	onSuggestionsFetchRequested(){
		this.setState({disease_suggestions:[
			{label:"lol"},
			{label:"lol2"},
			{label:"lol3"},
			{label:"lol4"},
			{label:"lol5"},
		]})
	}

	onSuggestionsClearRequested(){
		this.setState({disease_suggestions:[]})
	}

	render() {
		const {classes} = this.props;
		return <VaccineCenterTmpl>
			<Layout direction={"column"}>
				<AnnotatedSection title={"Add Vaccination Center"}
				                  desc={"Please provide the information to register Vaccination Center."}
				                  backButton={{url: "/super-admin/vaccination-centers"}}>
					<Paper className={classes.paperPage}>
						<Layout direction={"column"}>
							<InputContainer label={"Vaccination Center Name"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Type"}>
								<Select
									value={this.state.hospitalType}
									onChange={(e)=>{this.setState({hospitalType:e.target.value})}}
								>
									<MenuItem value={"Hospital"}>Hospital</MenuItem>
									<MenuItem value={"Pet Clinic"}>Pet Clinic</MenuItem>
									<MenuItem value={"Other"}>Other</MenuItem>
								</Select>
							</InputContainer>
							<InputContainer label={"Disease"}>
								<Autosuggest
									theme={{
										container: classes.auto_suggest,
										suggestionsContainerOpen: classes.suggestionsContainerOpen,
										suggestionsList: classes.suggestionsList,
										suggestion: classes.suggestion,
									}}
									suggestions={this.state.disease_suggestions}
									onSuggestionsFetchRequested={()=>{this.onSuggestionsFetchRequested()}}
									onSuggestionsClearRequested={()=>{this.onSuggestionsClearRequested()}}
									getSuggestionValue={(suggestion)=>suggestion.name}
									renderSuggestionsContainer={renderSuggestionsContainer}
									renderInputComponent={(inputProps)=>{
										const { InputProps, ref,classes, ...other } = inputProps;
										return <TextField
											fullWidth
											InputProps={{
												classes: {
													input: classes.input,
												},
												inputRef: ref,
												...InputProps,
											}}
											{...other}
										/>
									}}
									renderSuggestion={renderSuggestion}
									inputProps={{
										classes,
										placeholder: 'Search a country (start with a)',
										value: this.state.selected_disease,
										onChange: (e, {newValue})=>{
											this.setState({selected_disease:newValue})
										},
									}}
								/>
							</InputContainer>
							<InputContainer label={"Pet"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Breed"}>
								<Select
									value={10}
									input={<Input name="age" id="age-helper"/>}
								>
									<MenuItem value="">
										<em>Any</em>
									</MenuItem>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</InputContainer>

							<InputContainer label={"Gender"}>
								<RadioGroup name="gender">
									<Layout>
										<FormControlLabel value="female" control={<Radio color="primary"/>} label="Female"/>
										<FormControlLabel value="male" control={<Radio color="primary"/>} label="Male"/>
										<FormControlLabel value="other" control={<Radio color="primary"/>} label="Any"/>
									</Layout>
								</RadioGroup>
							</InputContainer>
							<Layout justifyContent={"flex-end"}>
								<Button> Clear </Button>
								<Button variant={"raised"} color={"primary"}> Add </Button>
							</Layout>
						</Layout>
					</Paper>
				</AnnotatedSection>
			</Layout>
		</VaccineCenterTmpl>
	}
})

export default connect(store => store)(Index)