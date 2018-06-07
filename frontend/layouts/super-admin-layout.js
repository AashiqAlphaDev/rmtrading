import React from 'react';
import withRoot from '../src/withRoot';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Button, Typography} from "@material-ui/core";
import Layout from "../components/layout";
import {SUPER_SIGN_OUT_REQUESTED} from "../store/super-admin/auth-actions";
import _ from "underscore"
import Link from "next/link"


const pages = [
	{label: "Manage Vaccines", url: "/super-admin/vaccines"},
	{label: "Manage Vaccination Center", url: "/super-admin/vaccination-centers"},
	{label: "Request", url: "/super-admin/requests"},
	{label: "Inventory", url: "/super-admin/inventory"},
	{label: "Reports", url: "/super-admin/reports"},
];


export default withRoot((theme) => {
	return {
		body: {
			width: "100%",
			height: "100%",
		},
		navButtons: {},
		navButton: {
			margin: theme.spacing.unit * 1
		},
		content: {
			overflow: "scroll"
		}
	}
})(connect(store => store)(
	class extends React.Component {

		constructor(props){
			super(props);
			this.state = {};
		}

		componentDidMount(){
			this.setState({selectedTab:_.findIndex(pages, ({url}) => (this.props.url == url))});
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.adminData.authData && nextProps.adminData.authData.successRedirect) {
				window.location = nextProps.adminData.authData.successRedirect;
			}
		}

		render() {
			const {dispatch, classes} = this.props;
			console.log(this.state)
			return <Layout direction={"column"} className={classes.body}>
				<AppBar color={"inherit"} position={"static"}>
					<Toolbar className={"container"}>
						<Layout className={"flex"}>
							<Link prefetch href={"/super-admin"}>
								<a>
									<Typography variant="title">
										Admin Dashboard
									</Typography>
								</a>
							</Link>
						</Layout>
						<Button onClick={() => {
							dispatch({type: SUPER_SIGN_OUT_REQUESTED})
						}}>Logout</Button>
					</Toolbar>
					<Layout className={"container"}>
						{
							pages.map((page, index) => {
								return <Link href={page.url} key={page.url}>
									<Button className={classes.navButton}
									        color={(index === this.state.selectedTab) ? 'primary' : 'default'}>
										{page.label}
									</Button>
								</Link>
							})
						}
					</Layout>
				</AppBar>
				<Layout direction={"column"} className={`flex`}>
					{this.props.children}
				</Layout>
			</Layout>
		}
	}
	)
)