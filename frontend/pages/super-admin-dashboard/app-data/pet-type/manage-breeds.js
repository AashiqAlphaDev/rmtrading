import React from "react"
import Layout from "../../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {petTypeList,breedList} from "../../../../api/api";

import DashboardContainer from "../../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent, TextField,IconButton,Checkbox, FormControlLabel} from "@material-ui/core/index";
import {DeleteIcon, EditIcon, PetsIcon} from "../../../../components/icons";
import InputContainer from "../../../../components/input";
import {removeListener,addListener} from "./redux";
import uuidv1 from 'uuid/v1';
import {Router,Link} from "../../../../routes"
import {petTypeEvents,petTypeCommands} from "../../../../store/domain/pet-types";










let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccine = await petTypeList();
        let breedlistdetail = await breedList(query.pet_type_id);
        let querydata = {pet_type_id:query.pet_type_id}
        return {petTypeDetails:vaccine,breedListDetail:breedlistdetail,queryData:querydata};
    }




    componentWillMount = () => {
        console.log(this.props.breedListDetail);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === petTypeEvents.ADD_BREED_SUCCEEDED && payload.callbackId === this.state.addBreedCallbackId) {
            this.setState({showCreateBreedDialogue:false})
            Router.pushRoute(this.props.router.asPath)
        }

        if (type === petTypeEvents.DELETE_BREED_SUCCEEDED && payload.callbackId === this.state.deletePetTypeCallbackId) {
            Router.pushRoute(this.props.router.asPath)
        }
    }
    state = {breedData:{},showCreateBreedDialogue:false};







    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout className={classes.body} direction={"column"}>
                <Layout className={classes.titleContainer} alignItems={"center"} justifyContent={"flex-end"}>
                    <Button type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                        this.setState({showCreateBreedDialogue:true})
                    }}> + Add Breed</Button>
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
                                    this.props.breedListDetail.map((item) => {
                                        return <TableRow key={item._id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell><Layout alignItems={"center"} justifyContent={"flex-end"}>
                                                <Layout className={classes.toolsContainer}>
                                                    <IconButton onClick={()=>{
                                                        let uid = uuidv1();
                                                        this.setState({deletePetTypeCallbackId:uid});
                                                            this.props.dispatch({type:petTypeCommands.DELETE_BREED,payload:{pet_id:this.props.queryData.pet_type_id,breed_id:item._id,callbackId:uid}})
                                                    }}>
                                                        <DeleteIcon size={28}/>
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
                    open={this.state.showCreateBreedDialogue}
                    onClose={() => {
                        this.setState({showCreateBreedDialogue: false})
                    }}
                >
                    <DialogContent>
                        <form style={{display: "flex"}} onSubmit={(e) => {
                            e.preventDefault();
                            let uid = uuidv1();
                            this.setState({addBreedCallbackId:uid});
                            this.props.dispatch({type:petTypeCommands.ADD_BREED,payload:{pet_id:this.props.queryData.pet_type_id,callbackId:uid,data:this.state.breedData}})
                        }}>
                            <Layout direction={"column"}>
                                <Typography variant={"title"} gutterBottom>
                                    New Breed Details
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Provide necessary information to register a Breed .
                                </Typography>
                                <Layout direction={"column"}>
                                    <InputContainer label={"Breed Name"}>
                                        <TextField
                                            value={this.state.breedData.name|| ''}
                                            onChange={(e) => {
                                                let name = e.target.value;
                                                this.setState((state) => (state.breedData.name = name, state))
                                            }}
                                            placeholder={"Breed Name"}
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