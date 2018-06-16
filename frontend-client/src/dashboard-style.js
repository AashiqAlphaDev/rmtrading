export default (theme) => {
	return ({
		card: {
			minWidth: 500
		},
		input: {
			marginTop: theme.spacing.unit * 1
		},
		actions: {
			marginTop: theme.spacing.unit * 1,
			marginBottom: theme.spacing.unit * 1,
		},
		row: {
			marginTop: theme.spacing.unit * 1
		},
		marginButton: {
			margin: 4
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
			width: 300,
			borderRight: "1px solid #cccccc6b"
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
		},
		page: {
			marginTop: theme.spacing.unit * 2,
		},
		flex: {
			flex: 1
		},
		paperPage: {
			padding: theme.spacing.unit * 3,
			boxShadow: "none"
		},

		uploadInput:{
			display:"none"
		},

		suggestionsContainerOpen:{
			position: 'absolute',
			zIndex: 1,
			marginTop: theme.spacing.unit,
			left: 0,
			right: 0,
		},
		suggestion: {
			display: 'block',
		},
		suggestionsList: {
			margin: 0,
			padding: 0,
			listStyleType: 'none',
		},
		auto_suggest: {
			flexGrow: 1,
			position: 'relative',
			//height: 250,
		}
	});
}