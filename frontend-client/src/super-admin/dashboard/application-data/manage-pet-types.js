import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import Layout from "../../../components/layout";
import {
	Button, IconButton, List, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField,
	Typography
} from "@material-ui/core/es/index";
import InputContainer from "../../../components/input"
import AnnotatedSection from "../../../components/annotated-section";

import {
	PET_TYPE_CLEAR_MATCHES, REQUEST_PET_TYPE_FETCH,
	REQUEST_UPDATE_PET_TYPE
} from "../../../stores/pet-types/actions";
import {connect} from "react-redux";


let Index = withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit * 4
		},
		body: {
			marginTop: theme.spacing.unit * 2
		}
	}
})(class extends React.Component {

	state = {
		name: "",
		field_type: ""
	};

	componentWillMount() {
		this.props.dispatch({type: PET_TYPE_CLEAR_MATCHES});
		this.props.dispatch({
			type: REQUEST_PET_TYPE_FETCH,
			payload: {pet_type_id: this.props.match.params.pet_type_id}
		});
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
					<List>
						{

						}
					</List>
					<form onSubmit={(e) => {
						e.preventDefault();
						const {name, field_type} = this.state;
						this.props.dispatch({
							type: REQUEST_UPDATE_PET_TYPE,
							payload: {
								pet_type_id: this.props.match.params.pet_type_id,
								data: {$push: {vaccination_fields: {name, field_type}}}
							}
						})
					}}>
						<InputContainer label={"Field Name"}>
							<TextField onChange={(event) => {
								this.setState({name: event.target.value});
							}}></TextField>
						</InputContainer>
						<InputContainer label={"Field Type"}>
							<Select value={this.state.field_type} onChange={(event) => {
								this.setState({field_type: event.target.value})
							}}>
								<MenuItem value={"Numeric"}>Numeric</MenuItem>
								<MenuItem value={"Boolean"}>Boolean</MenuItem>
								<MenuItem value={"String"}>String</MenuItem>
							</Select>
						</InputContainer>
						<Layout justifyContent={"flex-end"}>
							<Button variant={"raised"} color={"primary"}
							        style={{"padding-top": 11, "padding-bottom": 11}} type={"submit"}> Add </Button>
						</Layout>
					</form>
				</Layout>
			</Paper>
		</AnnotatedSection>


	}
});
export default connect(store => store)(Index)