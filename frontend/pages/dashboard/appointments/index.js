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
import {Avatar, MenuItem, Select, Typography,Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core/index";
import Layout from "../../../components/layout";
import {vaccinationCenterCommands as vaccinationCenterEvents} from "../../../store/domain/appointment";
import uuidv1 from 'uuid/v1';


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
            if (type === vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED && payload.callbackId === this.state.updateTimeDiffCallbackId) {
                console.log("hisss")
                Router.pushRoute(this.props.router.asPath);
            }

        }

        render() {
            const {classes} = this.props;
            return <DashboardContainer>
                <Layout direction={"column"} flex={1}>
                    <Layout>
                <Layout direction={"column"} alignItems={"center"} flex={1} className={classes.card}>
                    <Avatar className={classes.icon}>
                        <AppointmentsIcon size={48} />
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
                                         type: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER,
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
                                    <Typography variant="title" gutterBottom className={`flex`}>
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

            </DashboardContainer>
        }
    }
;

let Index = withStyles((theme) => {
    return {
        card:{
            background: "#FFF",
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
        }
    }
})(connect(store => store)(checkAdmin(_Index)));

export default Index
