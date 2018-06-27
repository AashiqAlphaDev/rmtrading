import React from "react"
import {Paper, TextField} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import style from "../style";

import {REQUEST_ADD_REQUEST} from "../../../stores/entities/requests/actions";
import {Button} from "@material-ui/core/es/index";
import Layout from "../../../components/layout";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit * 4
		}
	}
})(class extends React.Component {

	state = {
		title: "",
		desc: "",
	};

	render() {
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Request"}
		                         backButton={{url: "/admin/dashboard/pets"}}>

			<Paper className={classes.paperPage}>
				<form onSubmit={(e) => {
					e.preventDefault();
					this.props.dispatch({
						type: REQUEST_ADD_REQUEST,
						payload: {title: this.state.title, desc: this.state.desc, status: "Pending"}
					});

				}}>
					<InputContainer label="Request Title">
						<TextField onChange={(e) => {
							this.setState({title: e.target.value})
						}}/>
					</InputContainer>
					<InputContainer label="Description">
						<TextField onChange={(e) => {
							this.setState({desc: e.target.value})
						}}/>
					</InputContainer>
					<Layout justifyContent={"flex-end"} className={classes.actions}>
						<Button> Clear </Button>
						<Button variant={"raised"} color={"primary"} type={"submit"}> Add </Button>
					</Layout>
				</form>
			</Paper>
		</AnnotatedSection>
	}

});

export default connect(store => store)(Index);