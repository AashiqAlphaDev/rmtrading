import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import flush from 'styled-jsx/server';
import getPageContext from '../src/getPageContext';


class BaseDocument extends Document {
	render() {
		const {pageContext} = this.props;
		return (
			<html lang="en" dir="ltr">
			<Head>
				<meta charSet="utf-8"/>
				<meta
					name="viewport"
					content={
						'user-scalable=0, initial-scale=1, ' +
						'minimum-scale=1, width=device-width, height=device-height'
					}
				/>
				<meta name="theme-color" content={pageContext.theme.palette.primary.main}/>
				<link href={"/static/style.css"} rel={"stylesheet"}/>
			</Head>
			<body className={"core"}>
			<Main/>
			<NextScript/>
			</body>
			</html>
		);
	}
}

BaseDocument.getInitialProps = async ctx => {
	const pageContext = getPageContext();
	const page = ctx.renderPage(Component => props => (
		<JssProvider registry={pageContext.sheetsRegistry} generateClassName={pageContext.generateClassName}>
			<Component pageContext={pageContext} {...props} />
		</JssProvider>
	));
	return {
		...page,
		pageContext,
		styles: (
			<React.Fragment>
				<style
					id="jss-server-side"
					dangerouslySetInnerHTML={{__html: pageContext.sheetsRegistry.toString()}}
				/>
				{flush() || null}
			</React.Fragment>
		),
	};
};

export default BaseDocument;