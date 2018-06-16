import React from "react";
import {withStyles} from "@material-ui/core/styles";
import style from "./style";

export default function (Component) {
	return withStyles((theme)=>(
		{
			...style(theme),
			fullScreen: {
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column"
			}
		}
	))(class extends React.Component {
		render() {
			const {classes} = this.props;
			return <div className={classes.fullScreen}>
				<Component {...this.props}/>
			</div>;
		}
	})
}