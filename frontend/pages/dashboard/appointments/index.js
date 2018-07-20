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
import {Avatar, MenuItem, Select, Typography,Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField} from "@material-ui/core/index";
import Layout from "../../../components/layout";
import {vaccinationCenterEvents,vaccinationCenterCommands} from "../../../store/domain/appointment";
import uuidv1 from 'uuid/v1';
import {Router} from "../../../routes"
import InputContainer from "../../../components/input";



let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccinationcenterdetails = await vaccinationCenterDetails(session_id);
        return {vaccinationCenterDetails:vaccinationcenterdetails};

    }

        state = {

        };


        componentWillMount = () => {
            addListener(this)
                console.log(this.props.vaccinationCenterDetails)
        }

        componentWillUnmount = () => {
            removeListener(this)
        }

        onAction({type, payload}) {
            console.log("hello",type,payload);
            console.log(this.state.updateTimeDiffCallbackId);
            console.log(this.props.router.asPath);
            console.log("this",vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED);
            if (type === vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED && payload.callbackId === this.state.updateTimeDiffCallbackId) {
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
                        <Select className={`flex`} value={this.props.vaccinationCenterDetails.appointments_per_hour}
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
                                        <TableCell></TableCell>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.vaccinationCenterDetails.queues.length > 0 &&
                                            this.props.vaccinationCenterDetails.queues.map((item) => {
                                                return <TableRow key={item._id}>
                                                    <TableCell>
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell numeric>
                                                        <IconButton onClick={() => {
                                                            this.setState({currentQueue: item, openAddSlot: true});

                                                        }}>
                                                            <DeleteIcon size={20}/>
                                                        </IconButton>
                                                        <IconButton onClick={() => {
                                                            this.props.dispatch({
                                                                type: REQUEST_DELETE_QUEUE,
                                                                payload: {
                                                                    center_id: this.props.vetCenterDetail._id,
                                                                    queue_id: item._id
                                                                }
                                                            })
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
                            type: vaccinationCenterEvents,ADD_VACCINATION_CENTER_QUEUE,
                            payload: {
                                queue_data: {name: this.state.newQueueName},
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
        }

    }
})(connect(store => store)(checkAdmin(_Index)));

export default Index
