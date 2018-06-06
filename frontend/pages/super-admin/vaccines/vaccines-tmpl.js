import React from "react";
import AdminLayoutWrapper from "../../../layouts/super-admin-layout";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import {
	Typography,
	TextField,
	List,
	ListItem
} from "@material-ui/core";
import Layout from "../../../components/layout";
import style from "../style"
import Link from "next/link"


const Index = (Component)=>{
	return withRoot(style)(class extends React.Component {
		render() {
			const {classes} = this.props;
			return <div className={classes.bodyWrap}>
				<Layout direction={"column"} flex={1} className={`${classes.body}`}>
					<Layout className={"container"}>
						<Layout className={classes.leftSection}>
							<Layout direction={"column"} className={classes.staticSection}>
								<Typography variant="title" className={classes.title}>
									Manage Vaccines
								</Typography>
								<TextField className={classes.searchField} placeholder={"Search"}/>
								<List>
									<Link href={"/super-admin/vaccines/add-vaccine"}>
										<ListItem button> Add Vaccine </ListItem>
									</Link>
									<Link href={"/super-admin/vaccines/upload-vaccine"}>
										<ListItem button> Upload Vaccines </ListItem>
									</Link>
									<Link href={"/super-admin/vaccines/download-vaccine"}>
										<ListItem button> Download Vaccines </ListItem>
									</Link>
								</List>
							</Layout>
						</Layout>
						<Layout direction={"column"} className={classes.rightSection}>
							<Component />
						</Layout>
					</Layout>
				</Layout>
			</div>
		}
	})
}

export default (Component)=>(AdminLayoutWrapper(connect(store => store)(Index(Component)), {url: "/super-admin/vaccines"}))