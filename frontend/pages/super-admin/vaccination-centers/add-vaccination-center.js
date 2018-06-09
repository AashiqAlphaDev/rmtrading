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

const Index = withRoot(style)(class extends React.Component {

	state = {
		hospitalType:"Hospital",
        country:"India",
        state:"Karnataka",
        city:"Bangalore",
        centerStatus:"Active"

	};

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
							<InputContainer label={"Vaccination Center Code"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Center Type"}>
								<Select
									value={this.state.hospitalType}
									onChange={(e)=>{this.setState({hospitalType:e.target.value})}}
								>
									<MenuItem value={"Hospital"}>Hospital</MenuItem>
									<MenuItem value={"Pet Clinic"}>Pet Clinic</MenuItem>
									<MenuItem value={"Other"}>Other</MenuItem>
								</Select>
							</InputContainer>
							<InputContainer label={"Country"}>
								<Select
									value={this.state.country}
									onChange={(e)=>{this.setState({country:e.target.value})}}
								>
									<MenuItem value={"India"}>India</MenuItem>
									<MenuItem value={"USA"}>USA</MenuItem>
									<MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
								</Select>
							</InputContainer>
							<InputContainer label={"State"}>
								<Select
									value={this.state.state}
									onChange={(e)=>{this.setState({state:e.target.value})}}
								>
									<MenuItem value={"Karnataka"}>Karnataka</MenuItem>
									<MenuItem value={"Mumbai"}>Mumbai</MenuItem>
									<MenuItem value={"Kerala"}>Kerala</MenuItem>
								</Select>
							</InputContainer>
							<InputContainer label={"City"}>
								<Select
									value={this.state.city}
									onChange={(e)=>{this.setState({city:e.target.value})}}
								>
									<MenuItem value={"Bangalore"}>Bangalore</MenuItem>
									<MenuItem value={"Mysore"}>Mysore</MenuItem>
									<MenuItem value={"Gokarna"}>Gokarna</MenuItem>
								</Select>
							</InputContainer>
							<InputContainer label={"Address"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Zip Code"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Contact Person"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Contact Number"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Center Email"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Center Fax"}>
								<TextField></TextField>
							</InputContainer>
							<InputContainer label={"Center Status"}>
								<Select
									value={this.state.centerStatus}
									onChange={(e)=>{this.setState({centerStatus:e.target.value})}}
								>
									<MenuItem value={"Active"}>Active</MenuItem>
									<MenuItem value={"In active"}>In active</MenuItem>
									<MenuItem value={"Temporarily Out Of Service"}>Temporarily Out Of Service</MenuItem>
								</Select>
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