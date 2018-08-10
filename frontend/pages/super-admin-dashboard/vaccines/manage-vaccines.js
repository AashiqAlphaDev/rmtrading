import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {vaccineDetail} from "../../../api/api";
import {Link} from "../../../routes";
import DashboardContainer from "../../../components/super-admin-dashboard/index";
import uuidv1 from 'uuid/v1';
import InputContainer from "../../../components/input";
import {removeListener,addListener} from "./redux";
import {Router} from "../../../routes"
import {
    Button, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction,
    ListItemText, Paper,
    Typography,Tab,Tabs,Dialog,Slide,TextField
} from "@material-ui/core/index";
import {DeleteIcon} from "../../../components/icons";
import {vaccineCommands, vaccineEvents} from "../../../store/domain/vaccines";






function Transition(props) {
    return <Slide direction="up" {...props} />;
}


let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
         let vaccinedetail = await vaccineDetail(query.vaccine_id);

        return {vaccineDetail:vaccinedetail};
    }


    componentWillMount = () => {

        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        console.log(type);
        if (type === vaccineEvents.DELETE_VACCINE_SCHEDULE_SUCCEEDED && payload.callbackId === this.state.deleteVaccineScheduleCallbackId) {
            Router.pushRoute(this.props.router.asPath)
        }

        if (type === vaccineEvents.ADD_VACCINE_SCHEDULE_SUCCEEDED && payload.callbackId === this.state.addVaccineScheduleCallbackId) {
            this.setState({openAddDosage:false});
            Router.pushRoute(this.props.router.asPath)
        }

    }

    state = {
        openAddDosage: false,
        newDosageNotifyPeriod: 0,
        newDosageDuePeriod: 0,
        newDosageInterval: 0,
        newDosageIntervalStart: 0,
        newDosageIntervalEnd: 0,
        newDosageType: null,
        newDosageRecurringType: false
    };


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
        <Layout className={classes.body} direction={"column"}>
                <div>
                    <Paper className={`${classes.paperPage} ${classes.paper}`}>
                        <div className={`${classes.section}`}>
                            <Typography variant="subheading" gutterBottom className={`flex`}>
                                Child Dosages
                            </Typography>
                            <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
                                this.setState({openAddDosage: true, newDosageType: "child"});
                            }}>

                                Add Dosage
                            </Button>
                        </div>
                        <div className={`${classes.section2}`}>
                            <List>
                                {
                                    this.props.vaccineDetail.child_vaccine_schedules.length > 0 &&
                                    this.props.vaccineDetail.child_vaccine_schedules.map((item, i) => {
                                        return <ListItem key={item._id}>
                                            <ListItemText>
                                                {`Dose ${i + 1}: `}
                                                {`Notify between week ${item.catch_up_period.notify_period} and week ${item.catch_up_period.notify_period + item.catch_up_period.due_period}`}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => {
                                                    let uid = uuidv1();
                                                    this.setState({deleteVaccineScheduleCallbackId:uid});
                                                    this.props.dispatch({
                                                        type: vaccineCommands.DELETE_VACCINE_SCHEDULE,
                                                        payload: {
                                                            dosageType: "child_vaccine_schedules",
                                                            callbackId:uid,
                                                            vaccine_id: this.props.vaccineDetail._id,
                                                            schedule_id: item._id
                                                        }
                                                    })
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    })
                                }
                                {
                                    (this.props.vaccineDetail.child_vaccine_schedules.length === 0) &&
                                    <ListItem>No Schedules Created</ListItem>
                                }
                            </List>
                        </div>
                    </Paper>
                    <Paper className={`${classes.paperPage} ${classes.paper}`}>
                        <div className={`${classes.section}`}>
                            <Typography variant="subheading" gutterBottom className={`flex`}>
                                Adult Dosages
                            </Typography>
                            <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
                                this.setState({openAddDosage: true, newDosageType: "adult"});
                            }}>
                                Add Dosage
                            </Button>
                        </div>
                        <div className={`${classes.section2}`}>
                            <List>
                                {
                                    this.props.vaccineDetail.adult_vaccine_schedules.length > 0 &&
                                    this.props.vaccineDetail.adult_vaccine_schedules.map((item, i) => {
                                        return <ListItem key={item._id}>
                                            <ListItemText>

                                                {`Dose ${i + 1}: `}
                                                {`Notify between week ${item.catch_up_period.notify_period} and week ${item.catch_up_period.notify_period + item.catch_up_period.due_period}`}

                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => {
                                                    let uid = uuidv1();
                                                    this.setState({deleteVaccineScheduleCallbackId:uid});
                                                    this.props.dispatch({
                                                        type: vaccineCommands.DELETE_VACCINE_SCHEDULE,
                                                        payload: {
                                                            dosageType: "adult_vaccine_schedules",
                                                            callbackId:uid,
                                                            vaccine_id: this.props.vaccineDetail._id,
                                                            schedule_id: item._id
                                                        }
                                                    })
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    })
                                }
                                {
                                    (this.props.vaccineDetail.adult_vaccine_schedules.length === 0) &&
                                    <ListItem>No Schedules Created</ListItem>
                                }
                            </List>
                        </div>
                    </Paper>
                    <Paper className={`${classes.paperPage} ${classes.paper}`}>
                        <div className={`${classes.section}`}>
                            <Typography variant="subheading" gutterBottom className={`flex`}>
                                Booster Dosages
                            </Typography>
                            <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
                                this.setState({openAddDosage: true, newDosageType: "booster"});
                            }}>

                                Add Dosage
                            </Button>
                        </div>
                        <div className={`${classes.section2}`}>
                            <List>
                                {
                                    this.props.vaccineDetail.booster_vaccine_schedules.length > 0 &&
                                    this.props.vaccineDetail.booster_vaccine_schedules.map((item, i) => {
                                        return <ListItem key={item._id}>
                                            <ListItemText>
                                                {`Dose ${i + 1}: `}
                                                {`Notify between week ${item.catch_up_period.notify_period} and week ${item.catch_up_period.notify_period + item.catch_up_period.due_period}`}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => {
                                                    let uid = uuidv1();
                                                    this.setState({deleteVaccineScheduleCallbackId:uid});
                                                    this.props.dispatch({
                                                        type: vaccineCommands.DELETE_VACCINE_SCHEDULE,
                                                        payload: {
                                                            dosageType: "booster_vaccine_schedules",
                                                            callbackId:uid,
                                                            vaccine_id: this.props.vaccineDetail._id,
                                                            schedule_id: item._id
                                                        }
                                                    })
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    })
                                }
                                {
                                    (this.props.vaccineDetail.booster_vaccine_schedules.length === 0) &&
                                    <ListItem>No Schedules Created</ListItem>
                                }
                            </List>
                        </div>
                    </Paper>
                </div>
                <Dialog
                    TransitionComponent={Transition}
                    open={this.state.openAddDosage}
                    onClose={() => {
                        this.setState({openAddDosage: false})
                    }}
                >
                    <form className={classes.dialog} onSubmit={(event) => {
                        event.preventDefault();
                        let scheduleData = {
                            catch_up_period: {
                                notify_period: this.state.newDosageNotifyPeriod,
                                due_period: this.state.newDosageDuePeriod
                            }
                        };
                        if (this.state.newDosageRecurringType) {
                            scheduleData.interval = this.state.newDosageInterval;
                            scheduleData.period = {
                                start: this.state.newDosageIntervalStart,
                                end: this.state.newDosageIntervalEnd
                            };
                        } else {
                            scheduleData.period = {
                                start: this.state.newDosageIntervalStart,
                                end: this.state.newDosageIntervalEnd
                            };
                        }
                        let uid = uuidv1();
                        this.setState({addVaccineScheduleCallbackId:uid});

                        this.props.dispatch({
                            type: vaccineCommands.ADD_VACCINE_SCHEDULE,
                            payload: {
                                vaccine_id: this.props.vaccineDetail._id,
                                dosageType: this.state.newDosageType,
                                callbackId:uid,
                                schedule_data: scheduleData
                            }
                        });
                    }}>
                        <DialogTitle>Add Dosage</DialogTitle>
                        <DialogContent>
                            <Layout direction={"column"} className={classes.paper}>
                                <Layout>
                                    <InputContainer label={"Notify Period (in weeks)"}>
                                        <TextField placeholder={"Notify Period"} type={"number"} onChange={(event) => {
                                            this.setState({newDosageNotifyPeriod: event.target.value})
                                        }}/>
                                    </InputContainer>
                                    <InputContainer label={"Due Period (in weeks)"}>
                                        <TextField placeholder={"Due Period"} type={"number"} onChange={(event) => {
                                            this.setState({newDosageDuePeriod: event.target.value})
                                        }}/>
                                    </InputContainer>
                                </Layout>
                                <InputContainer>
                                    <Tabs fullWidth value={this.state.newDosageRecurringType ? 1 : 0}
                                          onChange={(e, v) => {
                                              this.setState({newDosageRecurringType: v === 1});
                                          }}>
                                        <Tab label={"One Time"}></Tab>
                                        <Tab label={"Recurring"}></Tab>
                                    </Tabs>
                                </InputContainer>
                                {
                                    this.state.newDosageRecurringType &&
                                    <Layout direction={"column"}>
                                        <InputContainer label={"Interval (in weeks)"}>
                                            <TextField placeholder={"Interval"} type={"number"} onChange={(event) => {
                                                this.setState({newDosageInterval: event.target.value})
                                            }}/>
                                        </InputContainer>
                                        <InputContainer label={"Start (in weeks)"}>
                                            <TextField placeholder={"Start"} type={"number"} onChange={(event) => {
                                                this.setState({newDosageIntervalStart: event.target.value})
                                            }}/>
                                        </InputContainer>
                                        <InputContainer label={"End (in weeks)"}>
                                            <TextField placeholder={"End"} type={"number"} onChange={(event) => {
                                                this.setState({newDosageIntervalEnd: event.target.value})
                                            }}/>
                                        </InputContainer>
                                    </Layout>

                                }
                                {
                                    !this.state.newDosageRecurringType &&
                                    <Layout>
                                        <InputContainer label={"Start (in weeks)"}>
                                            <TextField placeholder={"Start"} type={"number"} onChange={(event) => {
                                                this.setState({newDosageIntervalStart: event.target.value})
                                            }}/>
                                        </InputContainer>
                                    </Layout>
                                }


                            </Layout>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                this.setState({openAddDosage: false});
                            }} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" type={"submit"}>
                                Add Dosage
                            </Button>
                        </DialogActions>
                    </form>
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
        actions: {
            marginTop: theme.spacing.unit * 4
        },
        paper: {
            marginTop: theme.spacing.unit * 1,
            display: "flex"
        },
        section: {
            padding:theme.spacing.unit *2,
            flex: 1
        },
        section2: {
            padding:theme.spacing.unit *2,
            flex: 3,
            borderLeft: "1px solid #cccccc6b"
        },
        dialog: {
            minWidth: 500
        },
    }
})(connect(store=>store)(_Index))
export default Index;