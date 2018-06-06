import React from "react"
import Layout from "./layout";
import {Typography} from "@material-ui/core"
import withRoot from "../src/withRoot"

export default withRoot((theme)=>{
	return {
		label:{
			marginTop:theme.spacing.unit*2,
			marginBottom:theme.spacing.unit*1
		}
	}
})(class extends React.Component{
	render(){
		const {classes} = this.props;
		return <Layout direction={"column"}>
			{
				this.props.label &&
				<Typography variant="caption" className={classes.label}>
					{this.props.label}
				</Typography>
			}
			{this.props.children}
		</Layout>
	}
})