import React from "react"
import Layout from "../../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {petTypeList} from "../../../../api/api";

import DashboardContainer from "../../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent, TextField,IconButton,Checkbox, FormControlLabel} from "@material-ui/core/index";
import {DeleteIcon, EditIcon} from "../../../../components/icons";
import InputContainer from "../../../../components/input";
import {removeListener,addListener} from "./redux";
import uuidv1 from 'uuid/v1';
import {Router,Link} from "../../../../routes"
import {petTypeEvents,petTypeCommands} from "../../../../store/domain/pet-types";










let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccine = await petTypeList();
        return {petTypeDetails:vaccine};

    }




    componentWillMount = () => {
        console.log(this.props.petTypeDetails);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === petTypeEvents.ADD_PET_TYPE_SUCCEEDED && payload.callbackId === this.state.addPetTypeCallbackId) {
            this.state.showCreatePetTypeDialogue= false;
            Router.pushRoute(this.props.router.asPath)
        }

        if (type === petTypeEvents.DELETE_PET_TYPE_SUCCEEDED && payload.callbackId === this.state.deletePetTypeCallbackId) {
            Router.pushRoute(this.props.router.asPath)
        }

    }
    state = {petTypeData:{},showCreatePetTypeDialogue:false};







    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout className={classes.body} direction={"column"}>
                <Layout className={classes.titleContainer} alignItems={"center"} justifyContent={"flex-end"}>
                    <Button type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                        this.setState({showCreatePetTypeDialogue:true})
                    }}> + Add Pet Type</Button>
                </Layout>
                <Layout flex={1} direction={"column"}>

                    <Layout   direction={"column"} className={classes.paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.petTypeDetails.map((item) => {
                                        return <TableRow>
                                            <TableCell>{item.name}</TableCell>

                                            <TableCell><Layout alignItems={"center"} justifyContent={"flex-end"}>
                                                <Layout className={classes.toolsContainer}>
                                                    <IconButton onClick={()=>{
                                                        let uid = uuidv1();
                                                        this.setState({deletePetTypeCallbackId:uid});
                                                        this.props.dispatch({type:petTypeCommands.DELETE_PET_TYPE,payload:{callbackId:uid,data:item._id}})
                                                    }}>
                                                        <DeleteIcon size={28}/>
                                                    </IconButton>
                                                </Layout>
                                                <Layout>
                                                    <IconButton onClick={()=>{
                                                        Router.pushRoute(`/super-admin-dashboard/app-data/pet-type/${item._id}`)
                                                    }}>

                                                    <EditIcon size={28}/>

                                                    </IconButton>
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
                    open={this.state.showCreatePetTypeDialogue}
                    onClose={() => {
                        this.setState({showCreatePetTypeDialogue: false})
                    }}
                >
                    <DialogContent>
                        <form style={{display: "flex"}} onSubmit={(e) => {
                            e.preventDefault();
                            let uid = uuidv1();
                            this.setState({addPetTypeCallbackId:uid});
                            this.props.dispatch({type:petTypeCommands.ADD_PET_TYPE,payload:{callbackId:uid,data:this.state.petTypeData}})
                        }}>
                            <Layout direction={"column"}>
                                <Typography variant={"title"} gutterBottom>
                                    New Vaccine Details
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Provide necessary information to register a Vaccine .
                                </Typography>
                                <Layout direction={"column"}>
                                    <InputContainer label={"Pet Type Name"}>
                                        <TextField
                                            value={this.state.petTypeData.name|| ''}
                                            onChange={(e) => {
                                                let name = e.target.value;
                                                this.setState((state) => (state.petTypeData.name = name, state))
                                            }}
                                            placeholder={"Pet Type Name"}
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
            background:"#fff",


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