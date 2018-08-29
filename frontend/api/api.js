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


let visitsDetails = function(sessionId, petId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}/visits`, {
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


let guardianSelfDetails = function(sessionId){
    return new Promise(function (resolve, reject) {
        console.log("inside self",sessionId);
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/users/self`, {
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

let vaccinationCenterDetails = function(sessionId,vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}`, {
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

let vaccinationCenterDetail = function(vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let vaccineDetail = function(vaccineId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccines/${vaccineId}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let claimCenters = function(vaccineId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/claims`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}



let vaccinationCenterAdmins = function(vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}/admins`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });

}

let vaccinationCenters = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}







let vaccinesList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccines`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}

let petTypeList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/app-data/pet-types`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}


let breedList = function(petId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/app-data/pet-types/${petId}/breeds`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}







let categoriesList = function(petId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/categories`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}











export {isAdmin, guardianDetails,petsOfGuardian,petDetails,petTypeDetails,vaccinationDetails,visitDetails,vaccinationCenterDetails,guardianSelfDetails,vaccinationCenters,vaccinationCenterDetail,vaccinesList,petTypeList,vaccinationCenterAdmins,vaccineDetail,claimCenters,visitsDetails,breedList,categoriesList}