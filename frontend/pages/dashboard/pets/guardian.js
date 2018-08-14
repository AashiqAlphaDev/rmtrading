import React from "react"
import {PetsWrap} from "./index";
import {withRouter} from "next/router"
import {guardianDetails,petsOfGuardian} from "../../../api/api";
import Layout from "../../../components/layout";
import {Divider,Button, Typography} from "@material-ui/core/index";
import {UserIcon} from "../../../components/icons";
import {withStyles} from "@material-ui/core/styles";
import {Dialog, DialogContent, TextField} from "@material-ui/core/index";
import InputContainer from "../../../components/input";
import {connect} from "react-redux"
import {petCommands} from "../../../store/domain/pet";
import uuidv1 from 'uuid/v1';
import {addListener, removeListener} from "./redux";
import {petEvents} from "../../../store/domain/pet";
import {Router} from "../../../routes"
import {Paper, Table, TableBody, TableCell, TableHead, TableRow,FormControlLabel, RadioGroup,Radio,FormControl,FormLabel} from "@material-ui/core/index";
import {Link} from "../../../routes";
import moment from "moment"




let _Index =  class extends React.Component{

    static async getInitialProps ({query, session_id}) {
        let details = await guardianDetails(session_id, query.guardian_id);
        let pets = await petsOfGuardian(session_id, query.guardian_id);
        console.log(details)
        return {guardianDetails:details, guardianPets:pets};

    }



    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === petEvents.ADD_PET_SUCCEEDED && payload.callbackId === this.state.addPetCallbackId) {
            console.log("inside")
            this.setState({showRegisterPetDialogue: false});
            Router.pushRoute(this.props.router.asPath);
        }
        if (type === petEvents.ADD_PET_FAILED && payload.callbackId === this.state.addPetCallbackId) {
            this.setState({error: payload.response.message});
        }
    }

    state = {
        petDetails:{owner:this.props.guardianDetails._id,sex:"Male",sterilized:"yes"},
        showRegisterPetDialogue:false,


    };



    render(){
        const {classes, route} = this.props;
        return <PetsWrap>
            <Layout direction={"column"} flex={1}>
                <Layout className={classes.topbar} alignItems={"center"}>
                    <UserIcon size={32} pad={10}/>
                    <Layout direction={"column"} flex={1}>
                        <Typography variant={"title"}>
                            {this.props.guardianDetails.profile.name||"Karthik"}
                        </Typography>
                        <Typography variant={"subheading"} color="textSecondary">
                            Guardian - 2 pets
                        </Typography>
                    </Layout>
                    <Layout direction={"column"} flex={1}>
                        <Typography variant={"subheading"} color="textSecondary">
                            {this.props.guardianDetails.profile.mobile_number||"+919901509003"}
                        </Typography>
                        <Typography variant={"subheading"} color="textSecondary">
                            {this.props.guardianDetails.email||"+919901509003"}
                        </Typography>
                    </Layout>
                    <Layout direction={"column"}>
                        <Button size={"small"}>Edit Profile</Button>
                    </Layout>
                </Layout>
                {
                    this.props.guardianPets.length==0 &&
                    <Layout alignItems={"center"} justifyContent={"center"} flex={1} direction={"column"}>
                        You Don't Seem to have any Registered Pet
                        <Button size={"small"} onClick={() => {
                            this.setState({showRegisterPetDialogue: true});
                        }}>Register Pet</Button>
                    </Layout>

                }
                {
                    this.props.guardianPets.length>0 &&
                    <Layout  direction={"column"} flex={1} className={classes.body}>
                        <Layout direction={"column"} className={classes.tableBody}>
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
                                            this.props.guardianPets.map((item) => {
                                                return <TableRow key={item._id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.data.pet_type}</TableCell>
                                                    <TableCell>{item.data.breed}</TableCell>
                                                    <TableCell>{moment(item.date_of_birth).format("MMMM Do YYYY")}</TableCell>
                                                    <TableCell>{item.chip_id}</TableCell>
                                                    <TableCell>
                                                        <Link route={`/dashboard/pets/guardian-details/${this.props.guardianDetails._id}/pets/${item._id}`}>
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

                }
            </Layout>
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
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Gender</FormLabel>

                                <RadioGroup
                                    aria-label="Gender"
                                    name="Gender"
                                    className={classes.group}
                                    value={this.state.petDetails.sex}
                                    onChange={(e)=>{
                                        var val = e.target.value;
                                        this.setState((state) => (state.petDetails.sex = val, state));
                                    }}
                                >


                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />

                                </RadioGroup>

                                </FormControl>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Sterilized</FormLabel>

                                    <RadioGroup
                                        aria-label="Sterilized"
                                        name="Sterilized"
                                        className={classes.group}
                                        value={this.state.petDetails.sterilized}
                                        onChange={(e)=>{
                                            var val = e.target.value;
                                            this.setState((state) => (state.petDetails.sterilized = val, state));
                                        }}
                                    >

                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />

                                    </RadioGroup>

                                </FormControl>






                                <InputContainer label={"Color"}>
                                    <TextField
                                        value={this.state.petDetails.color|| ''}
                                        onChange={(e) => {
                                            let color = e.target.value;
                                            this.setState((state) => (state.petDetails.color = color, state))
                                        }}
                                        placeholder={"Color"}
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
        </PetsWrap>
    }
}





let Index =  withRouter(withStyles((theme)=>{
    return {

        body:{
            margin:theme.spacing.unit * 2

        },
        formControl:{
          marginTop:theme.spacing.unit *2
        },
        group:{
            paddingLeft:theme.spacing.unit * 2,
            flexDirection:"row"
        },

        tableBody:{
            background:"#FFF",
        },
        topbar:{
            padding:theme.spacing.unit,
            background:"#FFF"
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        }
    }
})(connect(store=>store)(_Index)));

export default Index;


