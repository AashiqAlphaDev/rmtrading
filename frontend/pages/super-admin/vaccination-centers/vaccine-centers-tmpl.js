import React from "react";
import Layout from "../../../components/layout";
import AdminLayoutWrapper from "../../../layouts/super-admin-layout";
import withRoot from "../../../src/withRoot"
import {connect} from "react-redux";
import {Typography, TextField, List, ListItem} from "@material-ui/core";
import style from "../style";
import Link from "next/link";


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <AdminLayoutWrapper url={"/super-admin/vaccines"}>
		<div className={classes.bodyWrap}>
				<Layout direction={"column"} flex={1} className={`${classes.body}`}>
					<Layout className={`container ${classes.flex}`}>
						<Layout className={classes.leftSection}>
							<Layout direction={"column"} className={classes.staticSection}>
								<Typography variant="title" className={classes.title}>
									Manage Vaccination Centers
								</Typography>
								<TextField className={classes.searchField} placeholder={"Search"}/>
								<List>
									<Link href={"/super-admin/vaccination-centers/add-vaccination-center"}>
										<ListItem button> Add Vaccination Center </ListItem>
									</Link>
								</List>
							</Layout>
						</Layout>
						<Layout direction={"column"} className={classes.rightSection}>
							{this.props.children}
						</Layout>
					</Layout>
				</Layout>
			</div>
		</AdminLayoutWrapper>
	}
});

export default connect(store => store)(Index);