import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import style from "../style"
import VaccineTmpl from "./vaccines-tmpl"
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
    Paper,
} from "@material-ui/core";
import {AnnotatedSection} from "../../../components/page-layout";
import InputContainer from "../../../components/input"
import AutoSuggest from "../../../components/auto-suggest"
import {
	DISEASES_FETCH_MATCHES,
	DISEASES_CLEAR_MATCHES,
	DISEASES_CREATE,
	PET_TYPE_CLEAR_MATCHES, PET_TYPE_CREATE
} from "../../../store/super-admin/app-data-actions";

const Index = withRoot(style)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disease_query: "",
	        pet_type_query: ""
        };
    }

    handleDiseaseSuggestionsFetchRequested({value}) {
        this.props.dispatch({type: DISEASES_FETCH_MATCHES, payload: {query: value}})
    }

	handlePetTypeSuggestionsFetchRequested({value}) {
		this.props.dispatch({type: DISEASES_FETCH_MATCHES, payload: {query: value}})
	}

    render() {
        const {classes} = this.props;
        return <VaccineTmpl>
            <Layout direction={"column"}>
                <AnnotatedSection
                    title={"Add Vaccine"}
                    desc={"Please add the necessary information related to vaccine. This will be reflected in the entry forms of vaccination centers."}
                    backButton={{url: "/super-admin/vaccines"}}>
                    <Paper className={classes.paperPage}>
                        <Layout direction={"column"}>
                            <InputContainer label={"Vaccine Name"}>
                                <TextField></TextField>
                            </InputContainer>
                            <InputContainer label={"Country"}>
                                <TextField></TextField>
                            </InputContainer>
                            <AutoSuggest
                                suggestions={this.props.adminData.diseaseList.matched_diseases.length == 0 ? [{
                                    name: `+ Create ${this.state.disease_query}`,
                                    action: "create_new",
                                    value: {name:this.state.disease_query}
                                }] : this.props.adminData.diseaseList.matched_diseases}
                                onSuggestionsFetchRequested={this.handleDiseaseSuggestionsFetchRequested.bind(this)}
                                onSuggestionsClearRequested={() => {
                                    this.props.dispatch({type: DISEASES_CLEAR_MATCHES})
                                }}
                                placeholder={"Disease"}
                                value={this.state.disease_query}
                                onChange={(event, payload) => {
                                    const {newValue} = payload;
                                    if(newValue.action){
                                        this.props.dispatch({type:DISEASES_CREATE, payload:newValue.value})
                                        this.setState({disease_query:""});
                                    }
                                    else{
                                        this.setState({disease_query:newValue})
                                    }
                                }}
                            />
	                        <AutoSuggest
		                        suggestions={this.props.adminData.diseaseList.matched_diseases.length == 0 ? [{
			                        name: `+ Create ${this.state.pet_type_query}`,
			                        action: "create_new",
			                        value: {name:this.state.pet_type_query}
		                        }] : this.props.adminData.diseaseList.matched_diseases}
		                        onSuggestionsFetchRequested={this.handlePetTypeSuggestionsFetchRequested.bind(this)}
		                        onSuggestionsClearRequested={() => {
			                        this.props.dispatch({type: PET_TYPE_CLEAR_MATCHES})
		                        }}
		                        placeholder={"Pet Type"}
		                        value={this.state.disease_query}
		                        onChange={(event, payload) => {
			                        const {newValue} = payload;
			                        if(newValue.action){
				                        this.props.dispatch({type:PET_TYPE_CREATE, payload:newValue.value})
				                        this.setState({pet_type_query:""});
			                        }
			                        else{
				                        this.setState({pet_type_query:newValue})
			                        }
		                        }}
	                        />
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
                                        <FormControlLabel value="female" control={<Radio color="primary"/>}
                                                          label="Female"/>
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
        </VaccineTmpl>
    }
})

export default connect(store => store)(Index)