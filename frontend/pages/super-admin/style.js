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
	}
})