import React from "react"
import Layout from "../../../components/layout";
import {Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import AddVaccine from "./add-vaccine"
import ManageVaccine from "./vaccine-manage"
import OverView from "./overview"

let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/super-admin/dashboard/vaccines");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`} direction={"column"}>
				<Route exact path={"/super-admin/dashboard/vaccines"} render={(props)=>{
					return <OverView {...props} />
				}}/>
				<Route exact path={"/super-admin/dashboard/vaccines/add-vaccine"} render={(props)=>{
					return <AddVaccine {...props} />
				}} />
				<Route exact path={"/super-admin/dashboard/vaccines/:vaccine_id/manage"} render={(props)=>{
					return <ManageVaccine {...props} />
				}} />
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);