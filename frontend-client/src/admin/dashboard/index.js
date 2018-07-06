import React from "react";
import {connect} from "react-redux"
import {Redirect, Route, Switch} from "react-router-dom/index";
import Overview from "./overview"

let Index = (class extends React.Component {
	state = {
		url: ""
	};
    onPageChange(url) {
        this.setState({url})
    }

	render() {
		return <div>
			Sample
			{/*{*/}
                {/*JSON.stringify(this.props)*/}
			{/*}*/}
					{/*{*/}
					 	{/*this.props.auth.redirect &&*/}
					 	{/*<Redirect to={this.props.auth.redirect}/>*/}
					 {/*}*/}
					 {/*<Switch>*/}
						{/*<Route exact path={"admin/auth/login"} render={() => {*/}
							{/*return <Overview location={this.props} onPageChange={this.onPageChange.bind(this)}/>*/}
					 	{/*}}/>*/}


					{/*</Switch>*/}
			</div>

			}




});

export default connect(store => store)(Index);