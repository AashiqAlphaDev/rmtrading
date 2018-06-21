import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField,Button, List, ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import AddCenter from "./add-center"
import Overview from "./overview"
import VaccinationCenterManage from "./vaccination-center-manage"
import {connect} from "react-redux"


const sideNavPages = [
	{label: "Add Vet Center", url: "/super-admin/dashboard/vet-centers/add-center"},
];

let Index = withStyles((theme) => {
	return {
		...style(theme),
	}
})(class extends React.Component {
	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/super-admin/dashboard/pets");
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>

			<Layout className={`container ${classes.flex}`} direction={"column"}>

				<Layout>

                    <Typography style={{flex:1}}variant="title" className={classes.title}>
                    Manage Vet Centers
                    </Typography>

					<TextField className={classes.searchField} placeholder={"Search"}/>
					<Layout justifyContent={"flex-end"} className={classes.actions}>
						<Link  to={"/super-admin/dashboard/vet-centers/add-center"}>
						<Button variant={"raised"} color={"primary"} type={"submit"}> + Add </Button>
						</Link>
					</Layout>
				</Layout>

				{/*<Layout className={classes.leftSection}>*/}
					{/*<Layout direction={"column"} className={classes.staticSection}>*/}
						{/*<Typography variant="title" className={classes.title}>*/}
							{/*Manage Vet Centers*/}
						{/*</Typography>*/}

						{/*<List>*/}
							{/*{*/}
								{/*sideNavPages.map((item, index) => {*/}
									return
										{/*<ListItem button> {item.label} </ListItem>*/}

								{/*})*/}
							{/*}*/}
						{/*</List>*/}
					{/*</Layout>*/}
				{/*</Layout>*/}



				{/*<Layout direction={"column"} className={classes.rightSection}>*/}
					{/*<Switch>*/}
						{/*<Route exact path={"/super-admin/dashboard/vet-centers"} render={(props) => {*/}
							{/*return <Overview location={props.location}/>;*/}
						{/*}}/>*/}
						{/*<Route path={"/super-admin/dashboard/vet-centers/add-center"} render={(props) => {*/}
							{/*return <AddCenter location={props.location}/>;*/}
						{/*}}/>*/}
						{/*<Route exact path={"/super-admin/dashboard/vet-centers/:center_id/manage"} render={(props) => {*/}
							{/*return <VaccinationCenterManage location={props.location}*/}
							                                {/*centerId={props.match.params.center_id}/>;*/}
						{/*}}/>*/}
					{/*</Switch>*/}
				{/*</Layout>*/}
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);