import React from "react"
import {Paper,TextField,Button} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import Layout from "../../../components/layout";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";

export default withStyles((theme)=>{
	return {
		...style(theme),
	}
})(class extends React.Component{
	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccination Center"}
		                         desc={"Please provide the information to register Vaccination Center."}
		                         backButton={{url: "/super-admin/dashboard/vet-centers"}}>
			<Paper className={classes.paperPage}>
				<Layout direction={"column"}>
					<InputContainer label={"Vaccination Center Name"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Vaccination Center Code"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Center Type"}>

					</InputContainer>
					<InputContainer label={"Country"}>

					</InputContainer>
					<InputContainer label={"State"}>

					</InputContainer>
					<InputContainer label={"City"}>

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
					<InputContainer label={"Center Email"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Center Fax"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Center Email"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Center Fax"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Center Email"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Center Fax"}>
						<TextField></TextField>
					</InputContainer>


					<Layout justifyContent={"flex-end"}>
						<Button> Clear </Button>
						<Button variant={"raised"} color={"primary"}> Add </Button>
					</Layout>
				</Layout>
			</Paper>
		</AnnotatedSection>;
	}
})