import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import style from "../style"
import VaccineTmpl from "./vaccines-tmpl"
import Layout from "../../../components/layout";
import {IconButton, Typography} from "@material-ui/core";
import {ArrowBackIcon} from "mdi-react"
import Link from "next/link"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <div>
			<Layout alignItems={"center"}>
				<Link href={"/super-admin/vaccines"}>
					<IconButton>
						<ArrowBackIcon />
					</IconButton>
				</Link>
				<Typography variant="title" className={`${classes.title} flex`}>
					Add Vaccine
				</Typography>
			</Layout>
		</div>
	}
})

export default (VaccineTmpl(connect(store => store)(Index), {url: "/super-admin/vaccines"},))