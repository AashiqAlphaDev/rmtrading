import React from "react";
import Layout from "../../components/layout";
import {withStyles} from "@material-ui/core/styles"



export default withStyles({
	fullScreen: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
})(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <div className={classes.fullScreen}>
			<Layout alignItems={"center"} justifyContent={"center"}>
				{this.props.children}
			</Layout>
		</div>
	}
})
