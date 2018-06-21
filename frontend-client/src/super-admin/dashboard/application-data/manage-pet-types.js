import React from "react"

import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import Layout from "../../../components/layout";
import {Button, Paper, TextField} from "@material-ui/core/es/index";
import InputContainer from "../../../components/input"



let InputContainerTemplate = ({title})=>{
	return	<div>
	<InputContainer label={"Field Name " + title}>
		<TextField/>
	</InputContainer>
	<InputContainer label={"Field Type " + title}>
			<TextField/>
		</InputContainer>

	</div>

}

export default withStyles((theme) => {
	return {
		...style(theme),
		actions: {
			marginTop: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit * 4
		},
        body:{
            marginTop: theme.spacing.unit * 2
        }
	}
})(class extends React.Component {
    state = {
        fields:[1]
    };
	render() {

		const {classes} = this.props;
		console.log(this.state)
		return <Layout direction={"column"} flex={1} className={classes.body}>
			<Layout className={`container ${classes.flex}`} direction={"column"}>
				<Paper >
				<Layout justifyContent={"center"} direction={"column"}>

                    {
                        this.state.fields.map((item, index) => {
                            return <InputContainerTemplate key={index} title={index+1}/>
                        })
                    }
					<Button onClick={() => {
						var tempArray = this.state.fields;
						tempArray.push(tempArray.length);
						this.setState({fields:tempArray})
						console.log(this.state)
                    }}> + Add A field</Button>

				</Layout>
				</Paper>
		</Layout>
		</Layout>
	}
})