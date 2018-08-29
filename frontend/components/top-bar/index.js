import React from "react"
import Layout from "../layout";
import {withStyles} from "@material-ui/core/styles";
import {TextField, AppBar,Toolbar} from "@material-ui/core/index";
import {
    ChatIconPlain,
     GroupIconPlain, HomeIconPlain, LibraryIconPlain, NotificationIconPlain,

} from "../icons";
import Link from "next/link"
import {Typography} from "@material-ui/core/index";
import {withRouter} from 'next/router'
import {connect} from "react-redux"


const pages = [
	{
		Icon: () => {
			return <HomeIconPlain size={30}/>
		},
		url: "/home",
		label:"Home"
	},
    {
        Icon: () => {
            return <LibraryIconPlain size={30}/>;
        },
        url: "/library",
        label:"Library"
    },
	{
		Icon: () => {
			return <GroupIconPlain size={30}/>;
		},
		url: "/groups",
		label:"Groups"

	},
	{
		Icon: () => {
			return <ChatIconPlain size={30}/>;
		},
		url: "/chats",
		label:"Chats"

	},
    {
        Icon: () => {
            return <NotificationIconPlain size={30}/>;
        },
        url: "/notifications",
		label:"Notifications"

    },
	{
        Icon: () => {
            return <NotificationIconPlain size={30}/>
        },
        url: "/login",
		label:"Login"

    },

];




let AppToolbar = ({path, classes, dispatch})=>{
	return <AppBar position="static" color="primary">
			<Toolbar>
				<Layout className={classes.leftSectionToolBar} alignItems={"center"}>
					<Typography variant="title" color="inherit" className={classes.logo}>
						Loop
					</Typography>
					<TextField placeholder="Search"/>
				</Layout>
				<Layout>
					{
					pages.map((page)=>{
                        let isActive = path == page.url;
                        return <Link href={page.url} key={page.url}>
							<div onClick={()=>{isActive=page.url}}>
							<Layout direction={"column"} alignItems={"center"} className={classes.tabs}>
								<page.Icon/>
								<Typography variant="body1" className={(isActive==page.url)? classes.activeToolBarText:classes.toolBarText}>
									{page.label}
								</Typography>
							</Layout>
							</div>
						</Link>
                    })
					}
				</Layout>

			</Toolbar>
		</AppBar>
}

let _LoopContainer = (props) => {
	const {children, classes, router, dispatch} = props;
	return <Layout className={classes.body}>
		<Layout flex={1} direction={"column"}>
			<AppToolbar dispatch={dispatch} classes={classes} path={router.pathname} />
			{children}
		</Layout>
	</Layout>
}

let LoopContainer = withStyles((theme)=>{
	return {
		body:{
			height:"100%"
		},
		sidebar:{
			minWidth:300,
			background:theme.palette.primary.dark,

		},
		sideBarItemTitle:{
			color:"#FFF"
		},
		sideBarActiveItemTitle:{
			color:theme.palette.primary.dark
		},
		sideBarItem:{
			opacity:0.5,
		},
		sideBarActiveItem:{
			background:"#FFF"
		},
		navTitle:{
			flex:1
		},
        logo:{
            marginRight:theme.spacing.unit*3
        },
        leftSectionToolBar:{
            flex:1
        },
        tabs:{
            padding:theme.spacing.unit,
            marginRight:theme.spacing.unit *3
        },
        loginLayout:{
            marginLeft:theme.spacing.unit *5

        },
        toolBarText:{
            color:"#ffffff"
        },
        activeToolBarText:{
            color:"#1597e5"
		}
	}
})(withRouter(connect(store=>store)(_LoopContainer)));

export default LoopContainer;
