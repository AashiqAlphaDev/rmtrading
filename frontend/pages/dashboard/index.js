import React from "react";
import {isAdmin} from "../../api/api";
import Router from "next/router";

let checkAdmin = (Component)=>{
	return class extends React.Component{
		static async getInitialProps(appContext){
			const {ctx} = appContext;
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
					return await Component.getInitialProps.call(Component, appContext);
				}
				else{
					return {};
				}
			}
		}
	}
}

export {
	checkAdmin
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