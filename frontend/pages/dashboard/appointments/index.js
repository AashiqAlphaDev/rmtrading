import React from "react"
import DashboardContainer from "../../../components/admin-dashboard";
import {checkAdmin} from "../index";
import {withStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import {addListener, removeListener} from "./redux"

import {petsUiDocActions} from "./redux"

import {Link} from "../../../routes"
import {vaccinationCenterDetails} from "../../../api/api";

let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {
        let vaccinationcenterdetails = await vaccinationCenterDetails(session_id);
        return {vaccinationCenterDetails:vaccinationcenterdetails};

    }

        state = {

        };


        componentWillMount = () => {
            addListener(this)
                console.log(this.props.vaccinationCenterDetails)
        }

        componentWillUnmount = () => {
            removeListener(this)
        }

        onAction({type, payload}) {
        }

        render() {
            const {classes} = this.props;
            return <DashboardContainer>

            </DashboardContainer>
        }
    }
;

let Index = withStyles((theme) => {
    return {
        searchContainer: {
            padding: theme.spacing.unit * 2
        },
        leftList: {
            background: "#FFF",
            width: 360
        },
        rightPanel: {
            flex: 1
        },
        list: {
            flex: 1,
            overflow: "scroll"
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        },
        line:{
            marginTop:theme.spacing.unit * 2,
            marginBottom:theme.spacing.unit * 2,
        }
    }
})(connect(store => store)(checkAdmin(_Index)));

export default Index
