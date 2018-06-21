import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {QUERY_VET_CENTERS} from "../../../stores/vet-centers/actions";
import {
	Dialog,
	DialogContent,
	Divider, ExpansionPanel, ExpansionPanelDetails, Paper,
	Slide,
	TextField,
	Typography
} from "@material-ui/core/es/index";
import Layout from "../../../components/layout";

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
		cardBig: {
			minHeight:300,
		},
		card: {
			minHeight:200,
			display:"flex",
			flexDirection:"column",
			justifyContent:"center",
			flex: 1,
			margin: theme.spacing.unit * 1,
			padding: theme.spacing.unit * 2,
			boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
		},
		cardInfo: {
			flex:1,
			alignItems:"center"
		},
		cardIcon: {
			border: `2px solid ${theme.palette.grey['200']}`,
			background: "none",
		},
		cardIconSvg: {
			fill: theme.palette.secondary.main
		},
		titleIconSvg: {
			paddingRight: 1 * theme.spacing.unit,
			fill: theme.palette.secondary.main
		}
	}
})(class extends React.Component {
	state = {
		pet_id: "",
		showResults:false
	}

	componentWillMount() {
		this.props.dispatch({type: QUERY_VET_CENTERS});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.petDetail._id) {

		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} className={classes.body} justifyContent={"center"}>
			<Layout  alignItems={"center"}>
				<Paper className={classes.card}>
					<Layout>
						<Layout direction={"column"} className={classes.cardInfo}>
							<Typography color={"textSecondary"}>Sample</Typography>
							<Typography variant={"title"}>New Pet Registration</Typography>
						</Layout>
					</Layout>
				</Paper>
				<Paper className={classes.card}>
					<Layout alignItems={"center"}>
						<Layout direction={"column"} className={classes.cardInfo} flex={1}>
							<Typography color={"textSecondary"}>Sample</Typography>
							<Typography variant={"title"}>Search</Typography>
						</Layout>
						<TextField />
					</Layout>
				</Paper>
				<Paper className={classes.card} onClick={()=>{this.setState({showGuardianDialogue:true})}}>
					<Layout>
						<Layout direction={"column"} className={classes.cardInfo}>
							<Typography color={"textSecondary"}>Sample</Typography>
							<Typography variant={"title"}>Open Reports</Typography>
						</Layout>
					</Layout>
				</Paper>
			</Layout>
			<Dialog
				TransitionComponent={Transition}
				open={this.state.showGuardianDialogue}
				onClose={() => {
					this.setState({showGuardianDialogue: false})
				}}
			>
				<DialogContent>
					<Layout direction={"column"}>
						<Typography variant={"title"} gutterBottom>
							Please enter Guardian's ID
						</Typography>
						<Typography variant={"body1"} gutterBottom color={"textSecondary"} >
							Provide necessary information to identify existing guardian.
						</Typography>
							<TextField autoFocus placeholder={"Enter Guardian Mobile No / Gov Identity No"} onChange={()=>{
								this.setState({showResults:!this.state.showResults})
							}}/>
						<Divider />
						<ExpansionPanel expanded={this.state.showResults}>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
									sit amet blandit leo lobortis eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Layout>
				</DialogContent>
			</Dialog>
		</Layout>;
	}


});

export default connect(store => store)(Index)