import App, {Container} from 'next/app'
import React from 'react'
import {CssBaseline} from "@material-ui/core/index";
import {MuiThemeProvider} from "@material-ui/core/styles/index";
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from "@config/page-context";

export default class LoopApp extends App {

	constructor(props){
		super(props);
		this.pageContext = getPageContext();
	}

	pageContext = null;


	componentDidMount() {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	render() {
		const {Component, pageProps} = this.props;
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
					<Component pageContext={this.pageContext} {...pageProps} />
				</MuiThemeProvider>
			</JssProvider>
		</Container>
	}
}