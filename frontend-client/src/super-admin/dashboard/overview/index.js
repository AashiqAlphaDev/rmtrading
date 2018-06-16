import React from "react"
import Layout from "../../../components/layout";
import {Typography,List,ListItem} from "@material-ui/core/index";
import {Link, Switch} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"

let Index = withStyles((theme)=>{
	return {
		...style(theme),
	}
})(class extends React.Component {
	render(){
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>
			</Layout>
		</Layout>;
	}
});

export default connect(store=>store)(Index);