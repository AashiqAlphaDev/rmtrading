import React from "react"
import {PetsWrap} from "./index";
import {withRouter} from "next/router"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux"
import {Router} from "../../../routes"
import {Link} from "../../../routes"
import {petDetails,guardianDetails} from "../../../api/api";
import {Typography} from "@material-ui/core/index";
import moment from "moment"
import {Button} from "@material-ui/core/index";


let _Index =  class extends React.Component{

    static async getInitialProps ({query, session_id}) {
         let petdetails = await petDetails(session_id, query.pet_id);
        let guardiandetails = await guardianDetails(session_id, query.guardian_id);

         return {petDetails:petdetails,guardianDetails:guardiandetails};

    }

    state = {

    };



    render(){
        const {classes} = this.props;
        return <PetsWrap>
            <Layout flex={1} direction={"column"}>
                <Layout>
                <Layout direction={"column"} className={classes.leftSection} flex={1}>
                    <Typography variant={"title"}>
                        {this.props.petDetails.name}
                    </Typography>
                    <Typography variant={"subheading"} color="textSecondary">
                        ({this.props.petDetails.data.pet_type}) Owned By {this.props.petDetails.data.owner_name}
                    </Typography>
                    <Typography>
                        {moment(this.props.petDetails.date_of_birth).format("MMMM Do YYYY")}
                    </Typography>

                    <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Assign Token</Button>
                    </Layout>
                </Layout>





                <Layout className={classes.rightSection} flex={3} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                        <Typography>
                            No Records Found
                        </Typography>

                    <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Add Visit</Button>
                </Layout>

            </Layout>
        </PetsWrap>
    }
}





let Index =  withRouter(withStyles((theme)=>{
    return {

        body:{
            margin:theme.spacing.unit * 2
        },
        leftSection:{
            padding:theme.spacing.unit * 2,
            background:"#FFF",
            margin:theme.spacing.unit,
            height:250
        },
        rightSection:{
            background:"#FFF",
            margin:theme.spacing.unit,
            padding:theme.spacing.unit * 2,
            height:250
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
        }
    }
})(connect(store=>store)(_Index)));

export default Index;


