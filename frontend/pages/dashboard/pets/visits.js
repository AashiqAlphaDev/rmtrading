import React from "react"
import {PetsWrap} from "./index";
import {withRouter} from "next/router"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux"
import {Router} from "../../../routes"
import {Link} from "../../../routes"
import {petDetails, guardianDetails, petTypeDetails} from "../../../api/api";
import InputContainer from "../../../components/input";
import {TextField,Button,Typography} from "@material-ui/core/index";







let _Index =  class extends React.Component{

    static async getInitialProps ({query, session_id}) {
         let petdetails = await petDetails(session_id, query.pet_id);
        let guardiandetails = await guardianDetails(session_id, query.guardian_id);
        let pettypedetails = await petTypeDetails(session_id,petdetails.pet_type);

         return {petDetails:petdetails,guardianDetails:guardiandetails,petTypeDetails:pettypedetails};

    }

    componentWillMount(){
        console.log(this.props)}

    state = {

    };



    render(){
        const {classes} = this.props;
        return <PetsWrap>
            <Layout direction={"column"} className={classes.body} flex={1}>
                <Layout>
                    <Layout className={classes.card} flex={1} alignItems={"center"} justifyContent={"center"}>
                        <Layout flex={1}>
                        <Typography variant={"subheading"}>
                            No Remarks
                        </Typography>
                        </Layout>
                        <Button className={classes.formAction} onClick={()=>{
                            this.setState({remarks:""})
                        }}>Record Reading</Button>
                    </Layout>

                <Layout direction={"column"} className={classes.card} flex={1}>

                    <InputContainer label={"Remarks"}>
                        <TextField
                            value={this.state.remarks|| ''}
                            onChange={(e) => {
                                let remarks = e.target.value;
                                this.setState({remarks:remarks})
                            }}
                            placeholder={"Remarks"}
                        />
                    </InputContainer>
                    <Layout justifyContent={"flex-end"} className={classes.formActions}>
                        <Button className={classes.formAction} onClick={()=>{
                            this.setState({remarks:""})
                        }}>Cancel</Button>
                        <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"} onClick={()=>{
                        }}>Add</Button>
                    </Layout>

                </Layout>

                </Layout>
                <Layout>

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
        card:{
            padding:theme.spacing.unit * 2,
            background:"#FFF",
            margin:theme.spacing.unit,
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


