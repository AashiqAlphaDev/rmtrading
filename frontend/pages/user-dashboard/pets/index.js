import React from "react"
import Layout from "../../../components/layout";
import {Typography, TextField, Button} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {authCommands} from "../../../store/domain/auth";
import {AppBar, Toolbar} from "@material-ui/core/index";
import {guardianSelfDetails,petsOfGuardian,vaccinationDetails,petDetails,petTypeDetails} from "../../../api/api";
import {Table, TableBody, TableCell, TableHead, TableRow,DialogContent,Dialog} from "@material-ui/core/index";
import moment from "moment"
import InputContainer from "../../../components/input";
import {PetsIcon} from "../../../components/icons";
import {Link} from "../../../routes";


let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let gaurdianselfdetails = await guardianSelfDetails(session_id);
        let petsofguardian = await petsOfGuardian(session_id,gaurdianselfdetails._id);
        let vaccinationdetails = await vaccinationDetails(session_id, query.pet_id);
        let petdetails = await petDetails(session_id, query.pet_id);
        let pettypedetails = await petTypeDetails(session_id,petdetails.pet_type);

        return {petsOfGuardian:petsofguardian,guardianDetails:gaurdianselfdetails,vaccinationDetails:vaccinationdetails,petDetails:petdetails,petTypeDetails:pettypedetails};
    }


    componentWillMount = () => {

        console.log(this.props.vaccinationDetails);
        console.log(this.props.petDetails);
        console.log(this.props.petTypeDetails);

    }

    state = {email:"", password:"",petDetails:{owner:this.props.guardianDetails._id}};


	render() {
		const {classes} = this.props;
		return <Layout className={classes.body}>
			<Layout flex={1} direction={"column"} style={{borderLeft:"1px solid rgba(0, 0, 0, 0.12)"}}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant={"title"} className={classes.navTitle}>
                            User Dashboard
                        </Typography>
                        <Button onClick={()=>{
                            this.props.dispatch({type:authCommands.USER_LOGOUT})
                        }}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Layout justifyContent={"center"} flex={1}>
                <Layout direction={"column"} className={classes.container}>
                    <Layout direction={"column"} className={classes.paper}>
                        <Layout alignItems={"center"}>

                            <Layout direction={"column"} className={classes.iconContainer}>
                        <PetsIcon size={100}/>
                            </Layout>
                            {/*{ _id: '5b5065135ce7c90011927845',*/}
                                {/*owner: '5b4ef7c4907c350011599330',*/}
                                {/*name: 'Posioden',*/}
                                {/*pet_type: '5b290df0c2a0370011d555b6',*/}
                                {/*breed: '5b5065135ce7c90011927844',*/}
                                {/*date_of_birth: '2017-01-01T00:00:00.000Z',*/}
                                {/*chip_id: '2918491234132',*/}
                                {/*data:*/}
                            {/*{ breed: 'sjjdsk',*/}
                                {/*pet_type: 'vet',*/}
                                {/*owner_name: 'Avinash Shekar',*/}
                                {/*owner_mobile: 'slayereborn12@gmail.com',*/}
                                {/*owner_email: '9945532208' },*/}
                                {/*__v: 0 }*/}


                            <Layout direction={"column"} flex={1}>
                                <Typography variant={"body1"} gutterBottom >
                                    Name : {this.props.petDetails.name}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Pet Type : {this.props.petDetails.data.pet_type}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Breed : {this.props.petDetails.data.breed}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom >
                                    Date of Birth : {moment(this.props.petDetails.date_of_birth).format("MMMM Do YYYY")}
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Chip ID : {this.props.petDetails.chip_id}
                                </Typography>
                            </Layout>
                        <Layout direction={"column"} alignItems={"flex-end"}>
                            <Typography variant={"body1"} gutterBottom >
                                Owner Name : {this.props.petDetails.data.owner_name}
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Owner Mobile : {this.props.petDetails.data.owner_mobile}
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Owner Email : {this.props.petDetails.data.owner_email}
                            </Typography>
                        </Layout>
                        </Layout>
                    </Layout>
                    <Layout  direction={"column"} flex={1}  >
                        <Layout direction={"column"} className={classes.paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Vaccine Name</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.vaccinationDetails.docs.map((item,index) => {
                                            return <TableRow>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{item.data.vaccine}</TableCell>
                                                <TableCell>{moment(item.catch_up_period.start).format("MMMM Do YYYY")}</TableCell>
                                                <TableCell>{moment(item.catch_up_period.due_date).format("MMMM Do YYYY")}</TableCell>
                                                <TableCell>{item.status}</TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>

                        </Layout>
                    </Layout>



                </Layout>
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
        }

	}
})(connect(store=>store)(_Index))
export default Index;