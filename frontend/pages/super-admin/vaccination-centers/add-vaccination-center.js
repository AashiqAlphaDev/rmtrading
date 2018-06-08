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
		hospitalType:"Hospital"
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