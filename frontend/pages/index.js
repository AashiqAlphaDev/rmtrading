import React from "react"
import Layout from "../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"

import {AppBar, Toolbar} from "@material-ui/core/index";
import {vaccinationCenters} from "../api/api";
import {Table, TableBody, TableCell, TableHead, TableRow,IconButton,Dialog, DialogActions, Divider, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core/index";
import {SearchIcon, UserIcon, VetCenterIcon} from "../components/icons";
import {Link} from "../routes";
import {ChevronLeft,ArrowDownward} from "@material-ui/icons/index";




import InputContainer from "../components/input";
import {Collapse} from "@material-ui/core/index";
import {vaccinationCenterCommands} from "../store/domain/vaccination-center";
import {appointmentCommands} from "../store/domain/appointments";
import moment from "moment";

import {addListener, removeListener} from "./redux";



let _Index = class extends React.Component {

    static async getInitialProps ({query,sessionID}) {


        let vaccinationcenters = await vaccinationCenters()



        return {vaccinationCenters:vaccinationcenters};
    }

    componentWillMount = () => {
        console.log(this.props.vaccinationCenters.docs[0].queues[0].time_slots)
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {

    }


    state = {};


    render() {
        const {classes} = this.props;
        return <Layout className={classes.body}>
			<Layout flex={1} direction={"column"} style={{borderLeft:"1px solid rgba(0, 0, 0, 0.12)"}}>
				<AppBar position="static" color="default">
					<Toolbar>
                        <Layout flex={1}>
						<Typography variant={"title"} gutterBottom >
							Home Page
						</Typography>
                        </Layout>
						<Layout className={classes.searchContainer} direction={"column"}>
							<Layout flex={1} direction={"column"}>
								<TextField
									onChange={(e)=>{
                                        // this.props.dispatch({type:petsUiDocActions.SET_QUERY, payload:e.target.value});
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
							<Layout direction={"column"} >
								<Layout alignItems={"center"}>
									<Layout alignItems={"center"}>
										<IconButton onClick={() => {
                                            this.setState({hideSearchLayout: false})
                                        }}>
											<ChevronLeft size={40}/>
										</IconButton>
									</Layout>
									<Layout alignItems={"center"}>

										<Typography variant={"title"} gutterBottom >
											Vaccination Centers
										</Typography>
									</Layout>

								</Layout>
                                        {
                                            this.props.vaccinationCenters.docs.map((item) => {
                                                return <Layout className={classes.paper}>
                                                    <Layout direction={"column"} flex={1}>
                                                        <Layout>
                                                                <VetCenterIcon size={150}/>
                                                                <Layout direction={"column"} justifyContent={"center"} flex={1}>
                                                                    <Typography variant={"body1"} gutterBottom >
                                                                        Center Name : {item.name}
                                                                    </Typography>

                                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                        Center Admin Name : {item.contact.name}
                                                                    </Typography>
                                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                        Center Admin Phone : {item.contact.phNo}
                                                                    </Typography>
                                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                        Center Admin Email : {item.contact.email}
                                                                    </Typography>
                                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                        Center Admin Fax : {item.contact.fax}
                                                                    </Typography>
                                                                </Layout>
                                                                <Layout alignItems={"flex-end"}  justifyContent={"center"} direction={"column"}>
                                                                    <Typography variant={"body1"} gutterBottom >
                                                                        City : {item.address.city}
                                                                    </Typography>
                                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                        Address : {item.address.address}
                                                                    </Typography>
                                                                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                        Zip Code : {item.address.zip_code}
                                                                    </Typography>
                                                                    <Button onClick={()=> {
                                                                        this.setState({selectedCenter:item})
                                                                    	this.props.dispatch({type:appointmentCommands.FETCH_AVAILABLE_APPOINTMENTS,payload:{vaccination_center_id:item._id,date:moment().format("M.D.YYYY")}})
                                                                    }}>Book An Appointment</Button>
                                                                    <Layout alignItems={"center"}>
                                                                    </Layout>
                                                                </Layout>
                                                        </Layout>
                                                        <Collapse in={this.state.selectedCenter==item}>
                                                            <Divider/>
                                                        <Layout direction={"column"} className={classes.line}>
                                                            <Typography variant={"title"} gutterBottom>
                                                                Book An Appointment
                                                            </Typography>
                                                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                Provide necessary information to Book An Appointment.
                                                            </Typography>
                                                            <Typography variant={"title"} gutterBottom className={classes.line}>
                                                                Select A Slot
                                                            </Typography>
                                                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                                Select a slot from the available slots
                                                            </Typography>


                                                            <Layout className={classes.timeContainer}>
                                                            {this.props.appointments.availableSlots && this.state.selectedCenter &&

                                                            this.props.appointments.availableSlots.map((item)=>{
                                                               var  timeLabel =  null;
                                                                (() => {
                                                                    var hour = item.slotIndex/this.state.selectedCenter.appointments_per_hour
                                                                    var min = (60 / this.state.selectedCenter.appointments_per_hour) * (item.slotIndex % this.state.selectedCenter.appointments_per_hour);
                                                                    timeLabel = `${(`0${Math.floor(hour)}`).slice(-2)}:${(`0${min}`).slice(-2)}`;
                                                                })();
                                                                return <div className={(this.state.selectedSlot==item)? classes.selectedSlotContainer:classes.unselectedSlotContainer}  onClick={()=>{this.setState({selectedSlot:item})}}>
                                                                    <Typography variant={"body1"} className={(this.state.selectedSlot==item)? classes.selectedSlotTextColor:classes.unselectedSlotTextColor}>
                                                                        {timeLabel}
                                                                    </Typography>
                                                                </div>
                                                            })
                                                            }
                                                            </Layout>
                                                        </Layout>
                                                        <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                                            <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                                                                this.setState({showBookieDetailDialouge:true})

                                                            }}>Proceed</Button>
                                                        </Layout>
                                                        </Collapse>
                                                    </Layout>

                                                            </Layout>
                                            })
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

                                        this.props.dispatch({
                                            type: vaccinationCenterCommands.ADD_VACCINATION_CENTER_QUEUE,
                                            payload: {
                                                callbackId: uid,
                                                data:{name: this.state.newQueueName},

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
							</Layout>
						</Layout>
					</Layout>
			</Layout>
		</Layout>
    }
};


const Index = withStyles((theme)=>{
    return {
        body: {
            height: "100%"
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

            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "10px",
            gridAutoRows: "minmax(100px, auto)",
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
        selectedSlotTextColor: {
            color: "#fff"
        },
        unselectedSlotTextColor: {
            color: "#a4a4a4"
        }
    }

})(connect(store=>store)(_Index))
export default Index;