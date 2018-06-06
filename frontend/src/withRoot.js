import React from 'react';
import PropTypes from 'prop-types';
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getPageContext from './getPageContext';
import withStyles from "@material-ui/core/styles/withStyles";

function withRoot(styles = {}) {
	return (_Component) => {
		const Component = withStyles(styles)(_Component)

		class WithRoot extends React.Component {
			constructor(props, context) {
				super(props, context);
				this.pageContext = this.props.pageContext || getPageContext();
			}

			componentDidMount() {
				const jssStyles = document.querySelector('#jss-server-side');
				if (jssStyles && jssStyles.parentNode) {
					jssStyles.parentNode.removeChild(jssStyles);
				}
			}

			pageContext = null;

			render() {
				return (
					<MuiThemeProvider
						theme={this.pageContext.theme}
						sheetsManager={this.pageContext.sheetsManager}
					>
						<Component {...this.props} />
						<CssBaseline/>
					</MuiThemeProvider>
				);
			}
		}

		WithRoot.propTypes = {
			pageContext: PropTypes.object,
		};

		WithRoot.getInitialProps = ctx => {
			if (Component.getInitialProps) {
				return Component.getInitialProps(ctx);
			}

			return {};
		};

		return WithRoot;
	}
}

export default withRoot;