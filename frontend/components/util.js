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


let googlePlacesFetch = function*(query, type){
	let response = yield fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=${type}&key=AIzaSyD3I7ypbhu0swvARgZ7mmj6g9MQ6-stDQE`);
	return response.json()
}

export {
	setStateKey,
	raiseEvent,
	googlePlacesFetch
}