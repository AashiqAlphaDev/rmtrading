import React from "react";
import withRoot from "../src/withRoot";
import Layout from "../components/layout";


export default function (Component) {
	return withRoot({
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
					<Component/>
				</Layout>
			</div>
		}
	})
}