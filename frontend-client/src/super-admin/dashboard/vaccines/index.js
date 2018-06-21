import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, List, ListItem} from "@material-ui/core/index";
import {Link, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import AddVaccine from "./add-vaccine"
import Overview from "./overview"
import Search from "./search"
import ManageVaccine from "./vaccine-manage"
import {connect} from "react-redux"

const sideNavPages = [
	{label: "Add Vaccine", url: "/super-admin/dashboard/vaccines/add-vaccine"},
];

let Index = withStyles((theme) => {
	return {
		...style(theme),
		searchForm: {
			display: "flex",
			flexDirection: "column"
		}
	}
})(class extends React.Component {

	state = {
		query: ""
	}

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/super-admin/dashboard/vaccines");
		}
		if (this.props.location.search) {
			let searchParams = new URLSearchParams(this.props.location.search);
			this.setState({query: searchParams.get("q")})
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>
				<Layout className={classes.leftSection}>
					<Layout direction={"column"} className={classes.staticSection}>
						<Typography variant="title" className={classes.title}>
							Manage Vaccines
						</Typography>
						<form className={classes.searchForm} onSubmit={(e) => {
							e.preventDefault();
							this.props.history.push(`/super-admin/dashboard/vaccines/search?q=${this.state.query}`);
						}}>
							<TextField className={classes.searchField} value={this.state.query} placeholder={"Search"}
							           onChange={(e) => {
								           this.setState({query: e.target.value});
							           }}/>
							<input type={"submit"} style={{display: "none"}}/>
						</form>
						<List>
							{
								sideNavPages.map((item, index) => {
									return <Link key={index} to={item.url}>
										<ListItem button> {item.label} </ListItem>
									</Link>
								})
							}
						</List>
					</Layout>
				</Layout>
				<Layout direction={"column"} className={classes.rightSection}>
					<Switch>
						<Route exact path={"/super-admin/dashboard/vaccines/"} render={(props) => {
							return <Overview {...props} />;
						}}/>
						<Route path={"/super-admin/dashboard/vaccines/add-vaccine"} render={(props) => {
							return <AddVaccine {...props}/>;
						}}/>
						<Route path={"/super-admin/dashboard/vaccines/search"} render={(props) => {
							return <Search {...props}/>;
						}}/>
						<Route exact path={"/super-admin/dashboard/vaccines/:vaccine_id/manage"} render={(props) => {
							return <ManageVaccine {...props} vaccineId={props.match.params.vaccine_id}/>;
						}}/>
					</Switch>
				</Layout>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);