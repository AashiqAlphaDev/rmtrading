const raiseEvent = function(eventType,instance){
	return (function(){
		this.props.dispatch({type:eventType});
	}).bind(instance);
};


export {
	raiseEvent
}