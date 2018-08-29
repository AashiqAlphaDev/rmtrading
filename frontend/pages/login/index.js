/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../routes"
import LoopContainer from "../../components/top-bar/index";
import InputContainer from"../../components/input"
import {MenuItemSample} from "../../components/icons";
import {Typography,Card,TextField,Button} from "@material-ui/core/index";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
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
        return <Layout direction={"column"} alignItems={"center"} className={classes.container}>
            <Layout className={classes.imageContainer}>
            <MenuItemSample size={70}/>
            </Layout>
            <Typography variant={"headline"} className={classes.imageContainer}>
                Sign in to Loop
            </Typography>
            <Card>
                 <Layout direction={"column"} className={classes.form}>
                 <InputContainer label={"Username or email address"}>
                    <TextField  value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder={"Username"}></TextField>
                 </InputContainer>
                 <InputContainer label={"Password"}>
                     <TextField value={this.state.username} onChange={(e)=>{this.setState({password:e.target.value})}} placeholder={"Password"}></TextField>
                 </InputContainer>

                    <InputContainer label={" "}>
                     <Button variant={"raised"} color={"primary"} style={{fontSize:12}}>Sign In</Button>
                    </InputContainer>
                 </Layout>
            </Card>

            <Layout className={classes.registerLayout} justifyContent={"center"}>
                <Typography variant={"body1"} >
                    New to loop?
                </Typography>

                <div onClick={()=>{
                    Router.pushRoute(`/register`)
                }}>
                <Typography variant={"body1"}  className={classes.registerLabel}>
                    Create an account.
                </Typography>
                </div>
            </Layout>


        </Layout>


    }
};


const Index = withStyles((theme) => {
    return {
        body:{
            margin:theme.spacing.unit*2
        },
        container:{
            paddingTop:theme.spacing.unit*4,
            backgroundColor:"#F9F9FB",
            flex:1
        },
        imageContainer:{
            paddingBottom:theme.spacing.unit*4
        },
        titleContainer:{
            marginBottom:theme.spacing.unit*2
        },
        form:{
            minWidth:300,
            padding:theme.spacing.unit*3
        },
        registerLayout:{
            marginTop:theme.spacing.unit*2,
            minWidth:300,
            padding:theme.spacing.unit,
            border: `2px solid #d1d1d1`,

        },
        registerLabel:{
        color:"#0000FF"
        }
    }

})(connect(store => store)(_Index))
export default Index;