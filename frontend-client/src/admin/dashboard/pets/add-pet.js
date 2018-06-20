import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import InputContainer from "../../../components/input"
import style from "../style";
import {
	COUNTRY_CLEAR_MATCHES,
	STATE_CLEAR_MATCHES
} from "../../../stores/countries/actions";
import {MenuItem, Select, TextField} from "@material-ui/core/es/index";
import {QUERY_BREEDS, QUERY_PET_TYPES} from "../../../stores/pet-types/actions";

let Index = withStyles((theme)=>{
	return {
		...style(theme),
		actions:{
			marginTop:theme.spacing.unit*4,
			marginBottom:theme.spacing.unit*4
		}
	}
})(class extends React.PureComponent{

	state={
		name:""
	};


	componentWillMount(){
		this.props.dispatch({type:QUERY_PET_TYPES});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.petTypes){

		}
	}


	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Pet"} backButton={{url: "/admin/dashboard/pets"}}>
			<Paper className={classes.paperPage}>
				<InputContainer label={"Name"}>
					<TextField value={this.state.name} onChange={(event)=>{
						this.setState({name:event.target.value});
					}}></TextField>
				</InputContainer>
				<InputContainer label={"Pet Type"}>
					{
						this.props.petTypes.list.length>0 &&
						<Select value={this.state.pet_type} onChange={(event)=>{
							this.setState({pet_type:event.target.value})
							this.props.dispatch({type:QUERY_BREEDS, payload:{pet_type_id:event.target.value}});
						}}>
							{
								this.props.petTypes.list.map((item)=>{
									return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
								})
							}
						</Select>
					}
					{
						this.props.petTypes.list.length==0 &&
						<Select disabled>
						</Select>
					}
				</InputContainer>
				<InputContainer label={"Breed"}>
					{
						this.props.petTypes.breed_list.length>0 &&
						<Select value={this.state.breed} onChange={(event)=>{this.setState({breed:event.target.value})}}>
							{
								this.props.petTypes.breed_list.map((item)=>{
									return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
								})
							}
						</Select>
					}
					{
						this.props.petTypes.breed_list.length==0 &&
						<Select disabled>
						</Select>
					}
				</InputContainer>
				<InputContainer label={"Date Of Birth"}>
					<TextField value={this.state.dateOfBirth} onChange={(event)=>{
						this.setState({dateOfBirth:event.target.value});
					}}></TextField>
				</InputContainer>
			</Paper>
		</AnnotatedSection>;
	}

});

export default connect(store=>store)(Index);