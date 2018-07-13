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
import {googlePlacesFetch, setStateKey} from "../../../components/util"
import {connect} from "react-redux"
import {PetsIcon, UserIcon, SearchIcon} from "../../../components/icons";
import {ListItem, ListItemText, Divider, ListItemIcon} from "@material-ui/core/index";
import {Collapse} from "@material-ui/core/index";
import InputContainer from "../../../components/input";
import Autocomplete from 'react-places-autocomplete';
import {Input, FormControl} from "@material-ui/core/index";


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

	async handleChange(e, type){
		console.log(e)
		let result = await googlePlacesFetch(e.target.value, type);
		console.log(result);
	}

	handleChange=(event)=>{

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
								[1, 2, 3, 4, 5, 6].map(() => {
									return <React.Fragment>
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
								[1, 2, 3, 4, 5, 6].map(() => {
									return <React.Fragment>
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
								[1, 2, 3, 4, 5, 6].map(() => {
									return <React.Fragment>
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
									<TextField value={this.state.name} onChange={(e) => {
										this.setState({userDetails: {...this.state.userDetails, name: e.target.value}})
									}}
									           placeholder={"Name"}></TextField>
								</InputContainer>
								<InputContainer label={"Mobile Number"}>
									<TextField value={this.state.mobile} onChange={this.setStateKey("mobile")}
									           onChange={(e) => {
										           this.setState({
											           userDetails: {
												           ...this.state.userDetails,
												           mobile: e.target.value
											           }
										           })
									           }}
									           placeholder={"Mobile Number"}></TextField>
								</InputContainer>
								<InputContainer label={"Email"}>
									<TextField value={this.state.email} onChange={this.setStateKey("email")}
									           onChange={(e) => {
										           this.setState({
											           userDetails: {
												           ...this.state.userDetails,
												           email: e.target.value
											           }
										           })
									           }}
									           placeholder={"Email"}></TextField>
								</InputContainer>
								<InputContainer label={"City"}>
									<TextField value={this.state.govId}
									           onChange={(e) => {
										           (this.handleChange(e, "country")).then(function () {

										           })
									           }}
									></TextField>
								</InputContainer>
								<InputContainer label={"Address"}>
									<TextField value={this.state.address} onChange={this.setStateKey("address")}
									           onChange={(e) => {
										           this.setState({
											           userDetails: {
												           ...this.state.userDetails,
												           address: e.target.value
											           }
										           })
									           }}
									           placeholder={"Address"}></TextField>
								</InputContainer>
								<InputContainer label={"Government ID"}>
									<TextField value={this.state.govId} onChange={this.setStateKey("govId")}
									           onChange={(e) => {
										           this.setState({
											           userDetails: {
												           ...this.state.userDetails,
												           govId: e.target.value
											           }
										           })
									           }}
									           placeholder={"Government ID No"}></TextField>
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