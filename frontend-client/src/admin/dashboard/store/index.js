import React from "react";
import {withStyles} from "@material-ui/core/styles";
import style from "../style";
import {connect} from "react-redux";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			overflow: "scroll"
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
			flex: 1,
			margin: theme.spacing.unit * 1,
			padding: theme.spacing.unit * 2,
			boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
		},
		cardInfo: {
			marginLeft: theme.spacing.unit * 2,
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

	state = {};

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/admin/dashboard/store");
		}
	}

	render() {
		const {classes} = this.props;
		return <div direction={"column"} flex={1} className={`${classes.body}`}>
			<div className={`container ${classes.content}`}>
				Store
			</div>
		</div>;
	}
});

export default connect(store => store)(Index);