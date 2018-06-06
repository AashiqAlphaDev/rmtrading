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
	Typography
} from "@material-ui/core";
import {AnnotatedSection} from "../../../components/page-layout";
import InputContainer from "../../../components/input"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <VaccineTmpl>
			<Layout direction={"column"}>
				<AnnotatedSection title={"Add Vaccine"}
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
							<InputContainer label={"Disease"}>
								<TextField></TextField>
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