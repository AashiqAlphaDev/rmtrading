import React from "react"
import Layout from "./layout";
import {Typography} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"

const Index = withStyles((theme)=>{
	return {
		_label:{
			marginTop:theme.spacing.unit*2,
			marginBottom:theme.spacing.unit*1,
		},
		container:{
			marginLeft:theme.spacing.unit*1,
			marginRight:theme.spacing.unit*1
		}
	}
})(class extends React.Component{
	render(){
		const {classes} = this.props;
		return <Layout direction={"column"} className={classes.container} flex={1}>
			{
				this.props.label &&
				<Typography variant="caption" className={classes._label}>
					{this.props.label}
				</Typography>
			}
			{this.props.children}
		</Layout>
	}
})

export default Index