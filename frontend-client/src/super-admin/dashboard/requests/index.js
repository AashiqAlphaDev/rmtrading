import React from "react"
import Layout from "../../../components/layout";
import {Typography,TextField,Paper,Table,TableBody,TableRow,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,IconButton} from "@material-ui/core/index";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"


let Index = withStyles((theme)=>{
    return {
        ...style(theme),
    }
})(class extends React.Component {
    render(){
        const {classes} = this.props;
        return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`}>
				<Layout className={classes.leftSection}>
					<Layout direction={"column"} className={classes.staticSection}>
						<Typography variant="title" className={classes.title}>
							Manage Requests
						</Typography>
						<TextField className={classes.searchField} placeholder={"Search"}/>

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
							<TableBody>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {
                                        return <TableRow key={index}>
											<ExpansionPanel>
												<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
													<Layout direction={"column"}>
														<div>
															Request Type:
														</div>
														<div>
															Request ID:
														</div>
														<div>
															Vaccination Center:
														</div>
														<div>
															Status:
														</div>
													</Layout>
												</ExpansionPanelSummary>

												<ExpansionPanelDetails>
													<Layout style={{justifyContent:'flex-end', flex:1}}>
														<IconButton style={{color: 'green',paddingRight:'10px'}} className={classes.button} aria-label="Add to shopping cart">
															<Done />
														</IconButton>
														<IconButton style={{color: 'red',paddingRight:'10px'}} className={classes.button} aria-label="Add to shopping cart">
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
				</Layout>
			</Layout>
		</Layout>;
    }
});

export default connect(store=>store)(Index);