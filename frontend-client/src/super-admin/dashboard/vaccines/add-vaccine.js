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
		actions:{
			marginTop:theme.spacing.unit*4,
			marginBottom:theme.spacing.unit*4
		}
	}
})(class extends React.PureComponent{
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
					<InputContainer label={"Type"}>
						<TextField></TextField>
					</InputContainer>
					<Layout>
						<InputContainer label={"City"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"State"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<InputContainer label={"Country"}>
						<TextField></TextField>
					</InputContainer>
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
})