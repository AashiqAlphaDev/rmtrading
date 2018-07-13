import React from "react"
import DashboardContainer from "../../../components/admin-dashboard";
import {checkAdmin} from "../index";
import Layout from "../../../components/layout";
import {
    List,
    Typography,
    TextField,
    Button,
    DialogContent,
    Dialog
} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles"
import {setStateKey} from "../../../components/util"
import {connect} from "react-redux"
import {PetsIcon, UserIcon, SearchIcon} from "../../../components/icons";
import {ListItem, ListItemText, Divider, ListItemIcon} from "@material-ui/core/index";
import {Collapse} from "@material-ui/core/index";
import InputContainer from "../../../components/input";

import uuidv1 from 'uuid/v1';
import {userCommands} from "../../../store/domain/user";
import {userUiCommands} from "./redux";




let _Index = class extends React.Component {

    state = {
        query: "",
        showRegister: true,
        showRegisterGuardianDialogue: false,
        userDetails: {
            name: "",
            mobile: "",
            email: "",
            city: "",
            address: "",
            govId: ""
        }

    };

    setStateKey = setStateKey.bind(this);

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.user.triggeredCallback && (nextProps.ui.user.triggeredCallback.callbackId == this.state.addUserCallbackId)){
            if(nextProps.ui.user.triggeredCallback.success){
                this.setState({addUserCallbackId:null, showRegisterGuardianDialogue:false});
            }
            else{
                this.setState({addUserCallbackId:null, error});
            }
            this.props.dispatch({type:userUiCommands.RESET_CALLBACK_TRIGGER});
        }
    }

    render() {
        const {classes} = this.props;
        return <DashboardContainer>
            <Layout flex={1}>
                <Layout className={classes.leftList} elevation={0} direction={"column"}>
                    <Layout className={classes.searchContainer} direction={"column"}>
                        <Layout flex={1} direction={"column"}>
                            <TextField
                                value={this.state.query}
                                onChange={this.setStateKey("query")}
                                placeholder={"Search a pet or a guardian"}
                                InputProps={{
                                    endAdornment: <SearchIcon size={25} pad={5}/>,
                                }}
                                onFocus={() => {
                                    this.setState({showRegister: false});
                                }}
                                onBlur={() => {
                                    this.setState({showRegister: true});
                                }}
                            />
                        </Layout>
                    </Layout>
                    <Collapse in={this.state.showRegister}>
                        <Divider/>
                        <Layout className={classes.searchContainer}>
                            <Button size={"small"} onClick={() => {
                                this.setState({showRegisterGuardianDialogue: true});
                            }}>Register Pet</Button>
                            <Button size={"small"} onClick={() => {
                                this.setState({showRegisterGuardianDialogue: true});
                            }}>Register Guardian</Button>
                            <Button size={"small"}>Scan</Button>

                        </Layout>
                    </Collapse>
                    <Divider/>
                    <Layout className={classes.list} direction={"column"}>
                        <List>
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    return <React.Fragment key={item}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PetsIcon size={32}/>
                                            </ListItemIcon>
                                            <ListItemText primary={"PetName"} secondary={"Female - Dog - 24 Years"}/>
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                })
                            }
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    return <React.Fragment key={item}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <UserIcon size={32}/>
                                            </ListItemIcon>
                                            <ListItemText primary={"Karthik Thirumalasetti"} secondary={"2 Pets"}/>
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                })
                            }
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    return <React.Fragment key={item}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <UserIcon size={32}/>
                                            </ListItemIcon>
                                            <ListItemText primary={"Karthik Thirumalasetti"} secondary={"2 Pets"}/>
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                })
                            }
                        </List>
                    </Layout>
                </Layout>
                <Layout className={classes.rightPanel}>
                    <Layout flex={1} alignItems={"center"} justifyContent={"center"}>
                        Select Pet / Guardian to view details
                    </Layout>
                </Layout>
            </Layout>

            <Dialog
                open={this.state.showRegisterGuardianDialogue}
                onClose={() => {
                    this.setState({showRegisterGuardianDialogue: false})
                }}
            >
                <DialogContent>
                    <form style={{display: "flex"}} onSubmit={(e) => {
                        e.preventDefault();
                        let uid = uuidv1();
                        this.props.dispatch({type: userCommands.ADD_GUARDIAN, payload:{callbackId:uid,data:{...this.state.userDetails}}});
                    }}>
                        <Layout direction={"column"}>
                            <Typography variant={"title"} gutterBottom>
                                New Guardian's Details
                            </Typography>
                            <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                                Provide necessary information to register a guardian.
                            </Typography>

                            <Layout direction={"column"}>
                                <InputContainer label={"Name"}>
                                    <TextField
                                        value={this.state.name}
                                        onChange={(e) => {
                                            this.setState({userDetails: {...this.state.userDetails, name: e.target.value}})
                                        }}
                                        placeholder={"Name"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Name"}>
                                    <TextField
                                        value={this.state.mobile}
                                        onChange={(e) => {
                                            this.setState({
                                                userDetails: {
                                                    ...this.state.userDetails,
                                                    mobile: e.target.value
                                                }
                                            })
                                        }}
                                        placeholder={"Mobile Number"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Email"}>
                                    <TextField
                                        value={this.state.email} onChange={(e) => {
                                            this.setState({userDetails: {...this.state.userDetails, email: e.target.value}})
                                        }}
                                        placeholder={"Email"}
                                    />
                                </InputContainer>
                                <InputContainer label={"City"}>
                                    <TextField
                                        value={this.state.city}
                                        onChange={(e) => {
                                            this.setState({userDetails: {...this.state.userDetails, city: e.target.value}})
                                        }}
                                        placeholder={"City"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Address"}>
                                    <TextField
                                        value={this.state.address}
                                        onChange={(e) => {
                                            this.setState({
                                                userDetails: {
                                                    ...this.state.userDetails,
                                                    address: e.target.value
                                                }
                                            })
                                        }}
                                        placeholder={"Address"}
                                    />
                                </InputContainer>
                                <InputContainer label={"Government ID"}>
                                    <TextField value={this.state.govId}
                                   onChange={(e) => {this.setState({userDetails: {...this.state.userDetails, govId: e.target.value}})}} placeholder={"GovernmentID"} />

                                </InputContainer>

                            </Layout>
                            <Layout justifyContent={"flex-end"} className={classes.formActions}>
                                <Button className={classes.formAction}>Cancel</Button>
                                <Button className={classes.formAction} type={"submit"} variant={"raised"}
                                        color={"primary"}>Register</Button>
                            </Layout>
                        </Layout>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardContainer>
    }
};

const Index = withStyles((theme) => {
    return {
        searchContainer: {
            padding: theme.spacing.unit * 2
        },
        leftList: {
            background: "#FFF",
            width: 360
        },
        rightPanel: {
            flex: 1,
            margin: theme.spacing.unit * 2
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
        }
    }
})(connect(store => store)(checkAdmin(_Index)))
export default Index;