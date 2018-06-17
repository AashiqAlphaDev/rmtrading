import React from "react"
import {Paper} from "@material-ui/core/index";
import AnnotatedSection from "../../../components/annotated-section";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import style from "../style";

let Index = withStyles((theme)=>{
	return {
		...style(theme),
		actions:{
			marginTop:theme.spacing.unit*4,
			marginBottom:theme.spacing.unit*4
		}
	}
})(class extends React.Component{

	state={

	};

	componentWillMount(){
		console.log(this.props);
	}

	render(){
		const {classes} = this.props;
		return <AnnotatedSection title={"Add Vaccination Center"}
		                         desc={"Please provide the information to register Vaccination Center."}
		                         backButton={{url: "/super-admin/dashboard/vet-centers"}}>
			<Paper className={classes.paperPage}>

			</Paper>
		</AnnotatedSection>;
	}

});

export default connect(store=>store)(Index);