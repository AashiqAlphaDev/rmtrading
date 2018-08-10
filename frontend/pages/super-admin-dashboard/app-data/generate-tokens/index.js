import React from "react"
import Layout from "../../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../../../routes";
import DashboardContainer from "../../../../components/super-admin-dashboard/index";
import {removeListener,addListener} from "./redux";
import {Router} from "../../../../routes"
import {Paper,
    Typography,
    Select,
    MenuItem,
    Button} from "@material-ui/core/index";
import {tokenCommands, tokenEvents} from "../../../../store/domain/token";
import uuidv1 from 'uuid/v1';


let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {

    }


    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        console.log("hi")
        if (type === tokenEvents.GENERATE_TOKENS_SUCCEEDED && payload.callbackId === this.state.tokenGenerationCallbackId) {
            window.PrintElem(payload.response);
        }
    }




    state = {showAddAdminDialog:false,count:100};


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout direction={"column"}  className={classes.body}>
                <Layout flex={1} direction={"column"} className={classes.paper}>

                        <Layout alignItems={"center"}>
                            <Typography variant={"title"} className={classes.formAction}>
                                Generate Tokens
                            </Typography>
                            <Select value={this.state.count} onChange={(event)=>{this.setState({count:event.target.value})}}>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                                <MenuItem value={1000}>1000</MenuItem>
                                <MenuItem value={5000}>5000</MenuItem>
                            </Select>
                            <Button onClick={()=>{
                                let uid = uuidv1();
                                this.setState({tokenGenerationCallbackId:uid});
                                this.props.dispatch({type:tokenCommands.GENERATE_TOKENS, payload:{count:this.state.count,callbackId:uid}});}}>Generate</Button>
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
        topButton:{
          marginRight:theme.spacing.unit*2
        },
        paper:{
            background:"#fff",
            maxHeight:80,
            padding:theme.spacing.unit*2
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
            flex:1,
            marginLeft: theme.spacing.unit * 1
        },
    }
})(connect(store=>store)(_Index))
export default Index;