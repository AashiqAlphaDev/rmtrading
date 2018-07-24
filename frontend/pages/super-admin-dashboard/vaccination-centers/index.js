import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {vaccinationCenters} from "../../../api/api";
import {Link} from "../../../routes";
import DashboardContainer from "../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button} from "@material-ui/core/index";
import {DeleteIcon, EditIcon} from "../../../components/icons";





let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccinationcenters = await vaccinationCenters(session_id);
        return {vaccinationCenters:vaccinationcenters};

    }


    componentWillMount = () => {


    }

    state = {};


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
        <Layout className={classes.body} direction={"column"}>
            <Layout className={classes.titleContainer} alignItems={"center"} justifyContent={"flex-end"}>
                <Button type={"submit"} variant={"raised"} color={"primary"}>Add Vaccination</Button>
            </Layout>
            <Layout flex={1} direction={"column"}>

            <Layout className={classes.paper}  direction={"column"}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Vaccination Center Name</TableCell>
                        <TableCell>Contact Name	</TableCell>
                        <TableCell>Contact Mobile</TableCell>
                        <TableCell>Contact Email</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.props.vaccinationCenters.docs.map((item) => {
                            return <TableRow>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.contact.name}</TableCell>
                                <TableCell>{item.contact.phNo}</TableCell>
                                <TableCell>{item.contact.email}</TableCell>
                                <TableCell><Layout>
                                    <Layout className={classes.toolsContainer}>
                                    <DeleteIcon size={28}/>
                                    </Layout>
                                    <Layout>
                                    <EditIcon size={28}/>
                                    </Layout>
                                </Layout>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
            </Layout>
            </Layout>


        </Layout>
        </DashboardContainer>
    }
};


const Index = withStyles((theme)=>{
    return {
        body:{
            height:"100%",
            margin:theme.spacing.unit *2
        },
        paper:{
            background:"#fff"
        },
        toolsContainer:{
            marginRight:theme.spacing.unit *2
        },
        titleContainer:{
            marginLeft:theme.spacing.unit * 2,
            marginBottom:theme.spacing.unit *2
        }
    }
})(connect(store=>store)(_Index))
export default Index;