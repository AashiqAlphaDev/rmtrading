import React from "react"
import {Typography, IconButton, FormControlLabel, RadioGroup, Radio} from "@material-ui/core"
import withRoot from "../src/withRoot"
import Layout from "./layout";
import {ArrowBackIcon} from "mdi-react"
import Link from "next/link"


let AnnotatedSection = withRoot((theme) => {
	return {
		annotation: {
			marginTop: theme.spacing.unit * 2,
			marginLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
			paddingBottom: theme.spacing.unit * 2,
			flex: 1
		},
		annotationBody: {
			marginTop: theme.spacing.unit * 1,
		},
		annotationDesc: {
			marginTop: theme.spacing.unit * 1,
		},
		_body: {
			marginTop: theme.spacing.unit * 2,
			flex: 2
		}
	}
})(class extends React.Component {
		render() {
			const {title, desc, backButton, classes} = this.props;
			var children = this.props.children;
			return <Layout>
				<div className={classes.annotation}>
					<Layout>
						{
							backButton &&
							<Link href={backButton.url}>
								<IconButton>
									<ArrowBackIcon/>
								</IconButton>
							</Link>
						}
						<Layout direction={"column"} className={classes.annotationBody}>
							<Typography variant="title">
								{title}
							</Typography>
							<Typography color="textSecondary" variant="body1" gutterBottom
							            className={classes.annotationDesc}>
								{desc}
							</Typography>
						</Layout>
					</Layout>
				</div>
				<div className={classes._body}>
					{children}
				</div>

			</Layout>
		}
	}
)
export {
	AnnotatedSection
}