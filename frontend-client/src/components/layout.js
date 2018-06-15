import React from "react";

export default class Layout extends React.Component{
	render(){
		let style = {...this.props.style, display:"flex"};
		if (!this.props.direction) {
			style.flexDirection = "row";
		}
		else{
			style.flexDirection = this.props.direction;
		}
		if (this.props.alignItems){
			style.alignItems = this.props.alignItems;
		}
		if (this.props.justifyContent){
			style.justifyContent = this.props.justifyContent;
		}
		if (this.props.flex){
			style.flex = this.props.flex;
		}
		const {className} = this.props;
		return <div className={className} style={style}>{this.props.children}</div>
	}
}