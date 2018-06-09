import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import {
	Paper,
	Button,
	Typography
} from "@material-ui/core";
import style from "../style"
import VaccineCenterTmpl from "./vaccine-centers-tmpl"
import {AnnotatedSection} from "../../../components/page-layout";
import Layout from "../../../components/layout";
import Link from "next/link"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <VaccineCenterTmpl>
			<AnnotatedSection title={"Upload Vaccination Center"}
			                  descTag={()=>{return <Typography
				                  color="textSecondary"
				                  variant="body1"
				                  gutterBottom>
				                  Upload the vaccinations in CSV format. Download the sample csv from <Link><a>here</a></Link>.
			                  </Typography>}}
			                  backButton={{url: "/super-admin/vaccines"}}>
				<Paper className={classes.paperPage}>
					<Layout direction={"column"}>
						<input
							accept="csv/*"
							className={classes.uploadInput}
							id="flat-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="flat-button-file">
							<Button component="span" className={classes.button}>
								Upload CSV
							</Button>
						</label>
					</Layout>
				</Paper>
			</AnnotatedSection>
		</VaccineCenterTmpl>
	}
})

export default connect(store => store)(Index)