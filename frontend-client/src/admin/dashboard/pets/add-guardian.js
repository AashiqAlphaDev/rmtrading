import React from "react"
import {Paper,TextField,Button,Typography} from "@material-ui/core/index";
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
	};

	handleCountrySuggestionsFetchRequested(event){
		this.props.dispatch({type:QUERY_COUNTRIES, payload:{query:event.value}});
	}




	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccination Center"}
		                         backButton={{url: "/super-admin/dashboard/pets"}}>
			<Paper className={classes.paperPage}>
				<form onSubmit={(e)=>{
					e.preventDefault();
					if(!this.state.selectedState || !this.state.selectedCountry){
						return;
					}
					let gaurdianData = {
                        email:this.state,
                        email_verified:Boolean,
                        profile:{
                            first_name:this.state.name,
                            address:this.state.address + this.state.address2,
                            mobile_number:this.state.mobile_number,
                            government_issued_id_type:this.state.government_issued_id_type,
                            government_issued_id:this.state.government_issued_id
                        }
					};
					this.props.dispatch({type:REQUEST_ADD_VET_CENTER, payload:gaurdianData})
				}}>
				<Layout direction={"column"}>
					<Typography variant="subheading"  className={classes.title}>
						Garudian Details
					</Typography>
					<InputContainer label={"Gaurdian Name"}>
						<TextField onChange={(e)=>{this.setState({name:e.target.value})}}/>
					</InputContainer>
					<InputContainer label={"Gaurdian number"}>
						<TextField onChange={(e)=>{this.setState({mobile_number:e.target.value})}}/>
					</InputContainer>

					<InputContainer label={"Gaurdian Email"}>
						<TextField onChange={(e)=>{this.setState({name:e.target.value})}}/>
					</InputContainer>

						<InputContainer label={"City"}>
							<TextField onChange={(event)=>{
								this.setState({city:event.target.value})
							}}></TextField>
						</InputContainer>
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
					<Layout>
					<InputContainer label={"Goverment ID Type"}>
						<TextField onChange={(event)=>{
                            this.setState({government_issued_id_type:event.target.value})
                        }}></TextField>
					</InputContainer>
					<InputContainer label={"Goverment ID No"}>
						<TextField onChange={(event)=>{
                            this.setState({government_issued_id:event.target.value})
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
		</AnnotatedSection>;
	}

});

export default connect(store=>store)(Index);