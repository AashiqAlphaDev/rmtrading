import React from "react"
import Layout from "../../../components/layout";
import {Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import AddCenter from "./add-center"
import ManageCenter from "./vaccination-center-manage"
import EditCenter from "./edit-center"
import OverView from "./overview"

let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/super-admin/dashboard/vet-centers");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`} direction={"column"}>
				<Route exact path={"/super-admin/dashboard/vet-centers"} render={(props)=>{
					return <OverView {...props} />
				}}/>
				<Route exact path={"/super-admin/dashboard/vet-centers/add-center"} render={(props)=>{
					return <AddCenter {...props} />
				}} />
				<Route exact path={"/super-admin/dashboard/vet-centers/:center_id"} render={(props)=>{
					return <EditCenter {...props} />
				}} />
				<Route exact path={"/super-admin/dashboard/vet-centers/:center_id/manage"} render={(props)=>{
					return <ManageCenter {...props} />
				}} />
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);