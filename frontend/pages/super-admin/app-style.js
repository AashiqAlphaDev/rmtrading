export default (theme)=>{
	return {
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
	}
}