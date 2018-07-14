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
import {userCommands, userEvents} from "../../../store/domain/user";
import {addListener, removeListener} from "./redux"
import {Snackbar} from "@material-ui/core/index";

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
									this.props.dispatch({type:userCommands.FETCH_GUARDIANS,payload:{query:e.target.value}})
									console.log(this.props.ui)
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
								this.props.ui.pets.users.map((item) => {
									return <React.Fragment key={item}>
										<ListItem>
											<ListItemIcon>
												<UserIcon size={32}/>
											</ListItemIcon>
											<ListItemText primary={this.props.user.users[item].email} secondary={"2 Pets"}/>
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
						this.setState({addGuardianCallbackId:uid});
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
								<InputContainer label={"Name"}>
									<TextField
										value={this.state.userDetails.profile.mobile|| ''}
										onChange={(e) => {
											let mobile = e.target.value;
											this.setState((state) => (state.userDetails.profile.mobile = mobile, state))
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
			<Snackbar
				open={Boolean(this.state.error)}
				autoHideDuration={6000}
				onClose={()=>{this.setState({error:null})}}
				message={<span id="message-id">{this.state.error}</span>}
			/>
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