import React from "react"
import Layout from "../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {AppBar, Toolbar} from "@material-ui/core/index";
import {vaccinationCenters} from "../api/api";
import {
    IconButton,
    Divider,
    GridList,
    GridListTile,
    Tabs,
    Tab,
    DialogContent,
    Dialog,
} from "@material-ui/core/index";
import {SearchIcon, UserIcon, VetCenterIcon} from "../components/icons";
import {Link} from "../routes";
import {ChevronLeft, ArrowDownward} from "@material-ui/icons/index";

import {Collapse} from "@material-ui/core/index";
import {appointmentCommands} from "../store/domain/appointments";
import moment from "moment";

import {addListener, homeUiDocActions, removeListener} from "./redux";
import {Router} from "../routes"
import _ from "underscore"
import {claimCommands, claimEvents} from "../store/domain/claim";
import InputContainer from "../components/input"
import uuidv1 from 'uuid/v1';





let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
        let vaccinationcenters = await vaccinationCenters()
        return {vaccinationCenters: vaccinationcenters};
    }

    handleAvailableQueue= (queues)=>{
        var availableQueues=[]
        let keys = Object.keys(queues);
        _.each(keys,function(item){
          if(queues[item]==true){
              availableQueues.push({name:item})
          }
        })
        if (availableQueues.length==0){
            return false
        }
        return availableQueues
    }

    handleChange = (e) =>{
        console.log(this.state.value,e.target);
    }

    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {

        if (type === claimEvents.ADD_CLAIM_SUCCEEDED && payload.callbackId === this.state.createClaimCallbackId) {
            this.setState({showClaimsDialogue:false});
            Router.pushRoute(this.props.router.asPath);
        }
    }


    state = {selectedCenter:null,showClaimsDialogue:false,claimerDetails:{},query:""};


    render() {
        const {classes} = this.props;
        return <Layout className={classes.body}>
            <Layout flex={1} direction={"column"} style={{borderLeft: "1px solid rgba(0, 0, 0, 0.12)"}}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Layout flex={1}>
                            <Typography variant={"title"} gutterBottom>
                                Home Page
                            </Typography>
                        </Layout>
                        <Layout className={classes.searchContainer} direction={"column"}>
                            <Layout flex={1} direction={"column"}>
                                <TextField
                                    onChange={(e)=> {
                                        this.setState({query:e.target.value})
                                        this.props.dispatch({type:homeUiDocActions.SET_QUERY, payload:e.target.value});
                                    }}
                                    placeholder={"Search A Center"}
                                    InputProps={{
                                        endAdornment: <SearchIcon size={25} pad={5}/>
                                    }}
                                    onFocus={() => {
                                    }}

                                />
                            </Layout>
                        </Layout>
                    </Toolbar>
                </AppBar>
                <Layout justifyContent={"center"} flex={1}>
                    <Layout direction={"column"} className={classes.container}>
                        <Layout direction={"column"}>
                            <Layout alignItems={"center"}>
                                <Layout alignItems={"center"}>
                                    <IconButton onClick={() => {
                                        this.setState({hideSearchLayout: false})
                                    }}>
                                        <ChevronLeft size={40}/>
                                    </IconButton>
                                </Layout>
                                <Layout alignItems={"center"}>

                                    <Typography variant={"title"} gutterBottom>
                                        Vaccination Centers
                                    </Typography>
                                </Layout>

                            </Layout>
                            {(this.props.ui.homeCenters.centers && this.props.ui.homeCenters) &&

                            this.props.ui.homeCenters.centers.map((item)=>{
                                return  <Layout className={classes.paper} key={item._id}>
                                    <Layout direction={"column"} flex={1}>
                                        <Layout>
                                            <VetCenterIcon size={150}/>
                                            <Layout direction={"column"} justifyContent={"center"} flex={1}>
                                                <Typography variant={"body1"} gutterBottom>
                                                    Center Name : {item.name}
                                                </Typography>

                                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                    Contact Name : {item.contact.name}
                                                </Typography>
                                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                    Contact Phone : {item.contact.phNo}
                                                </Typography>
                                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                    Contact Email : {item.contact.email}
                                                </Typography>
                                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                    Contact Fax : {item.contact.fax}
                                                </Typography>
                                            </Layout>
                                            <Layout alignItems={"flex-end"} justifyContent={"center"}
                                                    direction={"column"}>
                                                <Typography variant={"body1"} gutterBottom>
                                                    City : {item.address.city}
                                                </Typography>
                                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                    Address : {item.address.address}
                                                </Typography>
                                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                    Zip Code : {item.address.zip_code}
                                                </Typography>
                                                <Button onClick={() => {
                                                    this.setState({showClaimsDialogue:true,selectedCenterToBeClaimed:{...item}});
                                                }}>Claim Center</Button>
                                                <Button onClick={() => {
                                                    this.setState({selectedCenter:{...item, selectedDay:moment().format("M.D.YYYY")}})
                                                    this.props.dispatch({
                                                        type: appointmentCommands.FETCH_AVAILABLE_APPOINTMENTS,
                                                        payload: {
                                                            vaccination_center_id: item._id,
                                                            date: moment().format("M.D.YYYY")
                                                        }
                                                    });
                                                }}>Book An Appointment</Button>
                                                <Layout alignItems={"center"}>
                                                </Layout>
                                            </Layout>
                                        </Layout>
                                        {
                                            this.state.selectedCenter &&
                                            <Collapse in={this.state.selectedCenter._id === item._id}>
                                                <Divider/>
                                                <Layout direction={"column"} className={classes.line}>
                                                    <Typography variant={"title"} gutterBottom className={classes.line}>
                                                        Select A Slot
                                                    </Typography>
                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Select a slot from the available slots
                                                    </Typography>

                                                    {
                                                        this.state.selectedCenter &&
                                                        <Tabs
                                                            value={this.state.selectedCenter.selectedDay || moment().format("M.D.YYYY")}
                                                            onChange={(event, value)=>{
                                                                this.props.dispatch({
                                                                    type: appointmentCommands.FETCH_AVAILABLE_APPOINTMENTS,
                                                                    payload: {
                                                                        vaccination_center_id: item._id,
                                                                        date:value
                                                                    }
                                                                });
                                                                this.setState((state)=>{
                                                                    state.selectedCenter.selectedDay = value;
                                                                    return state
                                                                })
                                                            }}
                                                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                                        >
                                                            <Tab
                                                                disableRipple
                                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                                label="Today"
                                                                value={moment().format("M.D.YYYY")}
                                                            />
                                                            <Tab
                                                                disableRipple
                                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                                label="Tommorow"
                                                                value={moment().add(moment.duration(1, 'd')).format("M.D.YYYY")}
                                                            />
                                                            <Tab
                                                                disableRipple
                                                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                                label="Day after tommorow"
                                                                value={moment().add(moment.duration(2, 'd')).format("M.D.YYYY")}
                                                            />
                                                        </Tabs>

                                                    }

                                                    <Layout className={classes.timeContainer}>
                                                        {
                                                            (this.state.selectedCenter && this.props.appointments[item._id] && this.props.appointments[item._id][this.state.selectedCenter.selectedDay]) &&
                                                            <GridList cols={15} cellHeight={25}>
                                                                {
                                                                    this.props.appointments[item._id][this.state.selectedCenter.selectedDay].map((item) => {
                                                                        var timeLabel = null;
                                                                        (() => {
                                                                            var hour = item.slotIndex / this.state.selectedCenter.appointments_per_hour
                                                                            var min = (60 / this.state.selectedCenter.appointments_per_hour) * (item.slotIndex % this.state.selectedCenter.appointments_per_hour);
                                                                            timeLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
                                                                        })();
                                                                        var available=false;
                                                                        (() =>{
                                                                            if(this.handleAvailableQueue(item.available)!=false){
                                                                                available=true;
                                                                            }
                                                                        })();
                                                                        return <GridListTile key={item.slotIndex}
                                                                                             cols={1}
                                                                                             className={(available)?(this.state.selectedSlot == item) ? classes.selectedSlotContainer : classes.unselectedSlotContainer:classes.unavailableSlot}
                                                                                             onClick={() => {
                                                                                                 console.log(item);
                                                                                                 var availableQueues = this.handleAvailableQueue(item.available);
                                                                                                 if (availableQueues!=false) {
                                                                                                     var queueName = this.handleAvailableQueue(item.available)[0].name;
                                                                                                     this.setState({selectedSlot: item})
                                                                                                     Router.pushRoute(`/book-appointment/${this.state.selectedCenter._id}/${this.state.selectedCenter.selectedDay}/${queueName}/${item.slotIndex}`)
                                                                                                 } }}>
                                                                            <Typography variant={"body1"}
                                                                                        className={(available)?(this.state.selectedSlot == item) ? classes.selectedSlotTextColor : classes.unselectedSlotTextColor:classes.unavailableSlotTextColor}
                                                                                        align={"center"}>
                                                                                {timeLabel}
                                                                            </Typography>
                                                                        </GridListTile>
                                                                    })
                                                                }
                                                            </GridList>
                                                        }
                                                    </Layout>

                                                </Layout>
                                            </Collapse>
                                        }
                                    </Layout>

                                </Layout>
                            })

                            }
                            {
                                (this.props.ui.homeCenters.centers.length==0 && this.state.query=="")&&
                                this.props.vaccinationCenters.docs.map((item) => {
                                    return <Layout className={classes.paper} key={item._id}>
                                        <Layout direction={"column"} flex={1}>
                                            <Layout>
                                                <VetCenterIcon size={150}/>
                                                <Layout direction={"column"} justifyContent={"center"} flex={1}>
                                                    <Typography variant={"body1"} gutterBottom>
                                                        Center Name : {item.name}
                                                    </Typography>

                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Contact Name : {item.contact.name}
                                                    </Typography>
                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Contact Phone : {item.contact.phNo}
                                                    </Typography>
                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Contact Email : {item.contact.email}
                                                    </Typography>
                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Contact Fax : {item.contact.fax}
                                                    </Typography>
                                                </Layout>
                                                <Layout alignItems={"flex-end"} justifyContent={"center"}
                                                        direction={"column"}>
                                                    <Typography variant={"body1"} gutterBottom>
                                                        City : {item.address.city}
                                                    </Typography>
                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Address : {item.address.address}
                                                    </Typography>
                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                        Zip Code : {item.address.zip_code}
                                                    </Typography>
                                                    <Button onClick={() => {
                                                        this.setState({showClaimsDialogue:true,selectedCenterToBeClaimed:{...item}});
                                                    }}>Claim Center</Button>
                                                    <Button onClick={() => {
                                                        this.setState({selectedCenter:{...item, selectedDay:moment().format("M.D.YYYY")}})
                                                        this.props.dispatch({
                                                            type: appointmentCommands.FETCH_AVAILABLE_APPOINTMENTS,
                                                            payload: {
                                                                vaccination_center_id: item._id,
                                                                date: moment().format("M.D.YYYY")
                                                            }
                                                        });
                                                    }}>Book An Appointment</Button>
                                                    <Layout alignItems={"center"}>
                                                    </Layout>
                                                </Layout>
                                            </Layout>
                                            {
                                                this.state.selectedCenter &&
                                                <Collapse in={this.state.selectedCenter._id === item._id}>
                                                    <Divider/>
                                                    <Layout direction={"column"} className={classes.line}>
                                                        <Typography variant={"title"} gutterBottom className={classes.line}>
                                                            Select A Slot
                                                        </Typography>
                                                        <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                            Select a slot from the available slots
                                                        </Typography>

                                                        {
                                                            this.state.selectedCenter &&
                                                            <Tabs
                                                                value={this.state.selectedCenter.selectedDay || moment().format("M.D.YYYY")}
                                                                onChange={(event, value)=>{
                                                                    this.props.dispatch({
                                                                        type: appointmentCommands.FETCH_AVAILABLE_APPOINTMENTS,
                                                                        payload: {
                                                                            vaccination_center_id: item._id,
                                                                            date:value
                                                                        }
                                                                    });
                                                                    this.setState((state)=>{
                                                                        state.selectedCenter.selectedDay = value;
                                                                        return state
                                                                    })
                                                                }}
                                                                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                                            >
                                                                <Tab
                                                                    disableRipple
                                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                                    label="Today"
                                                                    value={moment().format("M.D.YYYY")}
                                                                />
                                                                <Tab
                                                                    disableRipple
                                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                                    label="Tommorow"
                                                                    value={moment().add(moment.duration(1, 'd')).format("M.D.YYYY")}
                                                                />
                                                                <Tab
                                                                    disableRipple
                                                                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                                                    label="Day after tommorow"
                                                                    value={moment().add(moment.duration(2, 'd')).format("M.D.YYYY")}
                                                                />
                                                            </Tabs>

                                                        }

                                                        <Layout className={classes.timeContainer}>
                                                            {
                                                                (this.state.selectedCenter && this.props.appointments[item._id] && this.props.appointments[item._id][this.state.selectedCenter.selectedDay]) &&
                                                                <GridList cols={15} cellHeight={25}>
                                                                    {
                                                                        this.props.appointments[item._id][this.state.selectedCenter.selectedDay].map((item) => {
                                                                            var timeLabel = null;
                                                                            (() => {
                                                                                var hour = item.slotIndex / this.state.selectedCenter.appointments_per_hour
                                                                                var min = (60 / this.state.selectedCenter.appointments_per_hour) * (item.slotIndex % this.state.selectedCenter.appointments_per_hour);
                                                                                timeLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
                                                                            })();
                                                                            var available=false;
                                                                            (() =>{
                                                                                if(this.handleAvailableQueue(item.available)!=false){
                                                                                    available=true;
                                                                                }
                                                                            })();
                                                                            return <GridListTile key={item.slotIndex}
                                                                                                 cols={1}
                                                                                                 className={(available)?(this.state.selectedSlot == item) ? classes.selectedSlotContainer : classes.unselectedSlotContainer:classes.unavailableSlot}
                                                                                                 onClick={() => {
                                                                                                     console.log(item);
                                                                                                     var availableQueues = this.handleAvailableQueue(item.available);
                                                                                                     if (availableQueues!=false) {
                                                                                                         var queueName = this.handleAvailableQueue(item.available)[0].name;
                                                                                                         this.setState({selectedSlot: item})
                                                                                                         Router.pushRoute(`/book-appointment/${this.state.selectedCenter._id}/${this.state.selectedCenter.selectedDay}/${queueName}/${item.slotIndex}`)
                                                                                                     } }}>
                                                                                <Typography variant={"body1"}
                                                                                            className={(available)?(this.state.selectedSlot == item) ? classes.selectedSlotTextColor : classes.unselectedSlotTextColor:classes.unavailableSlotTextColor}
                                                                                            align={"center"}>
                                                                                    {timeLabel}
                                                                                </Typography>
                                                                            </GridListTile>
                                                                        })
                                                                    }
                                                                </GridList>
                                                            }
                                                        </Layout>

                                                    </Layout>
                                                </Collapse>
                                            }
                                        </Layout>

                                    </Layout>
                                })
                            }
                        </Layout>
                    </Layout>
                </Layout>

            </Layout>
            <Dialog
                open={this.state.showClaimsDialogue}
                onClose={() => {
                    this.setState({showClaimsDialogue: false})
                }}
            >
                <DialogContent>
                    <form style={{display: "flex"}} onSubmit={(e) => {
                        e.preventDefault();
                        let uid = uuidv1();
                        this.setState({createClaimCallbackId:uid});
                        this.props.dispatch({type:claimCommands.ADD_CLAIM,payload:{callbackId: uid,data:{center_id:this.state.selectedCenterToBeClaimed._id,claimerDetails:this.state.claimerDetails}}})
                    }}>
                        <Layout direction={"column"}>
                            <Typography variant={"title"} gutterBottom>
                                Personal Details
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Provide the necessary Details for approval for claim .
                            </Typography>
                            <InputContainer label={"Name"}>
                                <TextField
                                    value={this.state.claimerDetails.name|| ''}
                                    onChange={(e) => {
                                        let name = e.target.value;
                                        this.setState((state) => (state.claimerDetails.name = name, state))
                                    }}
                                    placeholder={"Name"}
                                />
                            </InputContainer>
                            <InputContainer label={"Email"}>
                                <TextField
                                    value={this.state.claimerDetails.email|| ''}
                                    onChange={(e) => {
                                        let email = e.target.value;
                                        this.setState((state) => (state.claimerDetails.email = email, state))
                                    }}
                                    placeholder={"Email"}
                                />
                            </InputContainer>
                            <InputContainer label={"Mobile"}>
                                <TextField
                                    value={this.state.claimerDetails.mobile|| ''}
                                    onChange={(e) => {
                                        let mobile = e.target.value;
                                        this.setState((state) => (state.claimerDetails.mobile = mobile, state))
                                    }}
                                    placeholder={"Mobile"}
                                />
                            </InputContainer>

                            <Layout justifyContent={"flex-end"} className={classes.formActions}>

                                <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Claim</Button>
                            </Layout>
                        </Layout>
                    </form>
                </DialogContent>
            </Dialog>

        </Layout>

    }
};


const Index = withStyles((theme) => {
    return {
        body: {
            height: "100%",
            overflow:"scroll"
        },
        line: {
            marginTop: theme.spacing.unit * 2
        },
        sidebar: {
            minWidth: 300,
            background: theme.palette.primary.dark,

        },
        sideBarItemTitle: {
            color: "#FFF"
        },
        sideBarActiveItemTitle: {
            color: theme.palette.primary.dark
        },
        sideBarItem: {
            opacity: 0.5,
        },
        sideBarActiveItem: {
            background: "#FFF"
        },
        navTitle: {
            flex: 1
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
        paper: {
            margin: theme.spacing.unit * 2,
            background: "#FFF",
            padding: theme.spacing.unit * 2,

        },
        container: {
            width: 1400
        },
        iconContainer: {

            paddingRight: theme.spacing.unit * 2
        },
        searchContainer: {
            padding: theme.spacing.unit * 2
        },
        timeContainer: {
            marginTop:theme.spacing.unit *2
        },

        unselectedSlotContainer: {
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${theme.palette.grey['200']}`,
            margin: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 1,
            paddingRight: theme.spacing.unit * 1

        },
        selectedSlotContainer: {
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${theme.palette.grey['200']}`,
            margin: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 1,
            paddingRight: theme.spacing.unit * 1,
            background: theme.palette.primary.dark
        },
        unavailableSlot:{
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${theme.palette.grey['200']}`,
            margin: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 1,
            paddingRight: theme.spacing.unit * 1,
            background: "#a4a4a4"
        },
        selectedSlotTextColor: {
            color: "#fff"
        },
        unselectedSlotTextColor: {
            color: "#a4a4a4"
        },
        unavailableSlotTextColor: {
            color: "#fff"
        },
        centerAlign: {
            alignItems: "center",
            justifyContent: "center"
        },
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        tabsRoot: {
            borderBottom: '1px solid #e8e8e8',
        },
        tabsIndicator: {
            backgroundColor: '#1890ff',
        },
        tabRoot: {
            textTransform: 'initial',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing.unit * 4,
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$tabSelected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#40a9ff',
            },
        },
        tabSelected: {},
        typography: {
            padding: theme.spacing.unit * 3,
        }
    }

})(connect(store => store)(_Index))
export default Index;