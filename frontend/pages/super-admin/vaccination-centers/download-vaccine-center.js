import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import {
	Typography,
	Paper
} from "@material-ui/core";
import style from "../style"
import VaccineCenterTmpl from "./vaccine-centers-tmpl"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <VaccineCenterTmpl>
			<div>
			<div>
				<Typography variant="title" className={`${classes.title} flex`}>
					Search Results
				</Typography>
			</div>
			<Paper>
				q
			</Paper>
		</div>
		</VaccineCenterTmpl>
	}
})

export default connect(store => store)(Index)