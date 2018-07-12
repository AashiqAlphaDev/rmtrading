import React from "react"
import DashboardContainer from "../../../components/admin-dashboard";
import {checkAdmin} from "../index";
import Layout from "../../../components/layout";
import {Paper,List,Typography,FormControl, TextField,Input, InputAdornment, Button} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles"
import {setStateKey} from "../../../components/util"
import {connect} from "react-redux"
import {PetsIcon, UserIcon, SearchIcon} from "../../../components/icons";
import {ListItem, ListItemText, Divider, ListItemIcon} from "@material-ui/core/index";
import {Collapse} from "@material-ui/core/index";


let _Index = class extends React.Component {

	state = {query:"", showRegister:true};
	setStateKey = setStateKey.bind(this);

	render() {
		const {classes} = this.props;
		return <DashboardContainer>
			<Layout flex={1}>
				<Layout className={classes.leftList} elevation={0} direction={"column"}>
					<Layout className={classes.searchContainer} direction={"column"}>
						<Layout flex={1} direction={"column"}>
							<TextField
								value={this.state.query}
								onChange={this.setStateKey("query")}
								placeholder={"Search a pet or a guardian"}
								InputProps={{
									endAdornment: <SearchIcon size={25} pad={5}/>,
								}}
								onFocus={()=>{
									this.setState({showRegister:false});
								}}
								onBlur={()=>{
									this.setState({showRegister:true});
								}}
							/>
						</Layout>
					</Layout>
					<Collapse in={this.state.showRegister}>
						<Divider />
						<Layout className={classes.searchContainer}>
							<Button size={"small"}>Register Pet</Button>
							<Button size={"small"}>Register Guardian</Button>
							<Button size={"small"}>Scan</Button>

						</Layout>
					</Collapse>
					<Divider />
					<Layout className={classes.list} direction={"column"}>
						<List>
							{
								[1,2,3,4,5,6].map(()=>{
									return <React.Fragment>
										<ListItem>
											<ListItemIcon>
												<PetsIcon size={32}/>
											</ListItemIcon>
											<ListItemText primary={"PetName"} secondary={"Female - Dog - 24 Years"} />
										</ListItem>
										<Divider />
									</React.Fragment>
								})
							}
							{
								[1,2,3,4,5,6].map(()=>{
									return <React.Fragment>
										<ListItem>
											<ListItemIcon>
												<UserIcon size={32}/>
											</ListItemIcon>
											<ListItemText primary={"Karthik Thirumalasetti"} secondary={"2 Pets"} />
										</ListItem>
										<Divider />
									</React.Fragment>
								})
							}
							{
								[1,2,3,4,5,6].map(()=>{
									return <React.Fragment>
										<ListItem>
											<ListItemIcon>
												<UserIcon size={32}/>
											</ListItemIcon>
											<ListItemText primary={"Karthik Thirumalasetti"} secondary={"2 Pets"} />
										</ListItem>
										<Divider />
									</React.Fragment>
								})
							}
						</List>
					</Layout>
				</Layout>
				<Layout className={classes.rightPanel}>
					<Layout flex={1} alignItems={"center"} justifyContent={"center"}>
					Select Pet / Guardian to view details
					</Layout>
				</Layout>
			</Layout>
		</DashboardContainer>
	}
};

const Index = withStyles((theme)=>{
	return {
		searchContainer:{
			padding:theme.spacing.unit*2
		},
		leftList:{
			background:"#FFF",
			width:360
		},
		rightPanel:{
			flex:1,
			margin:theme.spacing.unit*2
		},
		list:{
			flex:1,
			overflow:"scroll"
		}
	}
})(connect(store=>store)(checkAdmin(_Index)))
export default Index;