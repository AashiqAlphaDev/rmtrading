import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {
	Button,
	Dialog,
	DialogContent,
	ExpansionPanel,
	Paper,
	Slide,
	TextField,
	Typography
} from "@material-ui/core/es/index";
import Layout from "../../../components/layout";
import {FileDocumentIcon, PawIcon} from "mdi-react";
import Link from "react-router-dom/es/Link";
import QrReader from 'react-qr-reader';
import InputContainer from "../../../components/input"
import {Redirect} from "react-router-dom";
import {userCommands} from "../../../stores/users/sagas"

function Transition(props) {
	return <Slide direction="up" {...props} />;
}


let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			flex: 1
		},
		content: {
			marginTop: theme.spacing.unit * 2,
		},
		listCard: {
			flex: 1,
			minWidth: 200,
			margin: theme.spacing.unit * 1,
			boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
		},
		listTitle: {
			padding: theme.spacing.unit * 2
		},
		card: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
			margin: theme.spacing.unit * 1,
			padding: theme.spacing.unit * 2,
			boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
			width: 250,
			height: 350
		},
		cardInfo: {
			marginLeft: theme.spacing.unit * 1,
			flex: 1,
		},
		cardIcon: {
			border: `2px solid ${theme.palette.grey['200']}`,
			background: "none"
		},
		cardIconSvg: {

			fill: theme.palette.secondary.main
		},
		titleIconSvg: {
			paddingRight: 1 * theme.spacing.unit,
			fill: theme.palette.secondary.main
		},
		icon: {
			fill: theme.palette.secondary.main,
		},
		iconContainer: {
			paddingBottom: 5,
			border: `2px solid ${theme.palette.grey['200']}`,
			width: 200,
			height: 200,
			borderRadius: 100,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			margin: 20
		},
		title: {
			paddingBottom: 10
		}

	}
})(class extends React.Component {
	state = {
		pet_id: "",
		showResults: false,
		showSearchDialogue: false,
		showScanner: false
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} className={classes.body} justifyContent={"center"}>
			{
				this.props.petDetail._id &&
				<Redirect to={`/admin/dashboard/pets/${this.props.petDetail._id}`}/>
			}
			<Layout alignItems={"center"}>
				<Paper className={classes.card} onClick={() => {
					this.setState({showSearchDialogue: true});
				}}>
					<Layout alignItems={"center"} flex={1}>
						<Layout direction={"column"} className={classes.cardInfo} alignItems={"center"}>
							<div className={classes.iconContainer}>
								<PawIcon size={150} className={classes.icon}/>
							</div>
							<Typography variant={"title"} className={classes.title}>New Pet Registration</Typography>
							<Typography color={"textSecondary"} className={classes.title}>Register to generate health
								record</Typography>
						</Layout>

					</Layout>
				</Paper>

				<Paper className={classes.card} onClick={() => {
					this.setState({showScanner: true})
				}}>
					<Layout alignItems={"center"} flex={1}>

						<Layout direction={"column"} className={classes.cardInfo} alignItems={"center"}>
							<div className={classes.iconContainer}>
								<FileDocumentIcon size={150} className={classes.icon}/>
							</div>
							<Typography variant={"title"} className={classes.title}>Open Record</Typography>
							<Typography color={"textSecondary"} className={classes.title}>Vaccination & Health
								records</Typography>
						</Layout>

					</Layout>
				</Paper>
			</Layout>
			<Dialog
				TransitionComponent={Transition}
				open={this.state.showSearchDialogue}
				onClose={() => {
					this.setState({showSearchDialogue: false})
				}}
			>
				<DialogContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							Please enter Guardian's ID
						</Typography>
						<Typography variant={"body1"} gutterBottom color={"textSecondary"}>
							Provide necessary information to identify existing guardian.
						</Typography>
						<form style={{display: "flex"}} onSubmit={(e) => {
							e.preventDefault();
							this.props.dispatch({
								type: userCommands.GET_GUARDIAN_WITH_ID,
								payload: {query: this.state.guardianQuery}
							});
						}}>
							<TextField className={`flex`} autoFocus
							           placeholder={"Enter Guardian Mobile No / Gov Identity No"} onChange={(event) => {
								this.setState({guardianQuery: event.target.value})
							}}/>
							<button style={{display: "none"}} type={"submit"}/>
						</form>
						<ExpansionPanel
							expanded={Boolean(this.props.guardianDetail._id) || Boolean(this.props.guardianDetail.noMatch)}>
							{
								this.props.guardianDetail.noMatch &&

								<Layout alignItems={"center"}>
									<Typography variant={"body2"} className={`flex`}>
										No Record found.
									</Typography>
									<Button component={Link} to={"/admin/dashboard/vaccinations/add-guardian"}
									        color={"primary"}>Register</Button>
								</Layout>
							}
							{
								this.props.guardianDetail._id &&

								<Layout direction={"row"} alignItems={"flex-end"} flex={1}>
									<Layout direction={"column"} flex={1}>
										<Typography variant={"title"}>
											{this.props.guardianDetail.profile.first_name}
										</Typography>
										<Typography>
											{this.props.guardianDetail.profile.mobile_number}
										</Typography>
										<Typography>
											{this.props.guardianDetail.profile.address}
										</Typography>
									</Layout>
									<Button component={Link}
									        to={`/admin/dashboard/vaccinations/${this.props.guardianDetail._id}/add-pet`}
									        color={"primary"}>Choose</Button>
								</Layout>
							}
						</ExpansionPanel>
					</Layout>
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
							console.log(err);
						}}
						onScan={(result) => {
							if (result) {
								//this.props.dispatch({type: REQUEST_PET_FETCH, payload: {token: result}});
							}
						}}
						style={{width: 400, height: 400}}
					/>
					<InputContainer label={"Pet Id"}>
						<form style={{display: "flex"}} onSubmit={(e) => {
							e.preventDefault();
							// this.props.dispatch({type: REQUEST_PET_FETCH, payload: {token: result}});
						}}>
							<TextField className={`flex`} autoFocus placeholder={"Enter pet id / Chip No"}
							           onChange={(event) => {
								           this.setState({guardianQuery: event.target.value});
							           }}/>
							<button style={{display: "none"}} type={"submit"}></button>
						</form>
					</InputContainer>
				</DialogContent>
			</Dialog>
		</Layout>;
	}
});

export default connect(store => store)(Index)