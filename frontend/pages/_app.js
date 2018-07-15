import App, {Container} from 'next/app'
import React from 'react'
import {CssBaseline} from "@material-ui/core/index";
import {MuiThemeProvider} from "@material-ui/core/styles/index";
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from "../config/page-context";
import {Provider} from "react-redux"
import withRedux from "../store/with-redux-store";


class _App extends App {

	constructor(props){
		super(props);
		this.pageContext = getPageContext();
	}

	pageContext = null;


	static async getInitialProps({Component, router, ctx}) {
		let pageProps = {};


		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		return {...pageProps}
	}

	componentDidMount() {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	render() {
		const {Component, pageProps, reduxStore} = this.props;
		return <Container>
			<JssProvider
				registry={this.pageContext.sheetsRegistry}
				generateClassName={this.pageContext.generateClassName}
			>
				<MuiThemeProvider
					theme={this.pageContext.theme}
					sheetsManager={this.pageContext.sheetsManager}
				>
					<CssBaseline/>
					<Provider store={reduxStore}>
						<Component {...this.props} pageContext={this.pageContext} {...pageProps} />
					</Provider>
				</MuiThemeProvider>
			</JssProvider>
		</Container>
	}
}

export default withRedux(_App)