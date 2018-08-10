import React from "react"
import DashboardContainer from "../../../components/admin-dashboard";
import {checkAdmin} from "../index";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import {addListener, removeListener} from "./redux"
import {petsUiDocActions} from "./redux"
import {Link} from "../../../routes"
import {vaccinationCenterDetails} from "../../../api/api";
import {AppointmentsIcon, DeleteIcon, EditIcon} from "../../../components/icons";
import {FormControlLabel,Avatar, Checkbox,MenuItem, Select, Typography,Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField,Divider, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core/index";
import Layout from "../../../components/layout";
import {vaccinationCenterEvents,vaccinationCenterCommands} from "../../../store/domain/vaccination-center";
import uuidv1 from 'uuid/v1';
import {Router} from "../../../routes"
import InputContainer from "../../../components/input";
import _ from "underscore"




let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccinationcenterdetails = await vaccinationCenterDetails(session_id,"self");
        return {vaccinationCenterDetails:vaccinationcenterdetails};

    }

        state = {
            queueDays:[],
            openAddQueue:false,
            openAddSlot:false
        };


        componentWillMount = () => {
            addListener(this)
                console.log(this.props.vaccinationCenterDetails.queues[0].time_slots)
        }

        componentWillUnmount = () => {
            removeListener(this)
        }

        onAction({type, payload}) {

            if (type === vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED && payload.callbackId === this.state.updateTimeDiffCallbackId) {
                Router.pushRoute(this.props.router.asPath);
            }
            if (type === vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED && payload.callbackId === this.state.addQueueCallbackId) {
                this.state.openAddQueue=false;
                Router.pushRoute(this.props.router.asPath);
            }
            if (type === vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED && payload.callbackId === this.state.deleteQueueCallbackId) {
                Router.pushRoute(this.props.router.asPath);
            }

            if (type === vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED && payload.callbackId === this.state.addSlotCallbackId) {
                Router.pushRoute(this.props.router.asPath);
            }

            if (type === vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SLOT_SUCCEEDED && payload.callbackId === this.state.deleteSlotCallbackId) {
                Router.pushRoute(this.props.router.asPath);
            }




        }

        render() {
            const {classes} = this.props;
            return <DashboardContainer>
                <Layout direction={"column"} flex={1} className={classes.body}>
                    <Layout>
                <Layout direction={"column"} alignItems={"center"}  className={classes.sidePanel}>
                    <Avatar className={classes.icon}>
                        <AppointmentsIcon size={24} />
                    </Avatar>
                    <Typography variant="title" gutterBottom align={"center"} >
                        Number of
                    </Typography>
                    <Typography variant="title" gutterBottom className={classes.sidePanelTitle} align={"center"} >
                        appointments per hour
                    </Typography>
                    <Layout>
                        <Select className={classes.selectBorder} value={this.props.vaccinationCenterDetails.appointments_per_hour}
                                style={{width:230,paddingBottom:10}}
                                onChange={(e) => {
                                    let uid = uuidv1();
                                    this.setState({updateTimeDiffCallbackId:uid});
                                     this.props.dispatch({
                                         type: vaccinationCenterCommands.UPDATE_VACCINATION_CENTER,
                                         payload: {
                                             data:{appointments_per_hour: e.target.value},
                                             callbackId: uid
                                         }
                                     });

                                }}>
                            {
                                [1, 2, 3, 4].map((item) => {
                                    return <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Layout>
                </Layout>
                    <Layout flex={1} className={classes.card}>


                            <Layout direction={"column"} flex={1}>
                                <Layout className={classes.title}>
                                    <Typography variant="title" gutterBottom className={classes.flex}>
                                        Appointment Queues
                                    </Typography>
                                    <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
                                        this.setState({openAddQueue: true});
                                    }}>

                                        Add Queue
                                    </Button>
                                </Layout>
                                <Table>
                                    <TableHead>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Days</TableCell>
                                        <TableCell></TableCell>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.vaccinationCenterDetails.queues.length > 0 &&
                                            this.props.vaccinationCenterDetails.queues.map((item) => {
                                                return <TableRow key={item._id}>
                                                    <TableCell>
                                                        {item.name}
                                                    </TableCell><Layout>

                                                </Layout>
                                                    <TableCell>
                                                    </TableCell>
                                                    <TableCell numeric>
                                                        <IconButton onClick={() => {
                                                            let uid = uuidv1();
                                                            this.setState({deleteQueueCallbackId:uid});
                                                            this.props.dispatch({
                                                                type: vaccinationCenterCommands.DELETE_VACCINATION_CENTER_QUEUE,
                                                                payload: {
                                                                    callbackId: uid,
                                                                    queue_id:item._id,
                                                                    center_id: this.props.vaccinationCenterDetails._id
                                                                }
                                                            });
                                                        }}>

                                                            <DeleteIcon size={20}/>
                                                        </IconButton>

                                                            <IconButton onClick={() => {
                                                                this.setState({currentQueue: item, openAddSlot: true});
                                                            }}>
                                                            <EditIcon size={20}/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            })
                                        }
                                        {
                                            (this.props.vaccinationCenterDetails.queues.length === 0) &&
                                            <TableCell>No Queues Created</TableCell>
                                        }
                                    </TableBody>
                                </Table>
                            </Layout>


                    </Layout>
                    </Layout>
                </Layout>

                {
                    this.state.currentQueue &&
                    <Dialog
                        open={this.state.openAddSlot}
                        onClose={() => {
                            this.setState({openAddSlot: false})
                        }}
                    >
                        <form className={classes.dialog} onSubmit={(event) => {
                            event.preventDefault();
                            let uid = uuidv1();
                            this.setState({addSlotCallbackId:uid});
                            this.props.dispatch({
                                type: vaccinationCenterCommands.ADD_VACCINATION_CENTER_QUEUE_SLOT,
                                payload: {
                                    callbackId: uid,
                                    slot_data: {from: this.state.newSlotFrom, to: this.state.newSlotTo},
                                    center_id: this.props.vaccinationCenterDetails._id,
                                    queue_id: this.state.currentQueue._id
                                }
                            });
                        }}>
                            <DialogTitle>Manage Slots</DialogTitle>
                            <DialogContent>
                                <Divider/>
                                <Layout direction={`column`}>
                                    <List>
                                        {
                                            this.state.currentQueue.time_slots.map((item) => {
                                                var fromLabel = null;
                                                var toLabel = null;
                                                (() => {
                                                    var hour = (item.from) / this.props.vaccinationCenterDetails.appointments_per_hour;
                                                    var min = (60 / this.props.vaccinationCenterDetails.appointments_per_hour) * (item.from % this.props.vaccinationCenterDetails.appointments_per_hour);
                                                    fromLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
                                                })();
                                                (() => {
                                                    var hour = (item.to) / this.props.vaccinationCenterDetails.appointments_per_hour;
                                                    var min = (60 / this.props.vaccinationCenterDetails.appointments_per_hour) * (item.to % this.props.vaccinationCenterDetails.appointments_per_hour);
                                                    toLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
                                                })();
                                                return <ListItem key={item._id}>
                                                    <ListItemText>
                                                        {fromLabel} - {toLabel}
                                                    </ListItemText>
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={() => {
                                                            let uid = uuidv1();
                                                            this.setState({deleteSlotCallbackId:uid});

                                                            this.props.dispatch({
                                                                type: vaccinationCenterCommands.DELETE_VACCINATION_CENTER_QUEUE_SLOT,
                                                                payload: {
                                                                    callbackId: uid,
                                                                    center_id: this.props.vaccinationCenterDetails._id,
                                                                    queue_id: this.state.currentQueue._id,
                                                                    slot_id: item._id
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
                                            this.state.currentQueue.time_slots.length === 0 &&
                                            <ListItem>No Slots Added</ListItem>
                                        }
                                    </List>
                                </Layout>
                                <Divider/>
                                <Layout className={classes.paper} alignItems={`flex-end`}>
                                    <InputContainer label={"From"}>
                                        <Select value={parseInt(this.state.newSlotFrom)} className={classes.selectBorder} onChange={e => {
                                            this.setState({newSlotFrom: e.target.value})
                                        }}>
                                            {
                                                _.range(24 * this.props.vaccinationCenterDetails.appointments_per_hour).map((i) => {
                                                    var hour = (i) / this.props.vaccinationCenterDetails.appointments_per_hour;
                                                    var min = (60 / this.props.vaccinationCenterDetails.appointments_per_hour) * (i % this.props.vaccinationCenterDetails.appointments_per_hour);
                                                    return <MenuItem key={i}
                                                                     value={i}>{("0" + Math.floor(hour)).slice(-2)}:{("0" + min).slice(-2)}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </InputContainer>
                                    <InputContainer label={"To"}>
                                        <Select value={parseInt(this.state.newSlotTo)} className={classes.selectBorder} onChange={e => {
                                            this.setState({newSlotTo: e.target.value})
                                        }}>
                                            {
                                                _.range(24 * this.props.vaccinationCenterDetails.appointments_per_hour).map((i) => {
                                                    var hour = (i) / this.props.vaccinationCenterDetails.appointments_per_hour;
                                                    var min = (60 / this.props.vaccinationCenterDetails.appointments_per_hour) * (i % this.props.vaccinationCenterDetails.appointments_per_hour);
                                                    return <MenuItem key={i}
                                                                     value={i}>{("0" + Math.floor(hour)).slice(-2)}:{("0" + min).slice(-2)}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </InputContainer>
                                    <Button type="submit" color="primary">
                                        Add
                                    </Button>
                                </Layout>
                            </DialogContent>
                        </form>
                    </Dialog>
                }

                <Dialog
                    open={this.state.openAddQueue}
                    onClose={() => {
                        this.setState({openAddQueue: false})
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={(event) => {
                        event.preventDefault();

                        let uid = uuidv1();
                        this.setState({addQueueCallbackId:uid});

                        console.log(this.state.queueDays);

                        this.props.dispatch({
                            type: vaccinationCenterCommands.ADD_VACCINATION_CENTER_QUEUE,
                            payload: {
                                callbackId: uid,
                                data:{name: this.state.newQueueName,days:this.state.queueDays},
                                center_id: this.props.vaccinationCenterDetails._id
                            }
                        });
                    }}>
                        <DialogTitle id="form-dialog-title">Add A new Queue</DialogTitle>
                        <DialogContent>

                            <DialogContentText>
                                <Typography gutterBottom>
                                    Kindly enter the Queue Name to be added to start adding time slots for the same
                                </Typography>
                            </DialogContentText>
                            <InputContainer label={"Queue Name"}>
                                <TextField
                                    autoFocus
                                    type="Queue Name"
                                    fullWidth
                                    onChange={(event) => {
                                        this.setState({newQueueName: event.target.value})
                                    }}
                                />
                            </InputContainer>
                            <div>
                                {
                                    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item)=>{
                                        return <FormControlLabel
                                            key={item}
                                            control={
                                                <Checkbox
                                                    onChange={(value)=>{
                                                        if(value.target.checked){
                                                            if(this.state.queueDays.indexOf(item)==-1){
                                                                this.setState((state)=>{
                                                                    state.queueDays.push(item);
                                                                    return state;
                                                                })
                                                            }
                                                        }
                                                        else{
                                                            this.setState((state)=>{
                                                                state.queueDays = _.reject(this.state.queueDays,function(_item){
                                                                    return item == _item;
                                                                });
                                                                return state;
                                                            })
                                                        }
                                                    }}
                                                    value={"true"}
                                                />
                                            }
                                            label={item}
                                        />
                                    })
                                }
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                this.setState({openAddQueue: false})
                            }} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>


            </DashboardContainer>
        }
    }
;

let Index = withStyles((theme) => {
    return {
        card:{
            background: "#FFF",
        },
        flex:{
          flex:1
        },
        searchContainer: {
            padding: theme.spacing.unit * 2
        },
        leftList: {
            background: "#FFF",
            width: 360
        },
        rightPanel: {
            flex: 1
        },
        list: {
            flex: 1,
            overflow: "scroll"
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
        line:{
            marginTop:theme.spacing.unit * 2,
            marginBottom:theme.spacing.unit * 2,
        },
        actions: {
            marginTop: theme.spacing.unit * 4
        },
        paper: {
            marginLeft: theme.spacing.unit * 1,
            marginRight: theme.spacing.unit * 1,
            display: "flex"
        },
        section: {
            flex: 1
        },
        dialog: {
            minWidth: 500
        },
        body: {
            margin: theme.spacing.unit * 2
        },
        title: {
            padding: theme.spacing.unit * 2
        },
        icon: {
            border: `2px solid ${theme.palette.grey['200']}`,
            background: "none",
            padding:10,
            margin:theme.spacing.unit * 2
        },
        sidePanel:{
            background: "#FFF",
            padding: theme.spacing.unit * 2,
            alignItems:"center",
            justifyContent:"center",
            minHeight:240,
            width:350,
            marginRight:theme.spacing.unit * 2
        },
        sidePanelTitle:{
            paddingBottom:10
        },
        selectBorder:{
                border: `2px solid #e8e8e8`,
            borderRadius: "4px",
                 verticalAlign: "middle"

        }
    }
})(connect(store => store)(checkAdmin(_Index)));

export default Index
