import React from "react"
import {PetsWrap} from "./index";
import {withRouter} from "next/router"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux"
import {Router} from "../../../routes"
import {Link} from "../../../routes"
import {petDetails, visitDetails, petTypeDetails, vaccinationDetails} from "../../../api/api";
import InputContainer from "../../../components/input";
import {TextField,Button,Typography,Table, TableBody, TableCell, TableHead, TableRow,Dialog,DialogContent} from "@material-ui/core/index";
import moment from "moment"
import {vaccinationCommands,vaccinationEvents} from "../../../store/domain/vaccination";
import uuidv1 from 'uuid/v1';
import {addListener, removeListener} from "./redux";
import {visitCommands as visitCommand, visitEvents} from "../../../store/domain/visit";
import _ from "underscore"







let _Index =  class extends React.Component{

    static async getInitialProps ({query, session_id}) {

         let petdetails = await petDetails(session_id, query.pet_id);
        let pettypedetails = await petTypeDetails(session_id,petdetails.pet_type);
        let vaccinationdetails = await vaccinationDetails(session_id, query.pet_id);
        let visitdetails = await visitDetails(session_id,query.pet_id,query.visit_id);
         return {petDetails:petdetails,vaccinationDetails:vaccinationdetails,petTypeDetails:pettypedetails,visitDetails:visitdetails};

    }


    componentWillMount = () => {
        addListener(this)
        console.log(this.props.visitDetails)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === vaccinationEvents.UPDATE_VACCINATION_SUCCEEDED && payload.callbackId === this.state.updateVaccinationCallbackId) {
            this.setState({showVaccinateDialogue: false});
            Router.pushRoute(this.props.router.asPath);
        }
        if (type === vaccinationEvents.UPDATE_VACCINATION_FAILED && payload.callbackId === this.state.updateVaccinationCallbackId) {
            this.setState({error: payload.response.message});
        }
         if (type === visitEvents.UPDATE_VISIT_SUCCEEDED && payload.callbackId === this.state.updateVisitCallbackId) {
            Router.pushRoute(this.props.router.asPath);
        }
        if (type === visitEvents.UPDATE_VISIT_FAILED && payload.callbackId === this.state.updateVisitCallbackId) {
            this.setState({error: payload.response.message});
        }

        if (type === visitEvents.UPDATE_VISIT_SUCCEEDED && payload.callbackId === this.state.updateRecordsCallbackId) {
            this.setState({showRecordsDialogue: false});
            Router.pushRoute(this.props.router.asPath);
        }
        if (type === visitEvents.UPDATE_VISIT_FAILED && payload.callbackId === this.state.updateRecordsCallbackId) {
            this.setState({error: payload.response.message});
        }



    }

    state = {
        biometric_data:{},
        isRemarksEditable:false
    };

    render(){
        const {classes} = this.props;
        return <PetsWrap>
            <Layout direction={"column"} className={classes.body} flex={1}>
                <Layout>
                    {
                        !this.props.visitDetails.biometrics_data &&
                        <Layout className={classes.card} flex={1} alignItems={"center"} justifyContent={"center"}>
                            <Layout flex={1}>
                                <Typography variant={"subheading"}>
                                    No Records
                                </Typography>
                            </Layout>
                            <Button className={classes.formAction} onClick={() => {
                                this.setState({showRecordsDialogue: true})
                            }}>Record Reading</Button>
                        </Layout>
                    }
                    {
                        this.props.visitDetails.biometrics_data &&
                        <Layout className={classes.card} flex={1}>
                            <Layout direction={"column"}>
                            <Typography variant={"title"}>
                                Biometric Data
                            </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Biometric Name</TableCell>
                                            <TableCell>Value </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                        {

                                        }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Layout>


                            </Layout>

                    }

                <Layout direction={"column"} className={classes.card} flex={1}>
                    <Layout>
                    <InputContainer label={"Remarks"}>
                        {
                            !this.props.visitDetails.remarks &&
                            <TextField
                            value={this.state.remarks|| ''}
                            onChange={(e) => {
                                let remarks = e.target.value;
                                this.setState({remarks:remarks})
                            }}
                            placeholder={"Remarks"}
                        />
                        }
                        {
                            this.props.visitDetails.remarks &&
                            <Typography variant={"subheading"}>
                                {this.props.visitDetails.remarks}
                            </Typography>
                        }
                    </InputContainer>
                        {/*{*/}
                            {/*this.props.visitDetails.remarks &&*/}
                        {/*<Button className={classes.formAction} size={"small"} onClick={()=>{*/}
                            {/*this.setState({isRemarksEditable:true})*/}
                        {/*}}>Edit Remarks</Button>*/}
                        {/*}*/}
                    </Layout>
                    <Layout justifyContent={"flex-end"} className={classes.formActions}>
                        <Button className={classes.formAction} onClick={()=>{
                            this.setState({remarks:""})
                        }}>Cancel</Button>
                        <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                            let uid = uuidv1();
                            this.setState({updateVisitCallbackId:uid});
                            this.props.dispatch({type:visitCommand.UPDATE_VISIT,payload:{callbackId: uid,pet_id:this.props.petDetails._id,visitId:this.props.visitDetails._id,data:{remarks:this.state.remarks}}})
                        }}>Add</Button>
                    </Layout>

                </Layout>

                </Layout>
                <Layout className={classes.card}>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Vaccine Name</TableCell>
                            <TableCell>Dose</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        this.props.vaccinationDetails.docs.map((item,index) => {
                            return <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.data.vaccine}</TableCell>
                                <TableCell>{moment(item.catch_up_period.start).format("MMMM Do YYYY")}</TableCell>
                                <TableCell>{moment(item.catch_up_period.due_date).format("MMMM Do YYYY")}</TableCell>
                                <TableCell>
                                <Button onClick={()=>{
                                    this.setState({showVaccinateDialogue:true,selectedVaccination:item});
                                }} size={"small"}>Vaccinate</Button>
                                </TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                        })
                    }
                    </TableBody>
                    </Table>
                </Layout>
            </Layout>

            <Dialog
                open={this.state.showVaccinateDialogue}
                onClose={() => {
                    this.setState({showVaccinateDialogue: false})
                }}
            >
                <DialogContent>
                    <form style={{display: "flex"}} onSubmit={(e) => {
                        e.preventDefault();
                        let uid = uuidv1();
                        this.setState({updateVaccinationCallbackId:uid});
                        console.log(this.state.selectedVaccination)
                         this.props.dispatch({
                             type: vaccinationCommands.UPDATE_VACCINATION,
                             payload: {callbackId: uid,selectedVaccination:this.state.selectedVaccination,petid:this.props.petDetails._id,data: {vialNo:this.state.vaccinationVialNo,status:"Completed"}}
                         });
                    }}>
                        <Layout direction={"column"}>
                            <Typography variant={"title"} gutterBottom>
                                Vaccination Vial Details
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Provide necessary information to administer a vaccine.
                            </Typography>

                            <InputContainer label={"Vial Serial Number"}>
                                <TextField
                                    value={this.state.vaccinationVialNo|| ''}
                                    onChange={(e) => {
                                        let vaccinationVialNo = e.target.value;
                                        this.setState({vaccinationVialNo:vaccinationVialNo})
                                    }}
                                    placeholder={"Vial Serial Number"}
                                />
                            </InputContainer>
                            <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                <Button className={classes.formAction}>Cancel</Button>
                                <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Vaccinate</Button>
                            </Layout>
                        </Layout>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog
                open={this.state.showRecordsDialogue}
                onClose={() => {
                    this.setState({showRecordsDialogue: false})
                }}
            >
                <DialogContent>
                    <form style={{display: "flex"}} onSubmit={(e) => {
                        e.preventDefault();
                        let uid = uuidv1();
                        this.setState({updateRecordsCallbackId:uid});
                        this.props.dispatch({type:visitCommand.UPDATE_VISIT,payload:{callbackId: uid,pet_id:this.props.petDetails._id,visitId:this.props.visitDetails._id,data:{biometrics_data:this.state.biometric_data}}})
                    }}>
                        <Layout direction={"column"}>
                            <Typography variant={"title"} gutterBottom>
                                Biometrics Data
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Provide necessary information about the pet.
                            </Typography>
                            {
                                this.props.petTypeDetails.vaccination_fields.map((item, index)=> {
                                   return <Layout key={index}>
                                    <InputContainer label={item.name}>
                                        <TextField
                                            value={this.state.biometric_data[item.name] || ''}
                                            onChange={(e) => {
                                                let data = e.target.value;
                                                this.setState((state) => (state.biometric_data[item.name] = data, state))
                                            }}
                                            placeholder={item.name}
                                        />
                                    </InputContainer>
                                   </Layout>
                                })
                            }
                            <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                <Button className={classes.formAction}>Cancel</Button>
                                <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Vaccinate</Button>
                            </Layout>
                        </Layout>
                    </form>
                </DialogContent>
            </Dialog>
        </PetsWrap>
    }
}





let Index =  withRouter(withStyles((theme)=>{
    return {

        body:{
            margin:theme.spacing.unit * 2
        },
        card:{
            padding:theme.spacing.unit * 2,
            background:"#FFF",
            margin:theme.spacing.unit,
        },
        topbar:{
            padding:theme.spacing.unit,
            background:"#FFF"
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
        buttonContainer:{
            paddingBottom:theme.spacing.unit *2
        },
        iconLine:{
            marginLeft:5
        },
        line:{
            marginTop:theme.spacing.unit *1,
            marginBottom:theme.spacing.unit *1
        }
    }
})(connect(store=>store)(_Index)));

export default Index;


