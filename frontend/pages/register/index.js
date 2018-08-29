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
import {Typography,Card,TextField,Button,Divider} from "@material-ui/core/index";



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
        return <LoopContainer>
            <Layout className={classes.backgroundContainer}>
            <Layout className={classes.body} justifyContent={"center"}>
                <Layout className={classes.container} direction={"column"}>
                <Typography variant={"display2"} className={classes.titleText} >
                    Join Loop
                </Typography>
                <Typography variant={"title"} className={classes.subtitleText}>
                    The one stop solution for all your educational links.
                </Typography>
                <Typography variant={"headline"} className={classes.subtitleText}>
                    Create your personal account
                </Typography>
                    <Layout direction={"column"}>
                <InputContainer label={"Username"}>
                <TextField  value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder={"Username"}></TextField>
                </InputContainer>
                <Typography variant={"caption"} className={classes.descriptionText}>
                    This will be your username. You can add the name of your organization later.
                </Typography>
                    </Layout>
                    <Layout direction={"column"}>
                <InputContainer label={"Email address"}>
                <TextField  value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder={"Email"}></TextField>
            </InputContainer>
                    <Typography variant={"caption"}  className={classes.descriptionText}>
                        We’ll occasionally send updates about your account to this inbox. We’ll never share your email address with anyone.
                    </Typography>
                    </Layout>
                    <Layout direction={"column"}>
                    <InputContainer label={"Password"}>
                    <TextField  value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder={"Password"}></TextField>
                </InputContainer>
                    <Typography variant={"caption"}  className={classes.descriptionText}>
                        Use at least one lowercase letter, one numeral, and seven characters.
                    </Typography>
                    </Layout>


                    <Divider/>

                    <Typography variant={"body1"} className={classes.privacyContainer}>
                        By clicking “Create an account” below, you agree to our terms of service and privacy statement. We’ll occasionally send you account related emails.
                    </Typography>
                    <Divider/>
                    <Layout className={classes.privacyContainer}>
                    <Button variant={"raised"} color={"primary"}>Create an account</Button>
                    </Layout>


                </Layout>

            </Layout>
            </Layout>
        </LoopContainer>

    }
};


const Index = withStyles((theme) => {
    return {
        descriptionText:{
            paddingTop:theme.spacing.unit,
            paddingLeft:theme.spacing.unit,
            paddingBottom:theme.spacing.unit*2
        },
        subtitleText:{
            paddingBottom:theme.spacing.unit*2,
        },
        privacyContainer:{
            paddingTop:theme.spacing.unit*2,
            paddingBottom:theme.spacing.unit*2
        },

        titleText:{
            marginTop:theme.spacing.unit,
            paddingLeft:theme.spacing.unit,
            paddingBottom:theme.spacing.unit,
            color:"#000000"
        },
        body:{
            margin:theme.spacing.unit*2,
            flex:1
        },
        backgroundContainer:{
            backgroundColor:"#F9F9FB",
            flex:1
        },
        container:{
            width:980,
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