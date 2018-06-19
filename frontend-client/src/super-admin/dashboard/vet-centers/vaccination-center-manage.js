import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import InputContainer from "../../../components/input"
import {connect} from "react-redux";
import style from "../style";
import _ from "underscore"
import {
    REQUEST_ADD_ADMIN,
    REQUEST_ADD_QUEUE, REQUEST_ADD_SLOT,
    REQUEST_DELETE_ADMIN, REQUEST_DELETE_QUEUE, REQUEST_DELETE_SLOT, REQUEST_UPDATE_SLOT_INTERVAL,
    REQUEST_VET_CENTER_FETCH
} from "../../../stores/vet-centers/actions";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, IconButton,
    List,
    ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, Select, TextField,
    Typography
} from "@material-ui/core/es/index";
import Add from '@material-ui/icons/Add';
import {DeleteIcon} from "mdi-react";
import Layout from "../../../components/layout";
import SelectInput from "@material-ui/core/es/Select/SelectInput";

let Index = withStyles((theme) => {
    return {
        ...style(theme),
        actions: {
            marginTop: theme.spacing.unit * 4
        },
        paper: {
            marginTop: theme.spacing.unit * 1,
            display: "flex"
        },
        section: {
            flex: 1
        },
        section2: {
            flex: 3,
            borderLeft: "1px solid #cccccc6b"
        }
    }
})(class extends React.Component {


    state = {
        openAddAdmin: false,
        newAdminEmail: "",
        openAddQueue: false,
        openAddSlot: false,
        newQueueName: "",
        newSlotFrom: null,
        newSlotTo: null,
        currentQueue: null
    };

    componentWillMount() {
        this.props.dispatch({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: this.props.centerId}})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vetCenterDetail.addedAdmin) {
            this.setState({openAddAdmin: false, newAdminEmail: ""});
        }
        if (nextProps.vetCenterDetail.addedQueue) {
            this.setState({openAddQueue: false, newQueueName: ""});
        }
    }

    render() {
        const {classes} = this.props;
        if (this.props.vetCenterDetail._id) {
            return <AnnotatedSection title={this.props.vetCenterDetail.name}
                                     desc={"Please provide the information to register Vaccination Center."}
                                     backButton={{url: "/super-admin/dashboard/vet-centers"}}>
                <div>
                    <Paper className={`${classes.paperPage}`}>
                        <Layout alignItems="center">
                            <Typography variant="subheading" gutterBottom className={`flex`}>
                                Slot Interval
                            </Typography>
                            <Layout>
                                <Button onClick={() => {
                                    this.props.dispatch({
                                        type: REQUEST_UPDATE_SLOT_INTERVAL,
                                        payload: {slot_interval: 4, center_id: this.props.vetCenterDetail._id}
                                    });
                                }} color={"primary"} variant={this.props.vetCenterDetail.appointments_per_hour==4?`raised`:`flat`}>1</Button>
                                <Button onClick={() => {
                                    this.props.dispatch({
                                        type: REQUEST_UPDATE_SLOT_INTERVAL,
                                        payload: {slot_interval: 3, center_id: this.props.vetCenterDetail._id}
                                    });
                                }} color={"primary"} variant={this.props.vetCenterDetail.appointments_per_hour==3?`raised`:`flat`}>2</Button>
                                <Button onClick={() => {
                                    this.props.dispatch({
                                        type: REQUEST_UPDATE_SLOT_INTERVAL,
                                        payload: {slot_interval: 2, center_id: this.props.vetCenterDetail._id}
                                    });
                                }} color={"primary"} variant={this.props.vetCenterDetail.appointments_per_hour==2?`raised`:`flat`}>3</Button>
                                <Button onClick={() => {
                                    this.props.dispatch({
                                        type: REQUEST_UPDATE_SLOT_INTERVAL,
                                        payload: {slot_interval: 1, center_id: this.props.vetCenterDetail._id}
                                    });
                                }} color={"primary"} variant={this.props.vetCenterDetail.appointments_per_hour==1?`raised`:`flat`}>4</Button>
                            </Layout>
                        </Layout>
                    </Paper>
                    <Paper className={`${classes.paperPage} ${classes.paper}`}>
                        <div className={classes.section}>
                            <Typography variant="subheading" gutterBottom className={`flex`}>
                                Appointment Queues
                            </Typography>
                            <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
                                this.setState({openAddQueue: true});
                            }}>
                                <Add/>
                                Add Queue
                            </Button>
                        </div>
                        <List className={classes.section2}>
                            {
                                this.props.vetCenterDetail.queues.length > 0 &&
                                this.props.vetCenterDetail.queues.map((item) => {
                                    return <ListItem key={item._id}>
                                        <ListItemText>
                                            {item.name}
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Button onClick={() => {
                                                this.setState({currentQueue: item, openAddSlot: true});

                                            }}>
                                                Manage Slots
                                            </Button>
                                            <IconButton onClick={() => {
                                                this.props.dispatch({
                                                    type: REQUEST_DELETE_QUEUE,
                                                    payload: {
                                                        center_id: this.props.vetCenterDetail._id,
                                                        queue_id: item._id
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
                                (this.props.vetCenterDetail.queues.length === 0) &&
                                <ListItem>No Queues Created</ListItem>
                            }
                        </List>
                    </Paper>
                    <Paper className={`${classes.paperPage} ${classes.paper}`}>
                        <div className={classes.section}>
                            <Typography variant="subheading" gutterBottom className={`flex`}>
                                Manage Admins
                            </Typography>
                            <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
                                this.setState({openAddAdmin: true});
                            }}>
                                <Add/>
                                Add Admin
                            </Button>
                        </div>
                        {
                            this.props.vetCenterDetail.admins &&
                            <List className={classes.section2}>
                                {
                                    this.props.vetCenterDetail.admins.length > 0 &&
                                    this.props.vetCenterDetail.admins.map((item) => {
                                        return <ListItem key={item._id}>
                                            <ListItemText>
                                                {item.email}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => {
                                                    this.props.dispatch({
                                                        type: REQUEST_DELETE_ADMIN,
                                                        payload: {
                                                            center_id: this.props.vetCenterDetail._id,
                                                            admin_id: item._id
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
                                    (this.props.vetCenterDetail.admins.length === 0) &&
                                    <ListItem>No Admins Created</ListItem>
                                }
                            </List>
                        }
                    </Paper>
                </div>

                <Dialog
                    open={this.state.openAddQueue}
                    onClose={() => {
                        this.setState({openAddQueue: false})
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.dispatch({
                            type: REQUEST_ADD_QUEUE,
                            payload: {
                                queue_data: {name: this.state.newQueueName},
                                center_id: this.props.vetCenterDetail._id
                            }
                        });
                    }}>
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send
                                updates occasionally.
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
                <Dialog
                    open={this.state.openAddAdmin}
                    onClose={() => {
                        this.setState({openAddAdmin: false})
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.dispatch({
                            type: REQUEST_ADD_ADMIN,
                            payload: {email: this.state.newAdminEmail, center_id: this.props.vetCenterDetail._id}
                        });
                    }}>
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send
                                updates occasionally.
                            </DialogContentText>
                            <InputContainer label={"Email Address"}>
                                <TextField
                                    autoFocus
                                    type="email"
                                    fullWidth
                                    onChange={(event) => {
                                        this.setState({newAdminEmail: event.target.value})
                                    }}
                                />
                            </InputContainer>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                {
                    this.state.currentQueue &&
                    <Dialog
                        open={this.state.openAddSlot}
                        onClose={() => {
                            this.setState({openAddSlot: false})
                        }}
                        aria-labelledby="form-dialog-title"
                    >
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.props.dispatch({
                                type: REQUEST_ADD_SLOT,
                                payload: {
                                    slot_data: {from: this.state.newSlotFrom, to: this.state.newSlotTo},
                                    center_id: this.props.vetCenterDetail._id,
                                    queue_id: this.state.currentQueue._id
                                }
                            });
                        }}>
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please Enter the start and end times of Slots of the current Queue
                                </DialogContentText>
                                <Divider />
                                <Layout>
                                    <List>
                                        {
                                            this.state.currentQueue.time_slots.map((item) => {
                                                return <ListItem key={item._id}>

                                                    <ListItemText>
                                                        {item.from} - {item.to}
                                                    </ListItemText>
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={() => {
                                                            this.props.dispatch({
                                                                type: REQUEST_DELETE_SLOT,
                                                                payload: {
                                                                    center_id: this.props.vetCenterDetail._id,
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
                                            this.state.currentQueue.time_slots.length == 0 &&
                                            <ListItem >No Slots Added</ListItem>
                                        }
                                    </List>
                                </Layout>
                                <Divider />
                                <Layout>
                                    <select>
                                        {
                                            _.range((24)/this.props.vetCenterDetail.appointments_per_hour).map((i)=>{
                                                return <option>{i}</option>
                                            })
                                        }
                                    </select>
                                    <select>
                                        {
                                            _.range((24)/this.props.vetCenterDetail.appointments_per_hour).map((i)=>{
                                                return <option>{i}</option>
                                            })
                                        }
                                    </select>
                                </Layout>
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
                }
            </AnnotatedSection>;
        } else {
            return <div></div>
        }
    }

});

export default connect(store => store)(Index);