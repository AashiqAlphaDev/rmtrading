import React from "react"
import {PetsWrap} from "./index";
import {withRouter} from "next/router"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Link,Router} from "../../../routes"
import {petDetails,guardianDetails,visitsDetails} from "../../../api/api";
import {Typography,Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogContent,Slide} from "@material-ui/core/index";
import moment from "moment"
import {PetsIcon} from "../../../components/icons";
import {Button} from "@material-ui/core/index";
import {visitCommands,visitEvents} from "../../../store/domain/visit";
import uuidv1 from 'uuid/v1';
import {addListener, removeListener} from "./redux";
import _ from "underscore";
import QrReader from 'react-qr-reader';
import {tokenCommands} from "../../../store/domain/token";



function Transition(props) {
    return <Slide direction="up" {...props} />;
}




let _Index =  class extends React.Component{

    static async getInitialProps ({query, session_id}) {
         let petdetails = await petDetails(session_id, query.pet_id);
         let visitdetails= await visitsDetails(session_id,query.pet_id);
        let guardiandetails = await guardianDetails(session_id, query.guardian_id);
        let tokenDetail ={pet_id:query.pet_id,guardian_id:query.guardian_id};
         return {petDetails:petdetails,guardianDetails:guardiandetails,visitDetails:visitdetails,tokenDetail};

    }

    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        console.log("this is payload",payload)

        if (type === visitEvents.ADD_VISIT_SUCCEEDED && payload.callbackId === this.state.addVisitCallbackId) {
            Router.pushRoute(`/dashboard/pets/guardian-details/${this.props.guardianDetails._id}/pets/${this.props.petDetails._id}/visits/${payload.response._id}`)
        }
        if (type === visitEvents.ADD_VISIT_FAILED && payload.callbackId === this.state.addVisitCallbackId) {
            if(payload.response.data){
                this.setState({error: payload.response.message});
            }
            else{
                this.setState({error: payload.response.message});
            }
        }
    }


    state = {showScanner:false};



    render(){
        const {classes} = this.props;
        return <PetsWrap>
            <Layout flex={1} direction={"column"}>
                <Layout>
                    <Layout direction={"column"} className={classes.leftCard} flex={1}>
                        <Layout>
                            <PetsIcon size={30}/>
                    <Typography variant={"title"} className={classes.iconLine}>
                        {this.props.petDetails.name}
                    </Typography>
                        </Layout>
                    <Typography variant={"subheading"} color="textSecondary" className={classes.line}>
                        ({this.props.petDetails.data.pet_type}) Owned By {this.props.petDetails.data.owner_name}
                    </Typography>
                    <Typography className={classes.line}>
                        Age : {moment().diff(this.props.petDetails.date_of_birth, 'years') == 0? "":moment().diff(this.props.petDetails.date_of_birth, 'years') + " Year"} {moment().diff(this.props.petDetails.date_of_birth, 'months')%12 == 0 ? "":moment().diff(this.props.petDetails.date_of_birth, 'months')%12 +" Months"}
                    </Typography>
                        <Typography className={classes.line}>
                        Date of Birth : {moment(this.props.petDetails.date_of_birth).format("MMMM Do YYYY")}
                        </Typography>
                        <Layout flex={1} alignItems={"flex-end"} justifyContent={"center"} className={classes.buttonContainer}>
                    <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{this.setState({showScanner:true}); console.log("hi")}}>Assign Card</Button>
                        </Layout>
                </Layout>
                <Layout className={classes.rightCard} flex={3}  direction={"column"}>
                    {_.isEmpty(this.props.visitDetails) &&
                        <Layout direction={"column"} flex={1} alignItems={"center"} justifyContent={"center"}>
                        <Typography className={classes.line}>
                            No Records Found
                        </Typography>

                        < Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                        let uid = uuidv1();
                        this.setState({addVisitCallbackId:uid});
                        this.props.dispatch({type:visitCommands.ADD_VISIT,payload:{callbackId: uid,data:{user:this.props.petDetails.owner,pet:this.props.petDetails._id,pet_type:this.props.petDetails.pet_type}}})

                    }}>Add Visit</Button>
                        </Layout>
                    }

                        {
                            !(_.isEmpty(this.props.visitDetails)) &&
                                <Layout >
                                    <Layout flex={4}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Visit No</TableCell>
                                        <TableCell>Vet Center</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.visitDetails.map((item,index) => {
                                            return <TableRow>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{item.data.vet_center}</TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                                    </Layout>
                                <Layout direction={"column"} flex={1} className={classes.rightButton}>
                            <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                        let uid = uuidv1();
                        this.setState({addVisitCallbackId:uid});
                        this.props.dispatch({type:visitCommands.ADD_VISIT,payload:{callbackId: uid,data:{user:this.props.petDetails.owner,pet:this.props.petDetails._id,pet_type:this.props.petDetails.pet_type}}})
                    }}> + Add Visit</Button>
                                </Layout>
                                </Layout>
                    }




                </Layout>



            </Layout>

            </Layout>
            <Dialog
                TransitionComponent={Transition}
                open={this.state.showScanner}
                onClose={() => {
                    this.setState({showScanner: false})
                }}
            >
                <DialogContent>
                    <QrReader
                        delay={this.state.delay}
                        onError={(err) => {
                            console.log(err)
                        }}
                        onScan={(result) => {
                            console.log(result)
                             if (result) {
                                 this.props.dispatch({
                                     type: tokenCommands.UPDATE_TOKEN,
                                     payload: {token_id: result, data: {pet: this.props.tokenDetail.pet_id,owner:this.props.tokenDetail.guardian_id}}
                                 });
                                 this.setState({showScanner: false});
                             }
                        }}
                        style={{width: 400, height: 400}}
                    />
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
        leftCard:{
            padding:theme.spacing.unit * 2,
            background:"#FFF",
            margin:theme.spacing.unit,
            height:250
        },
        rightCard:{
            background:"#FFF",
            margin:theme.spacing.unit,
            padding:theme.spacing.unit * 2,
            minHeight:250
        },
        rightButton:{
            marginLeft:theme.spacing.unit *2
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
        },
        buttonContainer:{
            paddingBottom:theme.spacing.unit *2
        },
        iconLine:{
            marginLeft:5
        },
        line:{
            marginTop:theme.spacing.unit *1,
            marginBottom:theme.spacing.unit *1
        }
    }
})(connect(store=>store)(_Index)));

export default Index;


