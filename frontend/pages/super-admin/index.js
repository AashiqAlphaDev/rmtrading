import React from "react";
import AdminLayoutWrapper from "../../layouts/super-admin-layout";
import {connect} from "react-redux";
import Container from "../../components/container";
import withRoot from "../../src/withRoot";
<<<<<<< HEAD
import {
    Typography,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    Card,
    CardContent,
    List, ListItem
} from "@material-ui/core";
import Layout from "../../components/layout";
import Link from "next/link"


const Index = withRoot((theme) => {
    return {
        bodyWrap: {
            display: "flex",
            flexDirection: "column",
            flex: 1
        },
        body: {
            flex: 1,
            overflow: "scroll",
        },
        searchField: {
            padding: theme.spacing.unit,
        },
        pagination: {
            margin: theme.spacing.unit
        },
        pageLink: {
            margin: theme.spacing.unit
        },
        leftSection: {
            margin: theme.spacing.unit,
            width: 300
        },
        rightSection: {
            flex: 1,
            margin: theme.spacing.unit
        },
        staticSection: {
            width: 300,
            position: "fixed"
        },
        title: {
            margin: theme.spacing.unit,
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 2,
        },
        card: {
            minWidth: 275,
            margin: theme.spacing.unit,
            flex:1,
            height:120
        },
        subTitle: {
            margin: theme.spacing.unit,
            marginTop: theme.spacing.unit * 1,
            marginBottom: theme.spacing.unit * 1,

        }

    }
})(class extends React.Component {
    render() {
        const {classes} = this.props;
        return <div className={classes.bodyWrap}>
			<Layout direction={"column"} flex={1} className={`${classes.body}`}>
				<Layout className={"container"}>
					<Layout className={classes.leftSection}>
						<Layout direction={"column"} className={classes.staticSection}>
							<Typography variant="title" className={classes.title}>
								Vaccination Centers
							</Typography>
							<TextField className={classes.searchField} placeholder={"Search"}/>
							<List>
								<ListItem button> Add Vaccine Centers</ListItem>
							</List>
						</Layout>
					</Layout>
					<Layout direction={"column"} className={classes.rightSection}>
						<div>
							<Typography variant="title" className={`${classes.title} flex`}>
								Search Results
							</Typography>
						</div>
                        {/*<Paper>*/}
                        {/*<Table>*/}
                        {/*<TableHead>*/}
                        {/*<TableRow>*/}
                        {/*<TableCell>Center Name</TableCell>*/}
                        {/*<TableCell>Center Code</TableCell>*/}
                        {/*<TableCell>Center Status</TableCell>*/}
                        {/*<TableCell>Center Type</TableCell>*/}
                        {/*<TableCell>Location</TableCell>*/}
                        {/*</TableRow>*/}
                        {/*</TableHead>*/}
                        {/*<TableBody>*/}
                        {/*{*/}
                        {/*[1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {*/}
                        {/*return <TableRow key={index}>*/}
                        {/*<TableCell>Center Name</TableCell>*/}
                        {/*<TableCell>Center Code</TableCell>*/}
                        {/*<TableCell>Center Status</TableCell>*/}
                        {/*<TableCell>Center Type</TableCell>*/}
                        {/*<TableCell>Location</TableCell>*/}
                        {/*</TableRow>*/}

                        {/*})*/}
                        {/*}*/}
                        {/*</TableBody>*/}
                        {/*</Table>*/}
                        {/*</Paper>*/}
						<Layout>
							<Card className={classes.card}>
								<CardContent>
									Vaccination
									<Typography variant="title" className={`${classes.subTitle} flex`}>
										30,000
									</Typography>
								</CardContent>

							</Card>
							<Card className={classes.card}>
								<CardContent>
									Pet Registration
									<Typography variant="title" className={`${classes.subTitle} flex`}>
										3800
									</Typography>
								</CardContent>

							</Card>
							<Card className={classes.card}>
								<CardContent>
									User Activity
									<Typography variant="title" className={`${classes.subTitle} flex`}>
										86,000
									</Typography>

								</CardContent>
							</Card>
						</Layout>
					</Layout>
				</Layout>
			</Layout>
		</div>
    }
})
export default (AdminLayoutWrapper(connect(store => store)(Index)))
=======
import {Typography} from "@material-ui/core";

const Index = withRoot((theme)=>{
	return {
		body: {
			padding:theme.spacing.unit,
			paddingTop:theme.spacing.unit*2
		}
	}
})(({classes}) => (
	<AdminLayoutWrapper>
		<Container className={classes.body}>
			<Typography variant={"subheading"}>
				OverView
			</Typography>
		</Container>
	</AdminLayoutWrapper>
))

export default connect(store => store)(Index)
>>>>>>> 3992f0c0078de11a3def9f6d3b9a05d373bbc49e
