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
		return <AnnotatedSection title={"Add Vaccine "}
		                         desc={"Please provide the information to register a Vaccine."}
		                         backButton={{url: "/super-admin/dashboard/vet-centers"}}>
			<Paper className={classes.paperPage}>
				<Layout direction={"column"}>
					<InputContainer label={"Vaccine Name"}>
						<TextField></TextField>
					</InputContainer>
					<InputContainer label={"Related Disease"}>
						<TextField></TextField>
					</InputContainer>
					<Layout>
						<InputContainer label={"Pet-type"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"Breed"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<Layout>
						<InputContainer label={"Country"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"Gender"}>
							<TextField></TextField>
						</InputContainer>
					</Layout>
					<InputContainer label={"Remarks"}>
						<TextField></TextField>
					</InputContainer>
					<Layout>
						<InputContainer label={"Child Schedule"}>
							<TextField></TextField>
						</InputContainer>
						<InputContainer label={"Adult Schedule"}>
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