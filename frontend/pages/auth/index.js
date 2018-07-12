import {takeEvery} from "redux-saga/effects"
import React from "react"
import Router from 'next/router'
import {isAdmin} from "../../api/api"
import {authEvents} from "../../store/domain/auth";

const authUiEvents = {

};

const authUiCommands = {

};

const authUiActions = {

};

const authUiReducer = function () {
	return {}
};

const authUiSaga = function*(){
	yield takeEvery(authEvents.ADMIN_LOGIN_SUCCEEDED, function*() {
		Router.push('/dashboard/overview');
	})
};


export default class {
	static async getInitialProps({res}){
		if (res) {
			res.writeHead(302, {
				Location: '/auth/login'
			});
			res.end();
			res.finished = true;
		} else {
			Router.push('/auth/login');
		}
		return {}
	}
}

let checkAdmin = (Component)=>{
	return class extends React.Component{
		static async getInitialProps(ctx){
			let result = await isAdmin(ctx.session_id);
			if (result) {
				const {res} = ctx;
				if (res) {
					res.writeHead(302, {
						Location: '/dashboard/overview'
					});
					res.end();
					res.finished = true;
				} else {
					Router.push('/dashboard/overview');
				}
			}
			else {
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
	}

}

export {
	checkAdmin,
	authUiReducer,
	authUiSaga
}