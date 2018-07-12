import React from 'react';
import PropTypes from 'prop-types';
import Document, {Head, Main, NextScript} from 'next/document';
import flush from 'styled-jsx/server';

class _Document extends Document {
	render() {
		const {pageContext} = this.props;
		return (
			<html lang="en" dir="ltr">
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content={'user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'} />
					<meta name="theme-color" content={pageContext.theme.palette.primary.main} />
					<link rel="preload" href="/static/index.css" />
					<link rel="preload" href="/static/style.css" />
					<link rel="stylesheet" href="/static/index.css" />
					<link rel="stylesheet" href="/static/style.css" />
						<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3I7ypbhu0swvARgZ7mmj6g9MQ6-stDQE&libraries=places" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

_Document.getInitialProps = ctx => {
	let pageContext = null;
	const page = ctx.renderPage(Component => {
		const WrappedComponent = props => {
			pageContext = props.pageContext;
			return <Component {...props} />;
		};
		WrappedComponent.propTypes = {
			pageContext: PropTypes.object.isRequired,
		};
		return WrappedComponent;
	});

	return {
		...page,
		pageContext,
		styles: (
			<React.Fragment>
				<style id="jss-server-side" dangerouslySetInnerHTML={{__html: pageContext.sheetsRegistry.toString()}} />
				{flush() || null}
			</React.Fragment>
		),
	};
};

export default _Document;
