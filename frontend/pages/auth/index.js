import React from "react"
import Router from 'next/router'

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