import React from "react";
import AdminLayoutWrapper from "../../layouts/super-admin-layout";
import {connect} from "react-redux";
import withRoot from "../../src/withRoot";
import style from "./app-style"
import {
	Typography,
	TextField,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	List,
	ListItem
} from "@material-ui/core";
import Layout from "../../components/layout";


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <div className={classes.bodyWrap}>
			<Layout direction={"column"} flex={1} className={`${classes.body}`}>
				<Layout className={"container"}>
					<Layout className={classes.leftSection}>
						<Layout direction={"column"} className={classes.staticSection}>
							<Typography variant="title" className={classes.title}>
								Inventory Management
							</Typography>
							<TextField className={classes.searchField} placeholder={"Search"}/>
							<List>
								<ListItem button> Add Vaccine </ListItem>
								<ListItem button> Upload Vaccines </ListItem>
								<ListItem button> Download Vaccines </ListItem>
							</List>
						</Layout>
					</Layout>
					<Layout direction={"column"} className={classes.rightSection}>
						<div>
							<Typography variant="title" className={`${classes.title} flex`}>
								Search Results
							</Typography>
						</div>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Vaccine</TableCell>
										<TableCell>Disease</TableCell>
										<TableCell>Country</TableCell>
										<TableCell>Pet</TableCell>
										<TableCell>Breed</TableCell>
										<TableCell>Gender</TableCell>
										<TableCell>Notes</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										[1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {
											return <TableRow key={index}>
												<TableCell>Vaccine</TableCell>
												<TableCell>Disease</TableCell>
												<TableCell >Country</TableCell>
												<TableCell >Pet</TableCell>
												<TableCell >Breed</TableCell>
												<TableCell >Gender</TableCell>
												<TableCell >Notes</TableCell>
											</TableRow>
										})
									}
								</TableBody>
							</Table>
						</Paper>
					</Layout>
				</Layout>
			</Layout>
		</div>
	}
})

export default (AdminLayoutWrapper(connect(store => store)(Index), {url: "/super-admin/inventory"},))