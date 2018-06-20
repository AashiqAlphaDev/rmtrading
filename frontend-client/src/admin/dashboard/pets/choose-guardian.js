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
		return <AnnotatedSection title={"Add Vaccination Center"}
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
					<button style={{display: "none"}} type="submit"></button>
				</form>
			</Paper>
			{
				this.props.guardianDetail._id &&
				<Paper className={classes.paperPage}>
					<Layout alignItems={"flex-end"}>
						<div className={`flex`}>
							<Typography>{this.props.guardianDetail.profile.first_name}</Typography>
							<Typography>{this.props.guardianDetail.profile.mobile_number}</Typography>
							<Typography>{this.props.guardianDetail.profile.government_issued_id}</Typography>
							<Typography>{this.props.guardianDetail.profile.address}</Typography>
							<Typography>{this.props.guardianDetail.email}</Typography>
						</div>
						<Link to={`/admin/dashboard/pets/${this.props.guardianDetail._id}/add-pet`}>
							<Button>Choose</Button>
						</Link>
					</Layout>
				</Paper>
			}
			{
				this.props.guardianDetail.noMatch &&
				<Redirect to="/admin/dashboard/pets/add-guardian"/>
			}
		</AnnotatedSection>;
	}

});

export default connect(store => store)(Index);