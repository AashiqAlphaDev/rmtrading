import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {vaccinationCenters} from "../../../api/api";
import {Link} from "../../../routes";
import DashboardContainer from "../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent, TextField,IconButton} from "@material-ui/core/index";
import {DeleteIcon, EditIcon} from "../../../components/icons";
import InputContainer from "../../../components/input";
import {vaccinationCenterCommands, vaccinationCenterEvents} from "../../../store/domain/vaccination-center";
import {removeListener,addListener} from "./redux";
import uuidv1 from 'uuid/v1';
import {Router} from "../../../routes"







let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccinationcenters = await vaccinationCenters(session_id);
        return {vaccinationCenters:vaccinationcenters};

    }


    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === vaccinationCenterEvents.ADD_VACCINATION_CENTER_SUCCEEDED && payload.callbackId === this.state.addVaccinationCallbackId) {
            this.state.showRegisterVaccinationCenterDialogue= false;
            Router.pushRoute(this.props.router.asPath)
        }
        if (type === vaccinationCenterEvents.DELETE_VACCINATION_CENTER_SUCCEEDED && payload.callbackId === this.state.deleteVaccinationCallbackId) {
            Router.pushRoute(this.props.router.asPath)
        }



    }


    state = {vaccinationCenterData:{contact:{},address:{}},showRegisterVaccinationCenterDialogue:false};


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
        <Layout className={classes.body} direction={"column"}>
            <Layout className={classes.titleContainer} alignItems={"center"} justifyContent={"flex-end"}>
                <Button type={"submit"} variant={"raised"} color={"primary"}  className={classes.topButton} onClick={()=>{
                    Router.pushRoute('/super-admin-dashboard/vaccination-centers/options/claims')
                }}>View Claims</Button>
                <Button type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                    this.setState({showRegisterVaccinationCenterDialogue:true})
                }}> + Add Center</Button>
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
                                        <IconButton onClick={()=>{
                                            let uid = uuidv1();
                                            this.setState({deleteVaccinationCallbackId:uid});
                                            this.props.dispatch({type:vaccinationCenterCommands.DELETE_VACCINATION_CENTER,payload:{callbackId:uid,data:item._id}})
                                        }}>
                                    <DeleteIcon size={28}/>
                                        </IconButton>
                                    </Layout>
                                    <Layout>
                                        <IconButton onClick={()=>{
                                            Router.pushRoute(`/super-admin-dashboard/vaccination-centers/${item._id}`)
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
                open={this.state.showRegisterVaccinationCenterDialogue}
                onClose={() => {
                    this.setState({showRegisterVaccinationCenterDialogue: false})
                }}
            >
                <DialogContent>
                    <form style={{display: "flex"}} onSubmit={(e) => {
                        e.preventDefault();
                        let uid = uuidv1();
                        this.setState({addVaccinationCallbackId:uid});
                        this.props.dispatch({type:vaccinationCenterCommands.ADD_VACCINATION_CENTER,payload:{callbackId:uid,data:this.state.vaccinationCenterData}})
                    }}>
                        <Layout direction={"column"}>
                            <Typography variant={"title"} gutterBottom>
                                New Vaccination Center Details
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Provide necessary information to register a Vaccination Center.
                            </Typography>
                            <Layout direction={"column"}>
                                <InputContainer label={"Vaccination Center Name"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.name|| ''}
                                        onChange={(e) => {
                                            let name = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.name = name, state))
                                        }}
                                        placeholder={"Vaccination Center Name"}
                                    />
                                </InputContainer>
                                    <Layout>
                                <InputContainer label={"Country"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.address.country|| ''}
                                        onChange={(e) => {
                                            let country = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.address.country = country, state))
                                        }}
                                        placeholder={"Country"}
                                    />
                                </InputContainer>
                                <InputContainer label={"State"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.address.state|| ''}
                                        onChange={(e) => {
                                            let states = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.address.state = states, state))
                                        }}
                                        placeholder={"State"}
                                    />
                                </InputContainer>
                                    </Layout>

                                <InputContainer label={"Address"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.address.address|| ''}
                                        onChange={(e) => {
                                            let address = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.address.address = address, state))
                                        }}
                                        placeholder={"Address"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Address Line 2"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.address.address2|| ''}
                                        onChange={(e) => {
                                            let address2 = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.address.address2 = address2, state))
                                        }}
                                        placeholder={"Address Line 2"}
                                    />
                                </InputContainer>
                                <Layout>
                                <InputContainer label={"City"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.address.city|| ''}
                                        onChange={(e) => {
                                            let city = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.address.city = city, state))
                                        }}
                                        placeholder={"City"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Zip Code"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.address.zip_code|| ''}
                                        onChange={(e) => {
                                            let zip_code = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.address.zip_code = zip_code, state))
                                        }}
                                        placeholder={"Zip Code"}
                                    />
                                </InputContainer>
                                </Layout>
                                <InputContainer label={"Contact Person"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.contact.name|| ''}
                                        onChange={(e) => {
                                            let name = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.contact.name = name, state))
                                        }}
                                        placeholder={"Contact Person"}
                                    />
                                </InputContainer>
                                <Layout>
                                <InputContainer label={"Center Number"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.contact.phNo|| ''}
                                        onChange={(e) => {
                                            let phNo = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.contact.phNo = phNo, state))
                                        }}
                                        placeholder={"Center Number"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Center Fax"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.contact.fax|| ''}
                                        onChange={(e) => {
                                            let fax = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.contact.fax = fax, state))
                                        }}
                                        placeholder={"Center Fax"}
                                    />
                                </InputContainer>
                                </Layout>
                                <InputContainer label={"Center Email"}>
                                    <TextField
                                        value={this.state.vaccinationCenterData.contact.email|| ''}
                                        onChange={(e) => {
                                            let email = e.target.value;
                                            this.setState((state) => (state.vaccinationCenterData.contact.email = email, state))
                                        }}
                                        placeholder={"Center Email"}
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