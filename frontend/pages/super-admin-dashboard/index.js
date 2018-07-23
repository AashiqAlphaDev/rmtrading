import React from "react";
import {isAdmin} from "../../api/api";
import Router from "next/router";
import {connect} from "react-redux"

let checkAdmin = (Component)=>{
	return connect(store=>store)(class extends React.Component{
		static async getInitialProps(ctx){
		}


		render(){
			return <Component {...this.props} />
		}
	})
}

export {

}

export default class {
	static async getInitialProps({res}){
		if (res) {
			res.writeHead(302, {
				Location: '/super-admin-dashboard/overview'
			});
			res.end();
			res.finished = true;
		} else {
			Router.push('/super-admin-dashboard/overview');
		}
		return {}
	}
}