import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Layout from "../../../components/layout";






class _Index extends React.Component {
    render(){
        const {classes} = this.props;
        return <Layout>
            Appointments
        </Layout>
    }
}

const Index = connect(store => store)(withStyles((theme) => {
    return {
        body:{
            overflow:"scroll"
        },
        content:{
            marginTop:theme.spacing.unit*2,
        },
        listCard:{
            flex:1,
            minWidth:200,
            margin:theme.spacing.unit*1
        },
        listTitle:{
            padding:theme.spacing.unit*2
        },
        card:{
            flex:1,
            minWidth:200,
            margin:theme.spacing.unit*1,
            padding:theme.spacing.unit*2
        },
        cardInfo:{
            marginLeft:theme.spacing.unit*2,
        }
    }
})(_Index));

export default Index