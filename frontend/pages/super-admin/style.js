export default (theme) => ({
	card: {
		minWidth: 500
	},
	input: {
		marginTop: theme.spacing.unit * 1
	},
	actions:{
		marginTop: theme.spacing.unit * 1,
		marginBottom: theme.spacing.unit * 1
	},
	row: {
		marginTop: theme.spacing.unit * 1
	},
	fbButton:{
		marginTop: theme.spacing.unit * 1,
		background:"#3b5998",
		'&:hover': {
			backgroundColor: '#384f8b',
		},
		'&:active': {
			backgroundColor: '#303b6e',
		},
	},
	twitterButton:{
		marginTop: theme.spacing.unit * 1,
		background:"#1da1f2",
		'&:hover': {
			backgroundColor: '#198cd3',
		},
		'&:active': {
			backgroundColor: '#14659d',
		},
	},
	marginedButton:{
		margin:4,
	},
	bodyWrap: {
		display: "flex",
		flexDirection: "column",
		flex: 1
	},
	body: {
		flex: 1,
		overflow: "scroll",
	},
	searchField: {
		padding: theme.spacing.unit,
	},
	pagination: {
		margin: theme.spacing.unit
	},
	pageLink: {
		margin: theme.spacing.unit
	},
	leftSection: {
		margin: theme.spacing.unit,
		width: 300
	},
	rightSection: {
		flex: 1,
		margin: theme.spacing.unit
	},
	staticSection: {
		width: 300,
		position: "fixed"
	},
	title: {
		margin: theme.spacing.unit,
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
	}
})