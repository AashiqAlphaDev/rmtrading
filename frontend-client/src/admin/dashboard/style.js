import style from "../../dashboard-style";

export default (theme) => ({
	...style(theme),
	navButton: {
		margin: theme.spacing.unit * 1
	},
	logo: {
		display: "block",
		margin: theme.spacing.unit * 1
	},
	tabIcon: {
		fontSize: "1rem"
	}
});