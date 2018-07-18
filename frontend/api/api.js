import base_url from "../store/base_url";
import fetch from 'isomorphic-fetch';


let isAdmin = function(sessionId){

	return new Promise(function (resolve, reject) {
		if(!sessionId){
			resolve(false);
			return false;
		}
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


let guardianDetails = function(sessionId, guardianId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/users/${guardianId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let petsOfGuardian = function(sessionId, guardianId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/of-owner/${guardianId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let petDetails = function(sessionId, petId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let petTypeDetails = function(sessionId, petTypeId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/app-data/pet-types/${petTypeId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let vaccinationDetails = function(sessionId, petId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}/vaccinations`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let visitDetails = function(sessionId, petId,visitId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}/visits/${visitId}`, {

            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}



export {isAdmin, guardianDetails,petsOfGuardian,petDetails,petTypeDetails,vaccinationDetails,visitDetails}