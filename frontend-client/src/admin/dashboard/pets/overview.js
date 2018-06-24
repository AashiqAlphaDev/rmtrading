import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {REQUEST_PET_FETCH} from "../../../stores/pets/actions";
import {QUERY_VACCINATIONS} from "../../../stores/vaccinations/actions";
import moment from "moment"
import InputContainer from "../../../components/input"
import {
    Button, Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider,
    IconButton,
    Paper, Slide,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextField,
    Typography
} from "@material-ui/core/es/index";
import {InformationIcon, DeleteIcon, EditIcon} from "mdi-react";
import {Link, Redirect} from "react-router-dom";
import {REQUEST_ADD_QUEUE} from "../../../stores/vet-centers/actions";
import {REQUEST_ADD_VISIT} from "../../../stores/pet-types/actions";
import {CLEAR_VISIT, QUERY_VISITS} from "../../../stores/visits/actions";
import Layout from "../../../components/layout";
import QrReader from 'react-qr-reader';
import {REQUEST_UPDATE_TOKEN} from "../../../stores/tokens/actions";


function Transition(props) {
    return <Slide direction="up" {...props} />;
}



let Index = withStyles((theme) => {
    return {
        ...style(theme),
        body: {
            marginTop: theme.spacing.unit * 2
        },
        paper: {
            marginTop: theme.spacing.unit * 1,
            display: "flex"
        },
        title: {
            background: "#e6ecf0",
            width: "100%",
            paddingTop: theme.spacing.unit * 3,
            paddingBottom: theme.spacing.unit * 2,
        },

        segment: {
            marginBottom: theme.spacing.unit * 3,
            padding: theme.spacing.unit * 1
        }
    }
})(class extends React.Component {
    state = {
        openAddBiometrics: false,
        data: {
            height: 0,
            weight: 0
        },
        showScanner:false
    }
    dateFromObjectId = function (objectId) {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };
    componentWillMount() {
        this.props.dispatch({type: REQUEST_PET_FETCH, payload: {pet_id: this.props.match.params.pet_id}});
        this.props.dispatch({type: QUERY_VISITS, payload: {pet_id: this.props.match.params.pet_id}});
        this.props.dispatch({type: CLEAR_VISIT});
    }

    render() {
        const {classes} = this.props;
        return <div className={classes.body}>
            <Paper className={`${classes.paperPage}`}>
                {
                    this.props.visitDetail._id &&
                    <Redirect
                        to={`/admin/dashboard/pets/${this.props.match.params.pet_id}/visits/${this.props.visitDetail._id}`}/>
                }
                <Layout alignItems="flex-start">
                    <Layout flex={1}>
                        <Layout direction="column">
                            <Typography variant={"title"}>
                                <span className={`icon-dog`}></span>
                                {this.props.petDetail.name}
                            </Typography>
                            <Typography variant={"subheading"}>
                                owned by {this.props.petDetail.data && this.props.petDetail.data.owner}
                            </Typography>
                            <Typography variant={"caption"}>
                                {moment(this.props.petDetail.date_of_birth).format('MMMM Do YYYY')}
                            </Typography>
                        </Layout>
                    </Layout>
                    <Button onClick={()=>{this.setState({showScanner:true})}}>Assign Token</Button>
                </Layout>
            </Paper>

            <Paper className={`${classes.paperPage} ${classes.paper}`}>

                {
                    this.props.visits.list.length === 0 &&
                    <Layout direction={"column"} flex={1} alignItems="center">
                        <Layout direction="column">
                            <Typography variant={"subheading"}>
                                No Records Found
                            </Typography>
                            {
                                this.props.visitDetail._id &&
                                <Redirect to={`/admin/dashboard/pets/${this.props.match.params.pet_id}/visits/${this.props.visitDetail._id}`} />
                            }
                            <Button onClick={() => {
                                this.props.dispatch({
                                    type: REQUEST_ADD_VISIT,
                                    payload: {pet: this.props.match.params.pet_id}
                                });
                            }}>Add Visit</Button>
                        </Layout>
                    </Layout>
                }

                {
                    this.props.visits.list.length > 0 &&
                    <Layout direction="column" flex={1}>
                        <Layout justifyContent="flex-end">
                            <Button onClick={() => {
                                this.props.dispatch({
                                    type: REQUEST_ADD_VISIT,
                                    payload: {pet: this.props.match.params.pet_id}
                                });
                            }}>Add Visit</Button>
                        </Layout>
                        <Divider />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Date of visit</TableCell>
                                    <TableCell>Vaccination Center</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.visits.list.map((item, index) => {
                                        return <TableRow key={index}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{moment(this.dateFromObjectId(item._id)).format("MMMM Do YYYY")}</TableCell>
                                            <TableCell>{item.data.vet_center}</TableCell>
                                            <TableCell><InformationIcon /></TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Layout>
                }
            </Paper>

            <Dialog
                TransitionComponent={Transition}
                open={this.state.showScanner}
                onClose={() => {
                    this.setState({showScanner: false})
                }}
            >
                <DialogContent>
                    <QrReader
                        delay={this.state.delay}
                        onError={(err) => {
                            console.log(err);
                        }}
                        onScan={(result)=>{
                            if(result){
                                this.props.dispatch({type:REQUEST_UPDATE_TOKEN, payload:{token_id:result, data:{pet:this.props.match.params.pet_id}}});
                                this.setState({showScanner:false});
                            }
                        }}
                        style={{width: 400, height: 400}}
                    />
                </DialogContent>
            </Dialog>


        </div>;
    }
});

export default connect(store => store)(Index)