import React from "react"
import {PetsWrap} from "./index";
import {withRouter} from "next/router"
import {guardianDetails} from "../../../api/api";
import Layout from "../../../components/layout";
import {Divider,Button, Typography} from "@material-ui/core/index";
import {UserIcon} from "../../../components/icons";
import {withStyles} from "@material-ui/core/styles";

let _Index =  class extends React.Component{

    static async getInitialProps ({query, session_id}) {
        let details = await guardianDetails(session_id, query.guardian_id);
        return {...query, guardianDetails:details};
    }

    componentWillMount(){
        console.log(this.props)
    }

    render(){
        const {classes} = this.props;
        return <PetsWrap>
            <Layout direction={"column"} flex={1}>
                <Layout className={classes.topbar} alignItems={"center"}>
                    <UserIcon size={32} pad={10}/>
                    <Layout direction={"column"} flex={1}>
                        <Typography variant={"title"}>
                            {this.props.guardianDetails.name||"Karthik"}
                        </Typography>
                        <Typography variant={"subheading"} color="textSecondary">
                            Guardian - 2 pets
                        </Typography>
                    </Layout>
                    <Layout direction={"column"} flex={1}>
                        <Typography variant={"subheading"} color="textSecondary">
                            {this.props.guardianDetails.mobile||"+919901509003"}
                        </Typography>
                        <Typography variant={"subheading"} color="textSecondary">
                            {this.props.guardianDetails.email||"+919901509003"}
                        </Typography>
                    </Layout>
                    <Layout direction={"column"}>
                        <Button size={"small"}>Edit Profile</Button>
                    </Layout>
                </Layout>
                <Divider/>
            </Layout>
        </PetsWrap>
    }
}





let Index =  withRouter(withStyles((theme)=>{
    return {
        topbar:{
            padding:theme.spacing.unit,
            background:"#FFF"
        }
    }
})(_Index));

export default Index;


