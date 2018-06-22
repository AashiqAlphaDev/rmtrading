import React from "react"

import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import Layout from "../../../components/layout";
import {Button, Paper, TextField} from "@material-ui/core/es/index";
import InputContainer from "../../../components/input"
import AnnotatedSection from "../../../components/annotated-section";




export default withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit * 4
		},
        body:{
            marginTop: theme.spacing.unit * 2
        }
	}
})(class extends React.Component {
	state={
		fieldName:"",
		fieldType:""
	}

	render() {

		const {classes} = this.props;

		return <AnnotatedSection
			title={"Add Biometrics For Pet Type "}
			desc={"Please provide the information to update Biometric Field for pets."}
			backButton={{url: "super-admin/dashboard/application-data/pet-types"}}


			className={classes.body}>
			<Paper className={classes.paperPage}>
				<Layout alignItems={"flex-end"}>
			<InputContainer label={"Field Name"}>
				<TextField onChange={(event) => {
					this.setState({fieldName: event.target.value})
				}}></TextField>
			</InputContainer>
			<InputContainer label={"Field Type"}>
				<TextField onChange={(event) => {
					this.setState({fieldType: event.target.value})
				}}></TextField>
			</InputContainer>

					<Layout justifyContent={"flex-end"} >

						<Button variant={"raised"} color={"primary"} style={{"padding-top":11,"padding-bottom":11}} type={"submit"}> Add </Button>
					</Layout>

				</Layout>
			</Paper>
		</AnnotatedSection>
	}
})