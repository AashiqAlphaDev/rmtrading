import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {authCommands} from "../../../store/domain/auth";
import {AppBar, Toolbar} from "@material-ui/core/index";
import {guardianSelfDetails, petsOfGuardian, vaccinationCenters} from "../../../api/api";
import {Table, TableBody, TableCell, TableHead, TableRow,DialogContent,Dialog,IconButton} from "@material-ui/core/index";
import moment from "moment"
import InputContainer from "../../../components/input";
import {SearchIcon, UserIcon} from "../../../components/icons";
import {Link,Router} from "../../../routes";
import {ChevronLeft} from "@material-ui/icons/index";



let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let gaurdianselfdetails = await guardianSelfDetails(session_id);
        let petsofguardian = await petsOfGuardian(session_id,gaurdianselfdetails._id);
        let vaccinationcenters = await vaccinationCenters(session_id)



        return {petsOfGuardian:petsofguardian,guardianDetails:gaurdianselfdetails,vaccinationCenters:vaccinationcenters};
    }


    componentWillMount = () => {
        console.log("vaccinationCenters",this.props.vaccinationCenters)
        console.log("vaccinationCenters-address",this.props.vaccinationCenters.docs[0].address)
        console.log("vaccinationCenters-contact",this.props.vaccinationCenters.docs[0].contact)
        console.log("vaccinationCenters-queues",this.props.vaccinationCenters.docs[0].queues)

    }

    state = {email:"", password:"",petDetails:{owner:this.props.guardianDetails._id},hideSearchLayout:false};


	render() {
		const {classes} = this.props;
		return <Layout className={classes.body}>
			<Layout flex={1} direction={"column"} style={{borderLeft:"1px solid rgba(0, 0, 0, 0.12)"}}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant={"title"} className={classes.navTitle}>
                            User Dashboard
                        </Typography>
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
                                        Router.pushRoute(`/`)
                                    }}

                                />
                            </Layout>
                        </Layout>
                        <Button onClick={()=>{
                            this.props.dispatch({type:authCommands.USER_LOGOUT})
                        }}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                {
                    !this.state.hideSearchLayout &&
                <Layout justifyContent={"center"} flex={1}>
                <Layout direction={"column"} className={classes.container}>
                    <Layout direction={"column"} className={classes.paper}>
                        <Layout alignItems={"center"}>

                            <Layout direction={"column"} className={classes.iconContainer}>
                        <UserIcon size={80}/>
                            </Layout>

                            <Layout direction={"column"} flex={1}>
                                <Typography variant={"body1"} gutterBottom >
                                    Email: {this.props.guardianDetails.email}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Name : {this.props.guardianDetails.profile.name}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Mobile: {this.props.guardianDetails.profile.mobile_number}
                                </Typography>

                            </Layout>
                        <Layout direction={"column"} alignItems={"flex-end"}>
                            <Typography variant={"body1"} gutterBottom >
                                City: {this.props.guardianDetails.profile.city}
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Address: {this.props.guardianDetails.profile.address}
                            </Typography>
                        </Layout>
                        </Layout>
                    </Layout>
                    <Layout  direction={"column"} flex={1}  >
                        <Layout direction={"column"} className={classes.paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Pet type</TableCell>
                                        <TableCell>Breed</TableCell>
                                        <TableCell>Date of birth</TableCell>
                                        <TableCell>Chip ID</TableCell>
                                        <TableCell><Button size={"small"} onClick={() => {
                                            this.setState({showRegisterPetDialogue: true});
                                        }}>Register Another Pet</Button></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.petsOfGuardian.map((item) => {
                                            return <TableRow>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.data.pet_type}</TableCell>
                                                <TableCell>{item.data.breed}</TableCell>
                                                <TableCell>{moment(item.date_of_birth).format("MMMM Do YYYY")}</TableCell>
                                                <TableCell>{item.chip_id}</TableCell>
                                                <TableCell>
                                                    <Link route={`/user-dashboard/pets/${item._id}`}>
                                                        <Button size={"small"}>View Details</Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Layout>
                    </Layout>



                </Layout>
                </Layout>

                }
                {
                    this.state.hideSearchLayout &&
                    <Layout justifyContent={"center"} flex={1}>
                        <Layout direction={"column"} className={classes.container}>
                            <Layout direction={"column"} className={classes.paper}>
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
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Center Name</TableCell>
                                            <TableCell>Center City</TableCell>
                                            <TableCell>Center Contact Name</TableCell>
                                            <TableCell>Center Contact Phone</TableCell>
                                            <TableCell>Center Contact Email</TableCell>
                                            <TableCell>Center Contact Fax</TableCell>



                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.vaccinationCenters.docs.map((item) => {
                                                return <TableRow>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.address.city}</TableCell>
                                                    <TableCell>{item.contact.name}</TableCell>
                                                    <TableCell>{item.contact.phNo}</TableCell>
                                                    <TableCell>{item.contact.email}</TableCell>
                                                    <TableCell>{item.contact.fax}</TableCell>
                                                </TableRow>
                                            })
                                        }
                                    </TableBody>
                                </Table>

                            </Layout>
                        </Layout>
                    </Layout>

                }

                <Dialog
                    open={this.state.showRegisterPetDialogue}
                    onClose={() => {
                        this.setState({showRegisterPetDialogue: false})
                    }}
                >
                    <DialogContent>
                        <form style={{display: "flex"}} onSubmit={(e) => {
                            e.preventDefault();
                            let uid = uuidv1();
                            this.setState({addPetCallbackId:uid});
                            this.props.dispatch({
                                type: petCommands.ADD_PET,
                                payload: {callbackId: uid, data: {...this.state.petDetails}}
                            });
                        }}>
                            <Layout direction={"column"}>
                                <Typography variant={"title"} gutterBottom>
                                    New Pet's Details
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Provide necessary information to register a Pet.
                                </Typography>

                                <Layout direction={"column"}>
                                    <InputContainer label={"Name"}>
                                        <TextField
                                            value={this.state.petDetails.name|| ''}
                                            onChange={(e) => {
                                                let name = e.target.value;
                                                this.setState((state) => (state.petDetails.name = name, state))
                                            }}
                                            placeholder={"Name"}
                                        />
                                    </InputContainer>

                                    <InputContainer label={"Pet Type"}>
                                        <TextField
                                            value={this.state.petDetails.pet_type|| ''}
                                            onChange={(e) => {
                                                let chip_id = e.target.value;
                                                this.setState((state) => (state.petDetails.pet_type = chip_id, state))
                                            }}
                                            placeholder={"Pet Type"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Breed"}>
                                        <TextField
                                            value={this.state.petDetails.breed|| ''}
                                            onChange={(e) => {
                                                let chip_id = e.target.value;
                                                this.setState((state) => (state.petDetails.breed = chip_id, state))
                                            }}
                                            placeholder={"Breed"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Date of Birth"}>
                                        <TextField
                                            value={this.state.petDetails.date_of_birth|| ''}
                                            onChange={(e) => {
                                                let date_of_birth = e.target.value;
                                                this.setState((state) => (state.petDetails.date_of_birth = date_of_birth, state))
                                            }}
                                            placeholder={"DOB (MM/DD/YYYY)"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Chip ID"}>
                                        <TextField
                                            value={this.state.petDetails.chip_id|| ''}
                                            onChange={(e) => {
                                                let chip_id = e.target.value;
                                                this.setState((state) => (state.petDetails.chip_id = chip_id, state))
                                            }}
                                            placeholder={"Chip ID"}
                                        />
                                    </InputContainer>

                                </Layout>
                                <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                    <Button className={classes.formAction}>Cancel</Button>
                                    <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Register</Button>
                                </Layout>
                            </Layout>
                        </form>
                    </DialogContent>
                </Dialog>
			</Layout>
		</Layout>
	}
};


const Index = withStyles((theme)=>{
	return {
        body:{
            height:"100%"
        },
        sidebar:{
            minWidth:300,
            background:theme.palette.primary.dark,

        },
        sideBarItemTitle:{
            color:"#FFF"
        },
        sideBarActiveItemTitle:{
            color:theme.palette.primary.dark
        },
        sideBarItem:{
            opacity:0.5,
        },
        sideBarActiveItem:{
            background:"#FFF"
        },
        navTitle:{
            flex:1
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
        paper:{
            margin:theme.spacing.unit * 2,
            background:"#FFF",
            padding:theme.spacing.unit * 2,
        },
        container:{
            width:1400
        },
        iconContainer:{

        paddingRight:theme.spacing.unit * 2
        },
        searchContainer: {
            padding: theme.spacing.unit * 2
        }

	}
})(connect(store=>store)(_Index))
export default Index;