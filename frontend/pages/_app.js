import App, {Container} from 'next/app'
import React from 'react'
import {Provider} from "react-redux";
import store from "../store/store"
import withRedux from "next-redux-wrapper"
import BaseUrl from "../store/baseurl"
import Router from 'next/router'
import jsHttpCookie from 'cookie';
import jsCookie from 'js-cookie';
import "isomorphic-fetch"


export default withRedux(store)(class extends App {

	static async getInitialProps({Component, router, ctx}) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		if (ctx.pathname.startsWith("/admin")) {

		}

		if (ctx.pathname.startsWith("/super-admin") && ctx.pathname != "/super-admin/auth") {
			if (!ctx.isServer) {
				let token = jsCookie.get('token');
				var isSuperAdmin =false;
				if(!token){
					isSuperAdmin = false;
				}
				else{
					isSuperAdmin = await fetch(`${BaseUrl.frontend}/super-admin/session-check/${token}`);
				}
				if (!isSuperAdmin.ok) {
					Router.push('/super-admin/auth');
				}
			}
			else {
				if (ctx.req && ctx.req.headers) {
					const cookies = ctx.req.headers.cookie;
					if (!cookies) {
						ctx.res.writeHead(302, {
							Location: '/super-admin/auth'
						})
						ctx.res.end()
						ctx.res.finished = true
						console.log("null")
					}
					else if (typeof cookies === 'string') {
						const cookiesJSON = jsHttpCookie.parse(cookies);
						const token = cookiesJSON.token;
						console.log(token)
						var isSuperAdmin = false;
						if(!token){
							isSuperAdmin = false;
						}
						else{
							const response = await fetch(`${BaseUrl.backend}/super-admin/session-check/${token}`);
							console.log(response.ok)
							isSuperAdmin = response.ok;
						}
						if (!isSuperAdmin) {
							ctx.res.writeHead(302, {
								Location: '/super-admin/auth'
							})
							ctx.res.end()
							ctx.res.finished = true
						}
					}
				}
			}
		}
		if(ctx.pathname == "/super-admin/auth"){
			if (!ctx.isServer) {
				let token = jsCookie.get('token');
				var isSuperAdmin = await fetch(`${BaseUrl.frontend}/super-admin/session-check/${token}`);
				if (isSuperAdmin.ok) {
					Router.push('/super-admin');
				}
			}
			else {
				if (ctx.req && ctx.req.headers) {
					const cookies = ctx.req.headers.cookie;
					if (typeof cookies === 'string') {
						const cookiesJSON = jsHttpCookie.parse(cookies);
						const token = cookiesJSON.token;
						var isSuperAdmin = false;
						if(!token){
							isSuperAdmin = false;
						}
						else{
							const response = await fetch(`${BaseUrl.backend}/super-admin/session-check/${token}`);
							console.log(response.ok)
							isSuperAdmin = response.ok;
						}
						if (isSuperAdmin.ok) {
							ctx.res.writeHead(302, {
								Location: '/super-admin/'
							})
							ctx.res.end()
							ctx.res.finished = true
						}
					}
				}
			}

		}
		return {pageProps}
	}


	render() {
		const {Component, pageProps, store} = this.props
		return <Container>
			<Provider store={store}>
				<Component {...pageProps}/>
			</Provider>
		</Container>
	}
})