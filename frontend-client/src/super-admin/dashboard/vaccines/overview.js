import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {Typography,Paper,Table,TableHead,TableRow,TableCell,TableBody} from "@material-ui/core/index";
import {IconButton} from "@material-ui/core/es/index";
import {ArrowRightIcon, DeleteIcon, EditIcon} from "mdi-react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {QUERY_VACCINES, REQUEST_DELETE_VACCINE} from "../../../stores/vaccines/actions";

let Index = withStyles((theme)=>{
	return {
		...style(theme),
		body:{
			marginLeft:theme.spacing.unit*2,
			display:"flex",
			flexDirection:"column"
		},
		title:{
			background:"#e6ecf0",
			width:"100%",
			paddingTop:theme.spacing.unit*3,
			paddingBottom:theme.spacing.unit*2,
		},

		segment:{
			marginBottom:theme.spacing.unit*3,
			padding:theme.spacing.unit*1
		}
	}
})(class extends React.Component{
	componentWillMount(){
		this.props.dispatch({type:QUERY_VACCINES});
	}
	render(){
		const {classes} = this.props;
		return <div className={classes.body}>
			<Typography variant="title" gutterBottom className={classes.title}>
				20 Vaccination Centers around 10 countries.
			</Typography>
			<Paper className={classes.list} elevation={0}>
				{
					this.props.vaccines.list.docs &&
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Disease</TableCell>
								<TableCell>Pet</TableCell>
								<TableCell>Country</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.props.vaccines.list.docs.map((item, index) => {
									return <TableRow key={index}>

										<TableCell>
											<Typography variant={"body2"}>
												{item.name}
											</Typography>
										</TableCell>
										<TableCell>{item.data.disease}</TableCell>
										<TableCell>{item.data.pet_type}</TableCell>
										<TableCell>{item.data.country}</TableCell>
										<TableCell>
											<IconButton>
												<DeleteIcon color="primary" onClick={()=>{
													this.props.dispatch({type:REQUEST_DELETE_VACCINE, payload:{vaccine_id:item._id}});
												}}/>
											</IconButton>
											<Link to={`/super-admin/dashboard/vaccines/${item._id}/`}>
												<IconButton>
													<EditIcon color="primary" />
												</IconButton>
											</Link>
											<Link to={`/super-admin/dashboard/vaccines/${item._id}/manage`}>
												<IconButton>
													<ArrowRightIcon color="primary" />
												</IconButton>
											</Link>
										</TableCell>
									</TableRow>
								})
							}
						</TableBody>
					</Table>
				}

			</Paper>
		</div>;
	}
});

export default connect(store=>store)(Index)