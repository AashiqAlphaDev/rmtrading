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
import {connect} from "react-redux"
import {UserIcon, SearchIcon, QRIcon} from "../../../components/icons";
import {ListItem, ListItemText, Divider, ListItemIcon,Slide} from "@material-ui/core/index";
import {Collapse} from "@material-ui/core/index";
import InputContainer from "../../../components/input";
import {userCommands, userEvents} from "../../../store/domain/user";
import uuidv1 from 'uuid/v1';
import {addListener, removeListener} from "./redux"
import {Snackbar, ListSubheader, IconButton} from "@material-ui/core/index";
import {petsUiDocActions} from "./redux"
import QrReader from 'react-qr-reader';
import {Link} from "../../../routes"
import {petEvents} from "../../../store/domain/pet";
import {tokenCommands, tokenEvents} from "../../../store/domain/token";
import {Router} from "../../../routes"


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


let _Index = class extends React.Component {

        state = {
            userDetails: {profile: {}},
            showRegisterGuardianDialogue:false,
        };


        componentWillMount = () => {
            addListener(this)
        }

        componentWillUnmount = () => {
            removeListener(this)
        }






    onAction({type, payload}) {
            if (type === userEvents.ADD_GUARDIAN_SUCCEEDED && payload.callbackId === this.state.addGuardianCallbackId) {
                this.setState({showRegisterGuardianDialogue: false});
            }

        if (type === tokenEvents.FETCH_TOKEN_SUCCEEDED && payload.callbackId === this.state.addTokenCallbackId) {

            Router.pushRoute(`/dashboard/pets/guardian-details/${payload.response.owner}/pets/${payload.response.pet}`);

		}
            if (type === userEvents.ADD_GUARDIAN_FAILED && payload.callbackId === this.state.addGuardianCallbackId) {
                if(payload.response.data){
                    this.setState({error: payload.response.message, showRegisterGuardianDialogue:false});
                }
                else{
                    this.setState({error: payload.response.message});
                }
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
									onChange={(e)=>{
                                        this.props.dispatch({type:petsUiDocActions.SET_QUERY, payload:e.target.value});
                                    }}
									placeholder={"Search a pet or a guardian"}
									InputProps={{
                                        endAdornment: <SearchIcon size={25} pad={5}/>
                                    }}
									onFocus={() => {
                                        this.setState({hideActionButtons: true})
                                    }}
									onBlur={() => {
                                        this.setState({hideActionButtons: false})
                                    }}
								/>
							</Layout>
						</Layout>
						<Collapse in={!this.state.hideActionButtons}>
							<Divider/>
							<Layout className={classes.searchContainer}>
								<Button size={"small"} onClick={() => {
                                    this.setState({showRegisterGuardianDialogue: true});
                                }}>Register Guardian</Button>
								<Button onClick={()=>{
                                    this.setState({showScanner:true})
								}} size={"small"}>Scan</Button>

							</Layout>
						</Collapse>
						<Divider/>
						<Layout className={classes.list} direction={"column"}>
                            {
                                !this.props.ui.pets.users.length &&
								<Layout direction={"column"} alignItems={"center"} justifyContent={"center"} flex={1}>
									<Typography  variant={"body1"} color={"textSecondary"} align={"center"}>
										Search using Guardian's Email/Mobile/Gov Id.
									</Typography>
									<Typography  variant={"body1"} color={"textSecondary"} align={"center"}>
										You can also use Chip Id / Scan Petpiper Card
									</Typography>

									<Layout alignItems={"center"} className={classes.line}>
										<form onSubmit={(e)=>{
                                            e.preventDefault();
                                        }}>
											<TextField
												placeholder="Chip Id"
												InputProps={{
                                                    endAdornment: <IconButton onClick={()=>{this.setState({showScanner:true})}}>
														<QRIcon size={25} pad={5}/>
													</IconButton>
                                                }}
											/>
											<button type="submit" style={{display:"none"}} />
										</form>
									</Layout>
								</Layout>
                            }
                            {
                                this.props.ui.pets.users.length !=0 &&
								<List>
									<ListSubheader component="div">Guardians</ListSubheader>
                                    {
                                        this.props.ui.pets.users.map((item) => {
                                            return <React.Fragment key={item}>
												<Link route={`/dashboard/pets/guardian-details/${item}`}>
													<ListItem>
														<ListItemIcon>
															<UserIcon size={32}/>
														</ListItemIcon>
														<ListItemText primary={this.props.user.users[item].email} secondary={"2 Pets"}/>
													</ListItem>
												</Link>
												<Divider/>
											</React.Fragment>
                                        })

                                    }
								</List>
                            }
						</Layout>
					</Layout>
					<Layout className={classes.rightPanel}>
                        {this.props.children}
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
                            this.setState({addGuardianCallbackId:uid});
                            console.log(this.state.userDetails)
                            this.props.dispatch({
                                type: userCommands.ADD_GUARDIAN,
                                payload: {callbackId: uid, data: {...this.state.userDetails}}
                            });
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
											value={this.state.userDetails.profile.name|| ''}
											onChange={(e) => {
                                                let name = e.target.value;
                                                this.setState((state) => (state.userDetails.profile.name = name, state))
                                            }}
											placeholder={"Name"}
										/>
									</InputContainer>
									<InputContainer label={"Mobile Number"}>
										<TextField
											value={this.state.userDetails.profile.mobile_number|| ''}
											onChange={(e) => {
                                                let mobile_number = e.target.value;
                                                this.setState((state) => (state.userDetails.profile.mobile_number = mobile_number, state))
                                            }}
											placeholder={"Mobile Number"}
										/>
									</InputContainer>
									<InputContainer label={"Email"}>
										<TextField
											value={this.state.userDetails.email|| ''}
											onChange={(e) => {
                                                let email = e.target.value;
                                                this.setState((state) => (state.userDetails.email = email, state))
                                            }}
											placeholder={"Email"}
										/>
									</InputContainer>
									<InputContainer label={"City"}>
										<TextField
											value={this.state.userDetails.profile.city|| ''}
											onChange={(e) => {
                                                let city = e.target.value;
                                                this.setState((state) => (state.userDetails.profile.city = city, state))
                                            }}
											placeholder={"City"}
										/>
									</InputContainer>
									<InputContainer label={"Address"}>
										<TextField
											value={this.state.userDetails.profile.address|| ''}
											placeholder={"Address"}
											onChange={(e) => {
                                                let address = e.target.value;
                                                this.setState((state) => (state.userDetails.profile.address = address, state))
                                            }}
										/>
									</InputContainer>
									<InputContainer label={"Government ID"}>
										<TextField
											value={this.state.userDetails.profile.gov_id|| ''}
											placeholder={"GovernmentID"}
											onChange={(e) => {
                                                let govId = e.target.value;
                                                this.setState((state) => (state.userDetails.profile.gov_id = govId, state))
                                            }}
										/>
									</InputContainer>

								</Layout>
								<Layout justifyContent={"flex-end"} className={classes.formActions}>
									<Button className={classes.formAction}>Cancel</Button>
									<Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}>Register</Button>
								</Layout>
							</Layout>
						</form>
					</DialogContent>
				</Dialog>
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
                                console.log(err)
                            }}
							onScan={(result) => {
                                if (result) {
                                	console.log(result);
                                     let uid = uuidv1();
                                    this.setState({addTokenCallbackId:uid});
                                    this.props.dispatch({
                                        type: tokenCommands.FETCH_TOKEN,
                                        payload: {token_id: result,callbackId:uid},
                                    });
                                    this.setState({showScanner: false});

                                }
                            }}
							style={{width: 400, height: 400}}
						/>
					</DialogContent>
				</Dialog>
				<Snackbar
					open={Boolean(this.state.error)}
					autoHideDuration={6000}
					onClose={()=>{this.setState({error:null})}}
					message={<span id="message-id">{this.state.error}</span>}
				/>
			</DashboardContainer>
        }
    }
;

let PetsWrap = withStyles((theme) => {
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

export {
    PetsWrap
}

export default ()=>{
	return <PetsWrap>
		<Layout flex={1} alignItems={"center"} justifyContent={"center"}>
			Select Guardian to view details
		</Layout>
	</PetsWrap>
}