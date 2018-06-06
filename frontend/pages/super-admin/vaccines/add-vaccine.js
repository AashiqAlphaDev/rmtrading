import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import style from "../style"
import VaccineTmpl from "./vaccines-tmpl"
import Layout from "../../../components/layout";
import {IconButton, Typography, TextField, GridList, Button} from "@material-ui/core";
import {ArrowBackIcon} from "mdi-react"
import Link from "next/link"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <Layout direction={"column"}>
			<Layout alignItems={"center"}>
				<Link href={"/super-admin/vaccines"}>
					<IconButton>
						<ArrowBackIcon />
					</IconButton>
				</Link>
				<Typography variant="title" className={`${classes.title} flex`}>
					Add Vaccine
				</Typography>
				<Button variant={"raised"} color={"primary"}> Add </Button>
			</Layout>
			<Layout flex={1} className={classes.page}>
				<GridList cellHeight={50} cols={1}>
					<TextField className={classes.input} placeholder={"Vaccine Name"}></TextField>
					<TextField className={classes.input} placeholder={"Country"}></TextField>
					<TextField className={classes.input} placeholder={"Disease"}></TextField>
					<TextField className={classes.input} placeholder={"Pet"}></TextField>
					<TextField className={classes.input} placeholder={"Gender"}></TextField>
					<TextField className={classes.input} placeholder={"Breed"}></TextField>
				</GridList>
			</Layout>
			<Layout justifyContent={"flex-end"} className={classes.actions}>
				<Button> Clear </Button>
				<Button variant={"raised"} color={"primary"}> Add </Button>
			</Layout>
		</Layout>
	}
})

export default (VaccineTmpl(connect(store => store)(Index), {url: "/super-admin/vaccines"},))