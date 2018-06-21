import React from "react"
import {Typography, IconButton} from "@material-ui/core"
import Layout from "./layout";
import {ArrowBackIcon} from "mdi-react"
import {Link} from "react-router-dom"
import {withStyles} from "@material-ui/core/styles"


export default withStyles((theme) => {
	return {
		annotationDesc: {
			marginTop: theme.spacing.unit * 1,
		},
		_body: {
			marginTop: theme.spacing.unit * 2,
		}
	}
})(class extends React.Component {
		render() {
			const {title, desc, backButton, classes} = this.props;
			return <Layout direction={"column"} className={this.props.className}>
				<Layout alignItems={"flex-start"}>
					{
						backButton &&
						<Link to={backButton.url}>
							<IconButton>
								<ArrowBackIcon/>
							</IconButton>
						</Link>
					}
					<Layout
						direction={"column"}
						className={classes.annotationBody}>
						<Typography variant="title">
							{title}
						</Typography>
						<Typography
							color="textSecondary"
							variant="body1"
							gutterBottom
							className={classes.annotationDesc}>
							{
								this.props.desc &&
								desc
							}
							{
								this.props.descTag &&
								this.props.descTag()
							}
						</Typography>
					</Layout>
				</Layout>
				<div className={classes._body}>
					{this.props.children}
				</div>
			</Layout>
		}
	}
)