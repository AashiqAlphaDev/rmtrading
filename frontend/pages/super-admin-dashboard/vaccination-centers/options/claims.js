import React from "react"
import Layout from "../../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../../../routes";
import DashboardContainer from "../../../../components/super-admin-dashboard/index";
import {removeListener,addListener} from "./redux";
import {Router} from "../../../../routes"
import {claimCenters} from "../../../../api/api";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent, TextField,IconButton} from "@material-ui/core/index";
import InputContainer from "../../../../components/input";
import {DeleteIcon, EditIcon} from "../../../../components/icons";
import uuidv1 from 'uuid/v1';
import {claimCommands, claimEvents} from "../../../../store/domain/claim";
import {vaccinationCenterCommands, vaccinationCenterEvents} from "../../../../store/domain/vaccination-center";







let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {

        let claims = await claimCenters(session_id);
        return {claims:claims};



    }


    componentWillMount = () => {
        console.log(this.props.claims);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {


        if (type === claimEvents.DELETE_CLAIM_SUCCEEDED && payload.callbackId === this.state.deleteClaimCallbackId) {
            Router.pushRoute(this.props.router.asPath);
        }


        if (type === vaccinationCenterEvents.ADD_VACCINATION_CENTER_ADMIN_SUCCEEDED && payload.callbackId === this.state.addAdminCallBackId) {

            this.setState({showAddAdminDialog:false})
            Router.pushRoute(this.props.router.asPath);
        }
    }


    state = {showAddAdminDialog:false};


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout className={classes.body} direction={"column"}>
                <Layout flex={1} direction={"column"}>

                    <Layout className={classes.paper}  direction={"column"}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vaccination Center Name</TableCell>
                                    <TableCell>Name	</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    this.props.claims.map((item) => {
                                        return <TableRow>
                                            <TableCell>{item.data.vet_center}</TableCell>
                                            <TableCell>{item.claimerDetails.name}</TableCell>
                                            <TableCell>{item.claimerDetails.mobile}</TableCell>
                                            <TableCell>{item.claimerDetails.email}</TableCell>
                                            <TableCell><Layout>
                                                <Layout className={classes.toolsContainer}>
                                                    <IconButton onClick={()=>{
                                                        let uid = uuidv1();
                                                        this.setState({deleteClaimCallbackId:uid});
                                                        this.props.dispatch({type:claimCommands.DELETE_CLAIM,payload:{callbackId:uid,claimId:item._id}})
                                                    }}>
                                                        <DeleteIcon size={28}/>
                                                    </IconButton>
                                                </Layout>
                                                <Layout>
                                                    <IconButton onClick={()=>{
                                                        this.setState({selectedClaim:item,showAddAdminDialog:true})

                                                    }}>

                                                        <EditIcon size={28}/>

                                                    </IconButton>
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

                <Dialog
                    open={this.state.showAddAdminDialog}
                    onClose={() => {
                        this.setState({showAddAdminDialog: false})
                    }}
                >
                    <DialogContent>
                        <form style={{display: "flex"}} onSubmit={(e) => {
                            e.preventDefault();
                            let uid = uuidv1();
                            this.setState({addAdminCallBackId:uid});
                            this.props.dispatch({type:vaccinationCenterCommands.ADD_VACCINATION_CENTER_ADMIN,payload:{center_id:this.state.selectedClaim.center_id,callbackId:uid,data:{email:this.state.email}}})
                            this.props.dispatch({type:claimCommands.DELETE_CLAIM,payload:{callbackId:uid,claimId:this.state.selectedClaim._id}})
                        }}>
                            <Layout direction={"column"}>
                                <Typography variant={"title"} gutterBottom>
                                    Add An Admin
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Provide necessary information to Add an admin
                                </Typography>
                                <Layout direction={"column"}>
                                    <InputContainer label={"Admin Email"}>
                                        <TextField
                                            value={this.state.email|| ''}
                                            onChange={(e) => {
                                                let email = e.target.value;
                                                this.setState((state) => (state.email = email, state))
                                            }}
                                            placeholder={"Admin Email"}
                                        />
                                    </InputContainer>
                                </Layout>
                                <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                    <Button className={classes.formAction}>Cancel</Button>
                                    <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Register</Button>
                                </Layout>
                            </Layout>
                        </form>
                    </DialogContent>
                </Dialog>


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
        topButton:{
          marginRight:theme.spacing.unit*2
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
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
    }
})(connect(store=>store)(_Index))
export default Index;