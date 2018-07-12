import {takeEvery} from "redux-saga/effects";
import React from "react";
import {isAdmin} from "../../api/api";
import Router from "next/router";
import {connect} from "react-redux"
import {authEvents} from "../../store/domain/auth";

const dashboardUiEvents = {

};

const dashboardUiCommands = {

};

const dashboardUiActions = {

};

let dashboardUiSaga = function*(){
	yield takeEvery(authEvents.ADMIN_LOGOUT_SUCCEEDED, function*() {
		Router.push('/auth/login');
	});
};

let checkAdmin = (Component)=>{
	return connect(store=>store)(class extends React.Component{
		static async getInitialProps(ctx){
			let result = await isAdmin(ctx.session_id);
			if (!result) {
				const {res} = ctx;
				if (res) {
					res.writeHead(302, {
						Location: '/auth/login'
					});
					res.end();
					res.finished = true;
				} else {
					Router.push('/auth/login');
				}
			}
			else{
				if(Component.getInitialProps){
					return await Component.getInitialProps.call(Component, ctx);
				}
				else{
					return {};
				}
			}
		}


		render(){
			return <Component {...this.props} />
		}
	})
}

export {
	checkAdmin,
	dashboardUiSaga,
	dashboardUiEvents,
	dashboardUiCommands,
	dashboardUiActions
}

export default class {
	static async getInitialProps({res}){
		if (res) {
			res.writeHead(302, {
				Location: '/dashboard/overview'
			});
			res.end();
			res.finished = true;
		} else {
			Router.push('/dashboard/overview');
		}
		return {}
	}
}