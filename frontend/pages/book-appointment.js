import React from "react"
import Layout from "../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {AppBar, Toolbar} from "@material-ui/core/index";
import {vaccinationCenterDetail} from "../api/api";


import {SearchIcon, UserIcon, VetCenterIcon} from "../components/icons";
import {Link} from "../routes";
import InputContainer from "../components/input";
import {appointmentCommands} from "../store/domain/appointments";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {

        let vaccinationcenterdetails = await vaccinationCenterDetail(query.center_id);
        let bookingslotDetails = {center:query.center_id,date:query.date,slot_index:query.slot_index,queue_name:query.queue_name};
        return {vaccinationCenterDetails:vaccinationcenterdetails,bookingSlotDetails:bookingslotDetails};
    }

    handleChange = (e) =>{

    }

    componentWillMount = () => {
        console.log(this.props.bookingSlotDetails)

    }

    componentWillUnmount = () => {

    }

    onAction({type, payload}) {


    }
    toTime = (slot,appointments_per_hour) =>{
        var hour = "0" + Math.floor(slot / appointments_per_hour);
        var min = "0" + ((60 / appointments_per_hour) * (slot % appointments_per_hour));
        return hour.slice(-2)+":"+min.slice(-2)
    }


    state = {bookie_details:{

    }};


    render() {
        const {classes} = this.props;
        return <Layout className={classes.body} direction={"column"}>
            <Layout direction={"column"} style={{borderLeft: "1px solid rgba(0, 0, 0, 0.12)"}}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Layout flex={1}>
                            <Typography variant={"title"} gutterBottom>
                                Book an Appointment
                            </Typography>
                        </Layout>
                    </Toolbar>
                </AppBar>
            </Layout>
            <Layout justifyContent={"center"} flex={1}>

                <Layout direction={"column"} className={classes.container}>
                    <Layout className={classes.paper} alignItems={"center"}>
                        <Layout flex={1}>

                            <VetCenterIcon size={150}/>
                            <Layout direction={"column"}>
                                <Typography variant={"body1"} gutterBottom>
                                    Center Name : {this.props.vaccinationCenterDetails.name}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Center Admin Name : {this.props.vaccinationCenterDetails.contact.name}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Center Admin Phone : {this.props.vaccinationCenterDetails.contact.phNo}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Center Admin Email : {this.props.vaccinationCenterDetails.contact.email}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Center Admin Fax : {this.props.vaccinationCenterDetails.contact.fax}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    City : {this.props.vaccinationCenterDetails.address.city}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Address : {this.props.vaccinationCenterDetails.address.address}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Zip Code : {this.props.vaccinationCenterDetails.address.zip_code}
                                </Typography>
                                {/*<Typography variant={"body1"} gutterBottom color={"textSecondary"}>*/}
                                    {/*Appointment Date : {this.props.bookingSlotDetails.date}*/}
                                {/*</Typography>*/}

                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Appointment Time : {this.toTime(this.props.bookingSlotDetails.slot_index,this.props.vaccinationCenterDetails.appointments_per_hour)}
                                </Typography>
                            </Layout>




                        </Layout>
                        <Layout flex={1} justifyContent={"center"}>
                            <form style={{display: "flex"}} onSubmit={(e) => {
                                this.props.dispatch({type:appointmentCommands.BOOK_APPOINTMENT,payload:{center_id:this.props.bookingSlotDetails.center,date:this.props.bookingSlotDetails.date,data:{queue_name:this.props.bookingSlotDetails.queue_name,slot_index:this.props.bookingSlotDetails.slot_index,bookie_details:this.state.bookie_details}}})

                            }}>
                                <Layout direction={"column"} flex={1}>
                                    <Typography variant={"title"} gutterBottom>
                                        User Details
                                    </Typography>
                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                        Provide necessary information to book an appointment.
                                    </Typography>
                                    <Layout direction={"column"}>
                                        <InputContainer label={"Name"}>
                                            <TextField
                                                value={this.state.bookie_details.name|| ''}
                                                onChange={(e) => {
                                                    let name = e.target.value;
                                                    this.setState((state) => (state.bookie_details.name = name, state))
                                                }}
                                                placeholder={"Name"}
                                            />
                                        </InputContainer>
                                        <InputContainer label={"Email"}>
                                            <TextField
                                                value={this.state.bookie_details.email|| ''}
                                                onChange={(e) => {
                                                    let email = e.target.value;
                                                    this.setState((state) => (state.bookie_details.email = email, state))
                                                }}
                                                placeholder={"Email"}
                                            />
                                        </InputContainer>
                                        <InputContainer label={"Mobile Number"}>
                                            <TextField
                                                value={this.state.bookie_details.mobile|| ''}
                                                onChange={(e) => {
                                                    let mobile = e.target.value;
                                                    this.setState((state) => (state.bookie_details.mobile = mobile, state))
                                                }}
                                                placeholder={"Mobile Number"}
                                            />
                                        </InputContainer>

                                    </Layout>
                                    <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                        <Button className={classes.formAction}>Cancel</Button>
                                        <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Book Appointment</Button>
                                    </Layout>
                                </Layout>
                            </form>
                        </Layout>

                    </Layout>
                </Layout>
            </Layout>

        </Layout>

    }
};


const Index = withStyles((theme) => {
    return {
        container: {
            width: 1400
        },
        body: {
            height: "100%"
        },
        paper:{
            padding:theme.spacing.unit *2,
            margin:theme.spacing.unit *2,
            background:"#fff"
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        }
    }

})(connect(store => store)(_Index))
export default Index;