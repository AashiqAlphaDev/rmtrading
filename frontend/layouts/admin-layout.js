import React from 'react';
import withRoot from '../src/withRoot';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Button, Typography, Tabs, Tab} from "@material-ui/core";
import Layout from "../components/layout";
import {SUPER_SIGN_OUT_REQUESTED} from "../store/super-admin/auth-actions";


export default (Component) => {
	return withRoot({
		body: {
			width: "100%",
			height: "100%",
		}
	})(connect(store => store)(
		class extends React.Component {
			state = {
				selectedTab: 0
			};

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
							<Typography variant="title" className={"flex"}>
								Admin Dashboard
							</Typography>
							<Button onClick={() => {
								dispatch({type: SUPER_SIGN_OUT_REQUESTED})
							}}>Logout</Button>
						</Toolbar>
						<Tabs className={"container"} fullWidth value={this.state.selectedTab}
						      onChange={(event, value) => {
							      this.setState({selectedTab: value})
						      }}>
							<Tab label="Item1"/>
							<Tab label="Item2"/>
							<Tab label="Item3"/>
							<Tab label="Item4"/>
							<Tab label="Item5"/>
							<Tab label="Item6"/>
						</Tabs>
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