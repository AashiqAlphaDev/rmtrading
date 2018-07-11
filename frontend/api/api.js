import base_url from "../store/base_url";
import fetch from 'isomorphic-fetch';


let isAdmin = function(sessionId){
	return new Promise(function (resolve, reject) {
		fetch(`${base_url}/admin`, {
			method:"GET",
			headers:{
				"X-Session-Id":sessionId
			}
		}).then(function (response) {
			resolve(response.ok);
		}).catch(function (err) {

		});
	});
}

export {isAdmin}