import React from "react"
import {Paper, TextField} from "@material-ui/core/index";
import InputContainer from "../../../components/input"
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import style from "../style";
import {Link, Redirect} from "react-router-dom";
import {REQUEST_GUARDIAN_FETCH} from "../../../stores/pets/actions";
import {Button, Typography} from "@material-ui/core/es/index";
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

	state = {};

	render() {
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Request"}
		                         backButton={{url: "/admin/dashboard/pets"}}>

			<Paper className={classes.paperPage}>
				<form onSubmit={(e) => {
					e.preventDefault();
					this.props.dispatch({type: REQUEST_GUARDIAN_FETCH, payload: {query: this.state.query}});
					console.log({type: REQUEST_GUARDIAN_FETCH, payload: {query: this.state.query}})
				}}>
					<InputContainer label="Gov ID / Mobile No">
						<TextField onChange={(e) => {
							this.setState({query: e.target.value})
						}}/>
					</InputContainer>
					<InputContainer label="Gov ID / Mobile No">
						<TextField onChange={(e) => {
                            this.setState({query: e.target.value})
                        }}/>
					</InputContainer>
					<InputContainer label="Gov ID / Mobile No">
						<TextField onChange={(e) => {
                            this.setState({query: e.target.value})
                        }}/>
					</InputContainer>
					<button style={{display: "none"}} type="submit"></button>
				</form>
			</Paper>
		</AnnotatedSection>
	}

});

export default connect(store => store)(Index);