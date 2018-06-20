import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Layout from "../../components/layout";
import {AppBar,Toolbar,Button} from "@material-ui/core/index";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {REQUEST_SUPER_ADMIN_LOGOUT} from "../../stores/auth/actions";

const pages = [
	{label: "Overview", url: "/super-admin/dashboard/"},
	{label: "Vet Centers", url: "/super-admin/dashboard/vet-centers"},
	{label: "Vaccines", url: "/super-admin/dashboard/vaccines"},
	{label: "Application Data", url: "/super-admin/dashboard/application-data"},
	{label: "Orders", url: "/super-admin/dashboard/orders"},
	{label: "Requests", url: "/super-admin/dashboard/requests"}
];

let Index = withStyles(()=>(
	{
		fullScreen: {
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column"
		}
	}
))(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <div className={classes.fullScreen}>
			<Layout direction={"column"} className={`flex`}>
				<AppBar position="static" color="default">
					<Toolbar className={`container`}>
						<div className={`flex`}>
							<Link to={"/super-admin/dashboard/"}>
								<img src={"/logo.png"} style={{height:40}} alt={"logo"}/>
							</Link>
						</div>
						<Layout>
							{
								pages.map((page, index) => {
									return <Link to={page.url} key={index}><Button key={index} className={classes.navButton} color={(this.props.currentPage==page.url) ? 'primary' : 'default'}>
										{page.label}
									</Button></Link>
								})
							}
							<Button className={classes.navButton} onClick={()=>{
								this.props.dispatch({type:REQUEST_SUPER_ADMIN_LOGOUT})
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
export default connect(store=>store)(Index)