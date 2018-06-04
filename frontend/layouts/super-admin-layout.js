import React from 'react';
import withRoot from '../src/withRoot';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Button, Typography, Tabs, Tab} from "@material-ui/core";
import Layout from "../components/layout";
import {SUPER_SIGN_OUT_REQUESTED} from "../store/super-admin/auth-actions";
import _ from "underscore"
import Link from "next/link"


const pages = [
	{label: "Contents", url: "/super-admin/contents"},
	{label: "Collections", url: "/super-admin/collections"},
	{label: "App Data", url: "/super-admin/app-data"},
	{label: "3rd Party", url: "/super-admin/3rd-party"},
	{label: "Settings", url: "/super-admin/settings"},
]


export default (Component, pageProps) => {
	return withRoot((theme) => {
		return {
			body: {
				width: "100%",
				height: "100%",
			},
			navButtons: {},
			navButton: {
				margin: theme.spacing.unit * 1
			}
		}
	})(connect(store => store)(
		class extends React.Component {

			state = {
				selectedTab: pageProps ? _.findIndex(pages, ({url}) => (pageProps.url == url)) : -1
			}

			componentWillReceiveProps(nextProps) {
				if (nextProps.adminData.authData && nextProps.adminData.authData.successRedirect) {
					window.location = nextProps.adminData.authData.successRedirect;
				}
			}

			render() {

				const {dispatch, classes} = this.props;
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
									console.log(index === this.state.selectedTab)
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
					<Layout direction={"column"} className={`flex container`}>
						<Component/>
					</Layout>
				</Layout>
			}
		}
		)
	)
}