import React from "react"
import Layout from "../../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {petTypeDetail,breedList} from "../../../../api/api";
import {Link} from "../../../../routes";
import DashboardContainer from "../../../../components/super-admin-dashboard/index";
import {Table, TableBody, TableCell, TableHead, TableRow,Typography,Button,Dialog, DialogContent,Chip, TextField,IconButton,Checkbox, FormControlLabel} from "@material-ui/core/index";
import {DeleteIcon, EditIcon} from "../../../../components/icons";
import InputContainer from "../../../../components/input";
import {removeListener,addListener} from "./redux";
import uuidv1 from 'uuid/v1';
import {Router} from "../../../../routes"
import {petTypeEvents,petTypeCommands} from "../../../../store/domain/pet-types";
import _ from "underscore"










let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let pettypedetail = await petTypeDetail(query.pet_type_id);
        return {petTypeDetails:pettypedetail};


    }




    componentWillMount = () => {

        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === petTypeEvents.UPDATE_PET_TYPE_SUCCEEDED && payload.callbackId === this.state.updateLifeSpanPetTypeCallbackId) {

            Router.pushRoute(this.props.router.asPath)
        }
        if (type === petTypeEvents.UPDATE_PET_TYPE_SUCCEEDED && payload.callbackId === this.state.updateBiometricsPetTypeCallbackId) {

            Router.pushRoute(this.props.router.asPath)
        }
        if (type === petTypeEvents.UPDATE_PET_TYPE_SUCCEEDED && payload.callbackId === this.state.deleteBiometricsPetTypeCallbackId) {

            Router.pushRoute(this.props.router.asPath)
        }


    }
    state = {petTypeData:{}};







    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout className={classes.body} direction={"column"}>

                <Layout flex={1} direction={"column"}>
                    <Layout   direction={"column"} >
                        <Layout  className={classes.topPaper}>
                            <Layout direction={"column"} >
                                <Typography variant={"title"} gutterBottom>
                                    Biometric Fields
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    Kindly add the Biometric Fields of a {this.props.petTypeDetails.name}.
                                </Typography>
                                <InputContainer label={"Field Name"} >
                                    <TextField
                                        value={this.state.petTypeData.biometric_name|| ''}
                                        onChange={(e) => {
                                            let biometric_name = e.target.value;
                                            this.setState((state) => (state.petTypeData.biometric_name = biometric_name, state))
                                        }}
                                        placeholder={"Field Name"}
                                    />
                                </InputContainer>
                                <Layout className={classes.formActions}>
                                <Button variant={"raised"} color={"primary"} onClick={()=>{
                                    let uid = uuidv1();
                                    this.setState({updateBiometricsPetTypeCallbackId:uid})
                                    this.props.dispatch({type:petTypeCommands.UPDATE_PET_TYPE,payload:{data:{$push: {vaccination_fields: {name:this.state.petTypeData.biometric_name, field_type:"String"}}},callbackId:uid,pet_id:this.props.petTypeDetails._id}})
                                }}>Update Biometric Field</Button>
                                </Layout>
                            </Layout>
                            {
                                _.isEmpty(this.props.petTypeDetails.vaccination_fields) &&
                            <Layout direction="column" alignItems={"flex-end"} justifyContent={"center"}  className={classes.rightSection} flex={1}>
                                        <Layout direction={"column"}>
                                            <Typography variant={"title"} gutterBottom color={"textSecondary"}>
                                                Ooops!
                                            </Typography>
                                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                                There are Currently no Biometrics For this Pet Type
                                            </Typography>
                                        </Layout>
                            </Layout>
                            }
                            {
                                !_.isEmpty(this.props.petTypeDetails.vaccination_fields) &&
                                <Layout direction="column" alignItems={"flex-end"}  flex={1} className={classes.rightSection}>
                                    <Typography variant={"title"} gutterBottom>
                                        Current Fields
                                    </Typography>
                                    <Layout direction={"column"}>
                                        {
                                            this.props.petTypeDetails.vaccination_fields.map((item)=>{
                                                return <Chip
                                                    key={item._id}
                                                    label={item.name}
                                                    onDelete={()=>{
                                                        let uid = uuidv1();
                                                        this.setState({deleteBiometricsPetTypeCallbackId:uid})
                                                        this.props.dispatch({type:petTypeCommands.UPDATE_PET_TYPE,payload:{data:{$pull: {vaccination_fields: {name:item.name}}},callbackId:uid,pet_id:this.props.petTypeDetails._id}})
                                                    }}
                                                    className={classes.chip}
                                                />
                                            })
                                        }
                                    </Layout>
                                </Layout>
                            }
                        </Layout>
                        <Layout  className={classes.paper}>
                            <Layout direction={"column"} className={classes.leftSection}>
                                <Typography variant={"title"} gutterBottom>
                                    Update Lifespan of Pet Type
                                </Typography>
                                <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                    This effects the vaccination schedule Generation Kindly Enter the right details .
                                </Typography>
                                    {
                                        this.props.petTypeDetails.life_span &&
                                        <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                            Current Life Span : {this.props.petTypeDetails.life_span}
                                        </Typography>

                                    }
                                <InputContainer label={"Life Span"}>
                                    <TextField
                                        value={this.state.petTypeData.life_span|| ''}
                                        onChange={(e) => {
                                            let life_span = e.target.value;
                                            this.setState((state) => (state.petTypeData.life_span = life_span, state))
                                        }}
                                        placeholder={"Life Span"}
                                    />
                                </InputContainer>
                            </Layout>
                            <Layout alignItems={"center"} justifyContent={"flex-end"} flex={1} className={classes.rightSection}>
                                <Button variant={"raised"} color={"primary"} onClick={()=>{
                                    let uid = uuidv1();
                                    this.setState({updateLifeSpanPetTypeCallbackId:uid})
                                        this.props.dispatch({type:petTypeCommands.UPDATE_PET_TYPE,payload:{data:{life_span:this.state.petTypeData.life_span},callbackId:uid,pet_id:this.props.petTypeDetails._id}})
                                }}>Update Life Span</Button>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
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
            padding:theme.spacing.unit *2
        },
        topPaper:{
            background:"#fff",
            padding:theme.spacing.unit * 2,
            minHeight:200,
            marginBottom:theme.spacing.unit*2
        },
        chip:{
            margin: theme.spacing.unit
        },
        rightSection:{
          paddingRight:theme.spacing.unit *5
        },
        leftSection:{
            padding:theme.spacing.unit *2
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