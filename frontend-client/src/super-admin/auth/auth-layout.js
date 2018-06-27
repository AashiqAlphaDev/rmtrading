import React from "react";
import Layout from "../../components/layout";
import {withStyles} from "@material-ui/core/styles"
import {AUTH_CLEAR, CHECK_SUPER_ADMIN} from "../../stores/entities/auth/actions";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux"


let Index = withStyles({
	fullScreen: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
})(class extends React.Component {
	componentDidMount() {
		this.props.dispatch({type: AUTH_CLEAR});
		this.props.dispatch({type: CHECK_SUPER_ADMIN});
	}

	render() {
		const {classes} = this.props;
		if (this.props.auth.hasOwnProperty('superAdminCheckInProgress') && !this.props.auth.superAdminCheckInProgress) {
			if (!this.props.auth.isSuperAdmin) {
				return <div className={classes.fullScreen}>
					<Layout alignItems={"center"} justifyContent={"center"}>
						{this.props.children}
					</Layout>
				</div>
			}
			else {
				return <Redirect to={"/super-admin/dashboard"}/>
			}
		}
		else {
			return <div></div>
		}
	}
});
export default connect(store => store)(Index);