import React from "react";
import {withStyles} from "@material-ui/core/styles";
import _ from "underscore";
import Layout from "../../components/layout";
import {AppBar,Toolbar,Button} from "@material-ui/core/index";
import {Link} from "react-router-dom";

const pages = [
	{label: "Overview", url: "/super-admin/dashboard/overview"},
	{label: "Vet Centers", url: "/super-admin/dashboard/vet-centers"},
	{label: "Vaccines", url: "/super-admin/dashboard/vaccines"},
	{label: "Application Data", url: "/super-admin/dashboard/application-data"},
	{label: "Requests", url: "/super-admin/dashboard/requests"},
];

export default withStyles((theme)=>(
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
							<img src={"/logo.png"} style={{height:40}}/>
						</div>
						<Layout>
							{
								pages.map((page, index) => {
									return <Link to={page.url} key={index}><Button key={index} className={classes.navButton} color={(index === _.findIndex(pages,(item)=>{return this.props.location.pathname===item.url})) ? 'primary' : 'default'}>
										{page.label}
									</Button></Link>
								})
							}
						</Layout>
					</Toolbar>
				</AppBar>
				{this.props.children}
			</Layout>
		</div>;
	}
})