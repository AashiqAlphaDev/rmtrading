import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Layout from "../../../components/layout";
import {raiseEvent} from "../../../components/util";
import {appointmentsUiEvents} from "./store/saga";






class _Index extends React.Component {
    componentWillMount=raiseEvent(appointmentsUiEvents.APPOINTMENTS_MENU_ITEM_WILL_LOAD,this)
    render(){
        const {classes} = this.props;
        return <Layout>

            {JSON.stringify(this.props)}



            Appointments
        </Layout>
    }
}

const Index = connect(store => store)(withStyles((theme) => {
    return {
        body:{
            overflow:"scroll"
        },
        content:{
            marginTop:theme.spacing.unit*2,
        },
        listCard:{
            flex:1,
            minWidth:200,
            margin:theme.spacing.unit*1
        },
        listTitle:{
            padding:theme.spacing.unit*2
        },
        card:{
            flex:1,
            minWidth:200,
            margin:theme.spacing.unit*1,
            padding:theme.spacing.unit*2
        },
        cardInfo:{
            marginLeft:theme.spacing.unit*2,
        }
    }
})(_Index));

export default Index































// import React from "react"
// import {Paper} from "@material-ui/core/index";
// import AnnotatedSection from "../../../components/annotated-section";
// import {withStyles} from "@material-ui/core/styles/index";
// import InputContainer from "../../../components/input"
// import {connect} from "react-redux";
// import style from "../style";
// import _ from "underscore"
// import {
//     REQUEST_ADD_QUEUE, REQUEST_ADD_SLOT,
//     REQUEST_DELETE_QUEUE, REQUEST_DELETE_SLOT, REQUEST_UPDATE_SLOT_INTERVAL,
//     REQUEST_VET_CENTER_FETCH
// } from "../../../stores/vet-centers/actions";
// import {
//     Avatar,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     Divider,
//     IconButton,
//     List,
//     ListItem,
//     ListItemSecondaryAction,
//     ListItemText,
//     MenuItem,
//     Select, Table, TableBody, TableCell, TableHead, TableRow,
//     TextField,
//     Typography
// } from "@material-ui/core/es/index";
// import Add from '@material-ui/icons/Add';
// import {CameraTimerIcon, DeleteIcon, EditIcon} from "mdi-react";
// import Layout from "../../../components/layout";
// import {Delete} from "@material-ui/icons/es/index";
//
// let Index = withStyles((theme) => {
//     return {
//         ...style(theme),
//         actions: {
//             marginTop: theme.spacing.unit * 4
//         },
//         paper: {
//             marginLeft: theme.spacing.unit * 1,
//             marginRight: theme.spacing.unit * 1,
//             display: "flex"
//         },
//         section: {
//             flex: 1
//         },
//         dialog: {
//             minWidth: 500
//         },
//         body: {
//             marginTop: theme.spacing.unit * 2
//         },
//         title: {
//             padding: theme.spacing.unit * 2
//         },
//         icon: {
//             border: `2px solid ${theme.palette.grey['200']}`,
//             background: "none",
//             padding:10,
//             margin:theme.spacing.unit * 2
//         },
//         sidePanel:{
//             padding: theme.spacing.unit * 2,
//             alignItems:"center",
//             justifyContent:"center",
//             minHeight:240,
//             width:350
//         },
//         sidePanelTitle:{
//             paddingBottom:10
//         }
//     }
// })(class extends React.Component {
//
//
//     state = {
//         openAddQueue: false,
//         openAddSlot: false,
//         newQueueName: "",
//         newSlotFrom: 0,
//         newSlotTo: 0,
//         currentQueue: null
//     };
//
//     componentWillMount() {
//         this.props.onPageChange("/admin/dashboard/appointments");
//         this.props.dispatch({type: REQUEST_VET_CENTER_FETCH, payload: {center_id: "self"}})
//     }
//
//     componentWillReceiveProps(nextProps) {
//         if (nextProps.vetCenterDetail.addedQueue) {
//             this.setState({openAddQueue: false, newQueueName: ""});
//         }
//         if (this.state.currentQueue) {
//             this.setState({
//                 currentQueue: _.find(this.props.vetCenterDetail.queues, (item) => {
//                     return item._id === this.state.currentQueue._id
//                 })
//             });
//         }
//     }
//
//     render() {
//         const {classes} = this.props;
//         if (this.props.vetCenterDetail._id) {
//             return <Layout direction={"column"} flex={1} className={classes.body}>
//                 <Layout className={`container ${classes.flex}`} direction={"column"}>
//                     <Layout alignItems={"flex-start"}>
//                         <Paper className={`${classes.paper} flex`} elevation={0}>
//                             <Layout direction={"column"} flex={1}>
//                                 <Layout className={classes.title}>
//                                     <Typography variant="title" gutterBottom className={`flex`}>
//                                         Appointment Queues
//                                     </Typography>
//                                     <Button size={"small"} color={`primary`} variant={`raised`} onClick={() => {
//                                         this.setState({openAddQueue: true});
//                                     }}>
//                                         <Add/>
//                                         Add Queue
//                                     </Button>
//                                 </Layout>
//                                 <Table>
//                                     <TableHead>
//                                         <TableCell>Name</TableCell>
//                                         <TableCell></TableCell>
//                                     </TableHead>
//                                     <TableBody>
//                                         {
//                                             this.props.vetCenterDetail.queues.length > 0 &&
//                                             this.props.vetCenterDetail.queues.map((item) => {
//                                                 return <TableRow key={item._id}>
//                                                     <TableCell>
//                                                         {item.name}
//                                                     </TableCell>
//                                                     <TableCell numeric>
//                                                         <IconButton onClick={() => {
//                                                             this.setState({currentQueue: item, openAddSlot: true});
//
//                                                         }}>
//                                                             <EditIcon/>
//                                                         </IconButton>
//                                                         <IconButton onClick={() => {
//                                                             this.props.dispatch({
//                                                                 type: REQUEST_DELETE_QUEUE,
//                                                                 payload: {
//                                                                     center_id: this.props.vetCenterDetail._id,
//                                                                     queue_id: item._id
//                                                                 }
//                                                             })
//                                                         }}>
//                                                             <DeleteIcon/>
//                                                         </IconButton>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             })
//                                         }
//                                         {
//                                             (this.props.vetCenterDetail.queues.length === 0) &&
//                                             <TableCell>No Queues Created</TableCell>
//                                         }
//                                     </TableBody>
//                                 </Table>
//                             </Layout>
//                         </Paper>
//                         <Paper className={`${classes.paperPage} ${classes.paper} ${classes.sidePanel}`}>
//                             <Layout direction={"column"} alignItems={"center"} flex={1}>
//                                 <Avatar className={classes.icon}>
//                                     <CameraTimerIcon size={48} />
//                                 </Avatar>
//                                 <Typography variant="title" gutterBottom align={"center"} >
//                                     Number of
//                                 </Typography>
//                                 <Typography variant="title" gutterBottom className={classes.sidePanelTitle} align={"center"} >
//                                     appointments per hour
//                                 </Typography>
//                                 <Layout>
//                                     <Select className={`flex`} value={this.props.vetCenterDetail.appointments_per_hour}
//                                             style={{width:230,paddingBottom:10}}
//                                             onChange={(e) => {
//                                                 this.props.dispatch({
//                                                     type: REQUEST_UPDATE_SLOT_INTERVAL,
//                                                     payload: {
//                                                         slot_interval: e.target.value,
//                                                         center_id: this.props.vetCenterDetail._id
//                                                     }
//                                                 });
//                                             }}>
//                                         {
//                                             [1, 2, 3, 4].map((item) => {
//                                                 return <MenuItem key={item} value={item}>
//                                                     {item}
//                                                 </MenuItem>
//                                             })
//                                         }
//                                     </Select>
//                                 </Layout>
//                             </Layout>
//                         </Paper>
//                     </Layout>
//                     <Dialog
//                         open={this.state.openAddQueue}
//                         onClose={() => {
//                             this.setState({openAddQueue: false})
//                         }}
//                         aria-labelledby="form-dialog-title"
//                     >
//                         <form onSubmit={(event) => {
//                             event.preventDefault();
//                             this.props.dispatch({
//                                 type: REQUEST_ADD_QUEUE,
//                                 payload: {
//                                     queue_data: {name: this.state.newQueueName},
//                                     center_id: this.props.vetCenterDetail._id
//                                 }
//                             });
//                         }}>
//                             <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//                             <DialogContent>
//
//                                 <DialogContentText>
//                                     <Typography gutterBottom>
//                                         To subscribe to this website, please enter your email address here. We will
//                                         send
//                                         updates occasionally.
//                                     </Typography>
//                                 </DialogContentText>
//                                 <InputContainer label={"Queue Name"}>
//                                     <TextField
//                                         autoFocus
//                                         type="Queue Name"
//                                         fullWidth
//                                         onChange={(event) => {
//                                             this.setState({newQueueName: event.target.value})
//                                         }}
//                                     />
//                                 </InputContainer>
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button onClick={() => {
//                                     this.setState({openAddQueue: false})
//                                 }} color="primary">
//                                     Cancel
//                                 </Button>
//                                 <Button type="submit" color="primary">
//                                     Add
//                                 </Button>
//                             </DialogActions>
//                         </form>
//                     </Dialog>
//                     {
//                         this.state.currentQueue &&
//                         <Dialog
//                             open={this.state.openAddSlot}
//                             onClose={() => {
//                                 this.setState({openAddSlot: false})
//                             }}
//                         >
//                             <form className={classes.dialog} onSubmit={(event) => {
//                                 event.preventDefault();
//                                 this.props.dispatch({
//                                     type: REQUEST_ADD_SLOT,
//                                     payload: {
//                                         slot_data: {from: this.state.newSlotFrom, to: this.state.newSlotTo},
//                                         center_id: this.props.vetCenterDetail._id,
//                                         queue_id: this.state.currentQueue._id
//                                     }
//                                 });
//                             }}>
//                                 <DialogTitle>Manage Slots</DialogTitle>
//                                 <DialogContent>
//                                     <Divider/>
//                                     <Layout direction={`column`}>
//                                         <List>
//                                             {
//                                                 this.state.currentQueue.time_slots.map((item) => {
//                                                     var fromLabel = null;
//                                                     var toLabel = null;
//                                                     (() => {
//                                                         var hour = (item.from) / this.props.vetCenterDetail.appointments_per_hour;
//                                                         var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (item.from % this.props.vetCenterDetail.appointments_per_hour);
//                                                         fromLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
//                                                     })();
//                                                     (() => {
//                                                         var hour = (item.to) / this.props.vetCenterDetail.appointments_per_hour;
//                                                         var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (item.to % this.props.vetCenterDetail.appointments_per_hour);
//                                                         toLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
//                                                     })();
//                                                     return <ListItem key={item._id}>
//                                                         <ListItemText>
//                                                             {fromLabel} - {toLabel}
//                                                         </ListItemText>
//                                                         <ListItemSecondaryAction>
//                                                             <IconButton onClick={() => {
//                                                                 this.props.dispatch({
//                                                                     type: REQUEST_DELETE_SLOT,
//                                                                     payload: {
//                                                                         center_id: this.props.vetCenterDetail._id,
//                                                                         queue_id: this.state.currentQueue._id,
//                                                                         slot_id: item._id
//                                                                     }
//                                                                 })
//                                                             }}>
//                                                                 <Delete/>
//                                                             </IconButton>
//                                                         </ListItemSecondaryAction>
//                                                     </ListItem>
//                                                 })
//                                             }
//                                             {
//                                                 this.state.currentQueue.time_slots.length === 0 &&
//                                                 <ListItem>No Slots Added</ListItem>
//                                             }
//                                         </List>
//                                     </Layout>
//                                     <Divider/>
//                                     <Layout className={classes.paper} alignItems={`flex-end`}>
//                                         <InputContainer label={"From"}>
//                                             <Select value={parseInt(this.state.newSlotFrom)} onChange={e => {
//                                                 this.setState({newSlotFrom: e.target.value})
//                                             }}>
//                                                 {
//                                                     _.range(24 * this.props.vetCenterDetail.appointments_per_hour).map((i) => {
//                                                         var hour = (i) / this.props.vetCenterDetail.appointments_per_hour;
//                                                         var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (i % this.props.vetCenterDetail.appointments_per_hour);
//                                                         return <MenuItem key={i}
//                                                                          value={i}>{("0" + Math.floor(hour)).slice(-2)}:{("0" + min).slice(-2)}</MenuItem>
//                                                     })
//                                                 }
//                                             </Select>
//                                         </InputContainer>
//                                         <InputContainer label={"To"}>
//                                             <Select value={parseInt(this.state.newSlotTo)} onChange={e => {
//                                                 this.setState({newSlotTo: e.target.value})
//                                             }}>
//                                                 {
//                                                     _.range(24 * this.props.vetCenterDetail.appointments_per_hour).map((i) => {
//                                                         var hour = (i) / this.props.vetCenterDetail.appointments_per_hour;
//                                                         var min = (60 / this.props.vetCenterDetail.appointments_per_hour) * (i % this.props.vetCenterDetail.appointments_per_hour);
//                                                         return <MenuItem key={i}
//                                                                          value={i}>{("0" + Math.floor(hour)).slice(-2)}:{("0" + min).slice(-2)}</MenuItem>
//                                                     })
//                                                 }
//                                             </Select>
//                                         </InputContainer>
//                                         <Button type="submit" color="primary">
//                                             Add
//                                         </Button>
//                                     </Layout>
//                                 </DialogContent>
//                             </form>
//                         </Dialog>
//                     }
//                 </Layout>
//             </Layout>;
//         } else {
//             return <div></div>
//         }
//     }
// });
//
// export default connect(store => store)(Index);