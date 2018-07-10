import React from "react"
import Layout from "../layout";
import {Typography, Paper} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";

let _AuthContainer = ({children, classes}) => {
	return <Layout flex={1} className={classes.body}>
		<Layout flex={1}>
			<Layout direction={"column"} justifyContent={"center"} className={classes.titleContainer}>
				<Typography variant={"display3"} gutterBottom>
					<span className={classes.title}>
						<span>Every pet </span>
						<span className={classes.titleHighlight}>deserves </span>
						<span>a celebrity</span>
						<span className={classes.titleHighlight}> care !</span>
					</span>
				</Typography>
				<Typography variant={"title"}>
					<span className={classes.subTitle}>
						Getting started is only a few clicks away.
					</span>
				</Typography>
			</Layout>
		</Layout>
		<Layout className={classes.paper}>
			{children}
		</Layout>
	</Layout>
}

let AuthContainer = withStyles((theme) => {
	return {
		body: {
			backgroundColor: theme.palette.primary.dark
		},
		container: {
			width: 480
		},
		titleContainer: {
			padding: theme.spacing.unit * 4,
		},
		title: {
			color: "rgba(255, 255, 255, 0.7)"
		},
		subTitle: {
			color: "rgb(255, 255, 255)"
		},
		titleHighlight: {
			color: "#FFF"
		},
		content: {
			width: 350
		},
		paper: {
			minWidth:500,
			padding: theme.spacing.unit * 4,
			display: "flex",
			background: "#FFF"
		}
	}
})(_AuthContainer)

export default AuthContainer