import React from "react"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import {Button, MenuItem, Paper, Select, Typography} from "@material-ui/core/es/index";
import {CLEAR_TOKENS, REQUEST_GENERATE_TOKENS} from "../../../stores/entities/tokens/actions";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body:{
			margin:10
		},

	}
})(class extends React.Component {
	state = {
		count:100
	};

	componentWillMount() {
		this.props.dispatch({type:CLEAR_TOKENS});
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.tokens.tokensGenerated) {
			window.PrintElem(nextProps.tokens.list);
		}
	}

	render() {
		const {classes} = this.props;
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container`} direction={"column"}>
				<Paper className={classes.paperPage}>
					<Layout>
						<Typography className={`flex`}>
							Generate Tokens
						</Typography>
						<Select value={this.state.count} onChange={(event)=>{this.setState({count:event.target.value})}}>
							<MenuItem value={100}>100</MenuItem>
							<MenuItem value={500}>500</MenuItem>
							<MenuItem value={1000}>1000</MenuItem>
							<MenuItem value={5000}>5000</MenuItem>
						</Select>
						<Button onClick={()=>{
							this.props.dispatch({type:REQUEST_GENERATE_TOKENS, payload:{count:this.state.count}});}}>Generate</Button>
					</Layout>
				</Paper>
			</Layout>
		</Layout>;
	}
});

export default connect(store => store)(Index);