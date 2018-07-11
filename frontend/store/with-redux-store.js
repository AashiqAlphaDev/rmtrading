import React from 'react'
import initializeStore from './store'
import cookies from "next-cookies";

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
	if (isServer) {
		return initializeStore(initialState)
	}

	if (!window[__NEXT_REDUX_STORE__]) {
		window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
	}
	return window[__NEXT_REDUX_STORE__]
}

export default (App) => {
	return class AppWithRedux extends React.Component {
		static async getInitialProps (appContext) {
			let {session_id} = cookies(appContext.ctx);
			const reduxStore = getOrCreateStore();
			reduxStore.dispatch({type:"SET_SESSION", payload:session_id});
			appContext.ctx.session_id = session_id;
			appContext.ctx.reduxStore = reduxStore
			let appProps = {}
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps.call(App, appContext)
			}

			return {
				...appProps,
				initialReduxState: reduxStore.getState()
			}
		}

		constructor(props) {
			super(props)
			this.reduxStore = getOrCreateStore(props.initialReduxState)
		}

		render() {
			return <App {...this.props} reduxStore={this.reduxStore} />
		}
	}
}