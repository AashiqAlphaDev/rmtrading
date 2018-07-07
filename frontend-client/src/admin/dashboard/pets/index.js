import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Layout from "../../../components/layout";
import {raiseEvent} from "../../../components/util";
import {petsUiEvents} from "./store/saga"







class _Index extends React.Component {
    componentWillMount=raiseEvent(petsUiEvents.PETS_MENU_ITEM_WILL_LOAD,this)
    render(){
        const {classes} = this.props;
        return <Layout>
            Pets
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