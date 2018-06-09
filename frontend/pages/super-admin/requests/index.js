import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import Layout from "../../../components/layout"
import {
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    IconButton



} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';


import style from "../style"
import RequestTmpl from "./request-tmpl"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <RequestTmpl>
			<div>
				<Typography variant="title" className={`${classes.title} flex`}>
					Search Results
				</Typography>
			</div>
			<Paper>
				<Table>
					<TableBody>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {
                                return <TableRow key={index}>
									<ExpansionPanel>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
											<Layout direction="column">

												<div>
													Request Type:
												</div>>
													Request ID:
													Vaccination Center:
													Status:



											</Layout>
										</ExpansionPanelSummary>

										<ExpansionPanelDetails>
											<Layout justifyContent={"flex-end"}>
												<IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
													<Done />
												</IconButton>
												<IconButton color="red" className={classes.button} aria-label="Add to shopping cart">
													<Close />
												</IconButton>


											</Layout>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								</TableRow>
                            })
                        }
					</TableBody>
				</Table>

			</Paper>
		</RequestTmpl>
	}
})

export default connect(store => store)(Index)