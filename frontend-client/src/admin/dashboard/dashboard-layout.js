import React from "react";
import {withStyles} from "@material-ui/core/styles";
import style from "./style";
import _ from "underscore";
import Layout from "../../components/layout";
import {AppBar,Toolbar,Button} from "@material-ui/core/index";
import {Link} from "react-router-dom";
import {CHECK_ADMIN, REQUEST_LOGOUT, REQUEST_SUPER_ADMIN_LOGOUT} from "../../stores/auth/actions";
import {connect} from "react-redux"

const pages = [
	{label: "Pet Registration", url: "/admin/dashboard/pet-registration"},
	{label: "Vaccination", url: "/admin/dashboard/vaccination-centers"},
	{label: "Manage Appointments", url: "/admin/dashboard/inventory"},
	{label: "Settings", url: "/admin/dashboard/staff"},
];

let Index = withStyles((theme)=>(
	{
		...style(theme),
		fullScreen: {
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column"
		}
	}
))(class extends React.Component {
	componentWillMount(){
		this.props.dispatch({type:CHECK_ADMIN})
	}
	render() {
		const {classes} = this.props;
		return <div className={classes.fullScreen}>
			<Layout direction={"column"}>
				<AppBar position="static" color="default">
					<Toolbar className={`container`}>
						<div className={`flex`}>
							<img src={"/logo.png"} style={{height:40}} alt={"logo"}/>
						</div>
						<Layout>
							{
								pages.map((page, index) => {
									return <Link to={page.url} key={index}><Button key={index} className={classes.navButton} color={(index === _.findIndex(pages,(item)=>{return this.props.location.pathname===item.url})) ? 'primary' : 'default'}>
										{page.label}
									</Button></Link>
								})
							}
							<Button className={classes.navButton} onClick={()=>{
								this.props.dispatch({type:REQUEST_LOGOUT})
							}}>
								Logout
							</Button>
						</Layout>
					</Toolbar>
				</AppBar>
				{this.props.children}
			</Layout>
		</div>;
	}
});

export default connect(store=>store)(Index);