import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {QUERY_VET_CENTERS} from "../../../stores/vet-centers/actions";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			marginLeft: theme.spacing.unit * 2,
			display: "flex",
			flexDirection: "column"
		},
		title: {
			background: "#e6ecf0",
			width: "100%",
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 2,
		},

		segment: {
			marginBottom: theme.spacing.unit * 3,
			padding: theme.spacing.unit * 1
		}
	}
})(class extends React.Component {
	componentWillMount() {
		this.props.dispatch({type: QUERY_VET_CENTERS});
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.body}>
			sample
		</div>;
	}
});

export default connect(store => store)(Index)