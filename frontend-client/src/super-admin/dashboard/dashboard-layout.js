import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Layout from "../../components/layout";
import {AppBar, Toolbar} from "@material-ui/core/index";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import _ from "underscore";
import style from "./style";
import {IconButton, Menu, MenuItem, Tabs,Tab} from "@material-ui/core/es/index";
import {AccountIcon, AppsIcon, EmailOutlineIcon, SettingsOutlineIcon} from "mdi-react";
import {REQUEST_SUPER_ADMIN_LOGOUT} from "../../stores/auth/actions";

let Icon = (_Icon)=>{return (props)=>(<_Icon {...props} size={20} />)};

const pages = [
    {icon:({className})=>{return <span className={`icon-home ${className}`}></span>}, label: "Overview",  		url: "/super-admin/dashboard"},
    {icon:({className})=>{return <span className={`icon-box ${className}`}></span>}, label: "Vet Centers", 		url: "/super-admin/dashboard/vet-centers"},
    {icon:({className})=>{return <span className={`icon-syringe-active ${className}`}></span>}, label: "Vaccines", 			url: "/super-admin/dashboard/vaccines"},



];

let Index = withStyles((theme) => {
    return (
        {
            ...style(theme),
            fullScreen: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
            },
            selected:{
                fill:theme.palette.secondary.main
            },
            navIcon:{
                margin:theme.spacing.unit*1
            }
        }
    )
})(class extends React.Component {
    state={
        anchorEl:null
    }
	render() {
		const {classes} = this.props;
		var currentTab = 0;
		if (this.props.currentPage !== "") {
			currentTab = _.findIndex(pages, (item) => {
				return item.url === this.props.currentPage;
			});
		}
		 return <div className={classes.fullScreen}>
				<Layout direction={"column"} className={`flex`}>
					<AppBar position="static" color="default">
						<Toolbar className={`container`}>
							<Layout direction={"column"} className={`flex`}>
								<Layout alignItems={"center"}>
									<div className={`flex`}>
										<Link to={"/super-admin/dashboard/"} className={classes.logo}>
											<img src={"/logo.png"} style={{height: 35}} alt={"logo"}/>
										</Link>
									</div>
									<Tabs centered fullWidth value={currentTab}>
										{
											pages.map((page, index) => {
												let PageIcon = Icon(page.icon);
												let iconClass = (index == currentTab)? classes.selected:'';
												return <Tab classes={{label: classes.tabIcon}}
												            label={<Layout alignItems={"center"}><PageIcon
													            className={`${iconClass} ${this.props.classes.navIcon}`}/>{page.label}
												            </Layout>}
												            component={Link} to={page.url} key={index}>
												</Tab>;
											})
										}
									</Tabs>
									<div>
										<IconButton>
											<SettingsOutlineIcon/>
										</IconButton>
										<IconButton>
											<span className="icon-bell-active"></span>
										</IconButton>
										<IconButton>
											<EmailOutlineIcon  />
										</IconButton>
										<IconButton onClick={(event)=>{this.setState({anchorEl:event.currentTarget})}}>
											<AccountIcon />
										</IconButton>
										<Menu
											anchorEl={this.state.anchorEl}
											open={Boolean(this.state.anchorEl)}
											onClose={()=>{this.setState({anchorEl:null})}}
										>
											<MenuItem onClick={()=>{
												this.props.dispatch({type:REQUEST_SUPER_ADMIN_LOGOUT});
											}}>Logout</MenuItem>
										</Menu>
									</div>
								</Layout>
							</Layout>
						</Toolbar>
					</AppBar>
					{this.props.children}
				</Layout>
			</div>;
	}
});
export default connect(store => store)(Index)