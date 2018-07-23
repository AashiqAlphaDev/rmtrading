import React from "react"
import Layout from "../../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {authCommands} from "../../../../store/domain/auth";
import {guardianSelfDetails,petsOfGuardian,vaccinationDetails,petDetails,petTypeDetails} from "../../../../api/api";
import {PetsIcon} from "../../../../components/icons";
import {Link} from "../../../../routes";
import DashboardContainer from "../../../../components/super-admin-dashboard/index";


let _Index = class extends React.Component {

    static async getInitialProps ({query, session_id}) {

    }


    componentWillMount = () => {

    }

    state = {};


    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout className={classes.body}>
                inventory
            </Layout>
        </DashboardContainer>
    }
};


const Index = withStyles((theme)=>{
    return {
        body:{
            height:"100%"
        }
    }
})(connect(store=>store)(_Index))
export default Index;