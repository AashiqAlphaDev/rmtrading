import React from "react";
import {withStyles} from "@material-ui/core/styles";
import style from "./style";
import Layout from "../../components/layout";
import {AppBar, Toolbar, Button} from "@material-ui/core/index";
import {Link} from "react-router-dom";
import {CHECK_ADMIN, REQUEST_LOGOUT} from "../../stores/auth/actions";
import {connect} from "react-redux"

const pages = [
	{label:"Overview",url:"/admin/dashboard"},
	{label: "Pets", url: "/admin/dashboard/pets"},
	{label: "Vaccination", url: "/admin/dashboard/vaccinations"},
	{label: "Manage Appointments", url: "/admin/dashboard/inventory"},
	{label: "Settings", url: "/admin/dashboard/staff"},
];

let Index = withStyles((theme) => (
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
	componentWillMount() {
		this.props.dispatch({type: CHECK_ADMIN})
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.fullScreen}>
			<Layout direction={"column"} className={`flex`}>
				<AppBar position="static" color="default">
					<Toolbar className={`container`}>
						<div className={`flex`}>
							<Link to={"/admin/dashboard/"}>
								<img src={"/logo.png"} style={{height: 40}} alt={"logo"}/>
							</Link>
						</div>
						<Layout>
							{
								pages.map((page, index) => {
									return <Link to={page.url} key={index}><Button key={index}
									                                               className={classes.navButton}
									                                               color={(this.props.currentPage === page.url) ? 'primary' : 'default'}>
										{page.label}
									</Button></Link>
								})
							}
							<Button className={classes.navButton} onClick={() => {
								this.props.dispatch({type: REQUEST_LOGOUT})
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

export default connect(store => store)(Index);