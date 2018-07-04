const setStateKey = function(key){
	return ({target})=>{
		this.setState({[key]:target.value});
	}
}


const raiseEvent = function(eventType,instance){
	return (function(){
		this.props.dispatch({type:eventType});
	}).bind(instance);
}

export {
	setStateKey,
	raiseEvent
}