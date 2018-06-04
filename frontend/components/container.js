import React from "react";

export default class Container extends React.Component{
	render(){
		return <div className={this.props.className}>{this.props.children}</div>
	}
}