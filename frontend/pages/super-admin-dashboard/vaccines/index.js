import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {vaccinesList} from "../../../api/api";
import {Link} from "../../../routes";
import DashboardContainer from "../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent, TextField,IconButton} from "@material-ui/core/index";
import {DeleteIcon, EditIcon} from "../../../components/icons";
import InputContainer from "../../../components/input";
import {vaccinationCenterCommands, vaccinationCenterEvents} from "../../../store/domain/vaccination-center";
import {removeListener,addListener} from "./redux";
import uuidv1 from 'uuid/v1';
import {Router} from "../../../routes"







let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccine = await vaccinesList();
        return {vaccinesDetails:vaccine};

    }


    componentWillMount = () => {
        console.log(this.props.vaccinesDetails);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        // if (type === vaccinationCenterEvents.ADD_VACCINATION_CENTER_SUCCEEDED && payload.callbackId === this.state.addVaccinationCallbackId) {
        //     this.state.showCreateVaccineDialogue= false;
        //     Router.pushRoute(this.props.router.asPath)
        // }
        //
    }
    state = {vaccineData:{gender:{}},showCreateVaccineDialogue:false};







    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout className={classes.body} direction={"column"}>
                <Layout className={classes.titleContainer} alignItems={"center"} justifyContent={"flex-end"}>
                    <Button type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                        this.setState({showCreateVaccineDialogue:true})
                    }}> + Add Vaccine</Button>
                </Layout>
                <Layout flex={1} direction={"column"}>

                    <Layout className={classes.paper}  direction={"column"}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Diseases	</TableCell>
                                    <TableCell>Pet</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.vaccinesDetails.docs.map((item) => {
                                        return <TableRow>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.diseases}</TableCell>
                                            <TableCell>{item.data.pet_type}</TableCell>
                                            <TableCell>{item.country}</TableCell>
                                            <TableCell><Layout alignItems={"center"}>
                                                <Layout className={classes.toolsContainer}>
                                                    <IconButton onClick={()=>{
                                                        let uid = uuidv1();
                                                        this.setState({deleteVaccinationCallbackId:uid});
                                                        this.props.dispatch({type:vaccinationCenterCommands.DELETE_VACCINATION_CENTER,payload:{callbackId:uid,data:item._id}})
                                                    }}>
                                                        <DeleteIcon size={28}/>
                                                    </IconButton>
                                                </Layout>
                                                <Layout>
                                                    <EditIcon size={28}/>
                                                </Layout>
                                            </Layout>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Layout>
                </Layout>
                <Dialog
                    open={this.state.showCreateVaccineDialogue}
                    onClose={() => {
                        this.setState({showCreateVaccineDialogue: false})
                    }}
                >
                    <DialogContent>
                        <form style={{display: "flex"}} onSubmit={(e) => {
                            e.preventDefault();
                            let uid = uuidv1();
                            this.setState({addVaccinationCallbackId:uid});
                            this.props.dispatch({type:vaccinationCenterCommands.ADD_VACCINATION_CENTER,payload:{callbackId:uid,data:this.state.vaccinationCenterData}})
                        }}>
                            <Layout direction={"column"}>
                                <Typography variant={"title"} gutterBottom>
                                    New Vaccine Details
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Provide necessary information to register a Vaccine .
                                </Typography>
                                <Layout direction={"column"}>
                                    <InputContainer label={"Vaccine Name"}>
                                        <TextField
                                            value={this.state.vaccineData.name|| ''}
                                            onChange={(e) => {
                                                let name = e.target.value;
                                                this.setState((state) => (state.vaccineData.name = name, state))
                                            }}
                                            placeholder={"Vaccine Name"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Disease"}>
                                        <TextField
                                            value={this.state.vaccineData.diseases|| ''}
                                            onChange={(e) => {
                                                let diseases = e.target.value;
                                                this.setState((state) => (state.vaccineData.diseases = diseases, state))
                                            }}
                                            placeholder={"Disease"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Pet Type"}>
                                        <TextField
                                            value={this.state.vaccineData.pet_type|| ''}
                                            onChange={(e) => {
                                                let pet_type = e.target.value;
                                                this.setState((state) => (state.vaccineData.pet_type = pet_type, state))
                                            }}
                                            placeholder={"Pet Type"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Breed"}>
                                        <TextField
                                            value={this.state.vaccineData.breed|| ''}
                                            onChange={(e) => {
                                                let breed = e.target.value;
                                                this.setState((state) => (state.vaccineData.breed = breed, state))
                                            }}
                                            placeholder={"Breed"}
                                        />
                                    </InputContainer>
                                    <InputContainer label={"Country"}>
                                        <TextField
                                            value={this.state.vaccineData.country|| ''}
                                            onChange={(e) => {
                                                let country = e.target.value;
                                                this.setState((state) => (state.vaccineData.country = country, state))
                                            }}
                                            placeholder={"Country"}
                                        />
                                    </InputContainer>

                                    <InputContainer label={"Remarks"}>
                                        <TextField
                                            value={this.state.vaccineData.remarks|| ''}
                                            onChange={(e) => {
                                                let remarks = e.target.value;
                                                this.setState((state) => (state.vaccineData.remarks = remarks, state))
                                            }}
                                            placeholder={"Remarks"}
                                        />
                                    </InputContainer>
                                    {/*gender: {*/}
                                    {/*> 203 |                                     for_male: Boolean,*/}
                                    {/*|                                             ^*/}
                                    {/*204 |                                     for_female: Boolean,*/}
                                    {/*205 |                                 },*/}



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
        </DashboardContainer>
    }
};


const Index = withStyles((theme)=>{
    return {
        body:{
            height:"100%",
            margin:theme.spacing.unit *2
        },
        paper:{
            background:"#fff"
        },
        toolsContainer:{
            marginRight:theme.spacing.unit *2
        },
        titleContainer:{
            marginLeft:theme.spacing.unit * 2,
            marginBottom:theme.spacing.unit *2
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
    }
})(connect(store=>store)(_Index))
export default Index;