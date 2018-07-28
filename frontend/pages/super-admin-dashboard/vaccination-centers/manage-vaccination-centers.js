import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {vaccinationCenterAdmins, vaccinationCenterDetail} from "../../../api/api";
import {Link} from "../../../routes";
import DashboardContainer from "../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent, TextField,IconButton} from "@material-ui/core/index";
import {DeleteIcon, EditIcon, VetCenterIcon} from "../../../components/icons";
import InputContainer from "../../../components/input";
import {vaccinationCenterCommands, vaccinationCenterEvents} from "../../../store/domain/vaccination-center";
import {removeListener,addListener} from "./redux";
import uuidv1 from 'uuid/v1';
import {Router} from "../../../routes"
import _ from "underscore"







let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccinationcenter = await vaccinationCenterDetail(query.center_id);


        let vaccinationcenteradmins = await vaccinationCenterAdmins(query.center_id);

        return {vaccinationCenters:vaccinationcenter,vaccinationCenterAdmins:vaccinationcenteradmins};
    }


    componentWillMount = () => {
        console.log(this.props.vaccinationCenterAdmins)
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === vaccinationCenterEvents.ADD_VACCINATION_CENTER_ADMIN_SUCCEEDED && payload.callbackId === this.state.addAdminCallBackId) {
            this.setState({showAddAdminDialog:false})
            Router.pushRoute(this.props.router.asPath)
        }

    }


    state = {showAddAdminDialog:false};


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
        <Layout className={classes.body} direction={"column"}>
            <Layout className={classes.titleContainer} alignItems={"center"} justifyContent={"flex-end"}>

            </Layout>
            <Layout flex={1} direction={"column"}>

            <Layout   direction={"column"}>
                <Layout className={classes.topPaper} key={this.props.vaccinationCenters._id}>
                    <Layout direction={"column"} flex={1}>
                        <Layout>
                            <VetCenterIcon size={150}/>
                            <Layout direction={"column"} justifyContent={"center"} flex={1}>
                                <Typography variant={"body1"} gutterBottom>
                                    Center Name : {this.props.vaccinationCenters.name}
                                </Typography>

                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Contact Name : {this.props.vaccinationCenters.contact.name}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Contact Phone : {this.props.vaccinationCenters.contact.phNo}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Contact Email : {this.props.vaccinationCenters.contact.email}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Contact Fax : {this.props.vaccinationCenters.contact.fax}
                                </Typography>
                            </Layout>
                            <Layout alignItems={"flex-end"} justifyContent={"center"}
                                    direction={"column"}>
                                <Typography variant={"body1"} gutterBottom>
                                    City : {this.props.vaccinationCenters.address.city}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Address : {this.props.vaccinationCenters.address.address}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Zip Code : {this.props.vaccinationCenters.address.zip_code}
                                </Typography>

                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>

                <Layout className={classes.paper} key={this.props.vaccinationCenters._id}>
                    <Layout direction={"column"} flex={1} className={classes.leftSection}>
                        <Typography variant={"title"} gutterBottom>
                           Manage Admins
                        </Typography>
                        <Button variant={"raised"} color={"primary"} onClick={()=>{this.setState({showAddAdminDialog:true})}}>+ Add Admin</Button>
                    </Layout>

                    <Layout direction={"column"} flex={4}>
                        {
                            !_.isEmpty(this.props.vaccinationCenterAdmins) &&
                                <Layout direction={"column"}>
                            <Typography variant={"title"} gutterBottom>
                                Vaccination Center Admins
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                           These are the current Admins for the vaccination Center {this.props.vaccinationCenters.name} .
                            </Typography>

                                    {
                                        this.props.vaccinationCenterAdmins.map((item)=>{
                                            return  <Typography variant={"body1"} gutterBottom key={item._id}>
                                                {item.email}
                                            </Typography>
                                        })
                                    }

                                </Layout>
                        }
                        {
                            _.isEmpty(this.props.vaccinationCenterAdmins) &&
                            <Layout direction={"column"}>
                                <Typography variant={"title"} gutterBottom>
                                    Oops !
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    There seems to be no admins for The vaccination center {this.props.vaccinationCenters.name} .Please add One.
                                </Typography>

                            </Layout>
                        }

                    </Layout>
                </Layout>
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
                    this.props.dispatch({type:vaccinationCenterCommands.ADD_VACCINATION_CENTER_ADMIN,payload:{center_id:this.props.vaccinationCenters._id,callbackId:uid,data:{email:this.state.email}}})
                }}>
                    <Layout direction={"column"}>
                        <Typography variant={"title"} gutterBottom>
                            Add An Admin
                        </Typography>
                        <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                            Provide necessary information to Add an admin to {this.props.vaccinationCenters.name} .
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
        paper:{
            padding:theme.spacing.unit *2 ,
            background:"#fff",
            minHeight:180
        },
        topPaper:{
            marginBottom:theme.spacing.unit *2,
            padding:theme.spacing.unit *2 ,
            background:"#fff"
        },
        leftSection:{
          marginRight:theme.spacing.unit *5
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