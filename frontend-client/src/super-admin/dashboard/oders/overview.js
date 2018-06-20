import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {Typography, Paper} from "@material-ui/core/index";

export default withStyles((theme) => {
	return {
		...style(theme),
		body: {
			marginLeft: theme.spacing.unit * 2,
			display: "flex",
			flexDirection: "column"
		},
		title: {
			background: "#e6ecf0",
			width: "100%",
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 2,
		},

		segment: {
			marginBottom: theme.spacing.unit * 3,
			padding: theme.spacing.unit * 1
		}
	}
})(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <div className={classes.body}>
			<Typography variant="title" gutterBottom className={classes.title}>
				20 Vaccination Centers around 10 countries.
			</Typography>
			<Typography variant="body1" gutterBottom>
				Sample
			</Typography>
			<Paper className={classes.segment} elevation={0}>
				Sample
			</Paper>
		</div>;
	}
})