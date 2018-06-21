import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import InputContainer from "../../../components/input"
import {QUERY_VET_CENTERS} from "../../../stores/vet-centers/actions";
import {TextField} from "@material-ui/core/es/index";
import {REQUEST_PET_FETCH} from "../../../stores/pets/actions";
import {Redirect} from "react-router-dom";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			marginLeft: theme.spacing.unit * 2,
			display: "flex",
			flexDirection: "column"
		},
		title: {
			background: "#e6ecf0",
			width: "100%",
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 2,
		},

		segment: {
			marginBottom: theme.spacing.unit * 3,
			padding: theme.spacing.unit * 1
		}
	}
})(class extends React.Component {
	state={
		pet_id:""
	}

	componentWillMount() {
		this.props.dispatch({type: QUERY_VET_CENTERS});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.petDetail._id){

		}
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.body}>
			{
				this.props.petDetail._id &&
				<Redirect to={`/admin/dashboard/vaccinations/${this.props.petDetail._id}`} />
			}
			<form onSubmit={(e)=>{
				e.preventDefault();
				this.props.dispatch({type:REQUEST_PET_FETCH, payload:{pet_id:this.state.pet_id}});
			}}>
				<InputContainer label={"Scan / Enter pet ID / Chip Number"}>
					<TextField onChange={(event)=>{
						this.setState({pet_id:event.target.value})
					}}/>
				</InputContainer>
			</form>
		</div>;
	}
});

export default connect(store => store)(Index)