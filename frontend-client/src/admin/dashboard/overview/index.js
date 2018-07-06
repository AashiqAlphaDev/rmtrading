import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";




class _Index extends React.Component {
    render() {
        const {classes} = this.props;
        return <div></div>
    }
}

const Index = connect(store => store)(withStyles((theme) => {
    return {}
})(_Index));

export default Index