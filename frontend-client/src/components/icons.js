import React from "react"

let AppointmentsIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-appointments-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span><span className="path6"></span><span className="path7"></span><span
		className="path8"></span><span className="path9"></span><span className="path10"></span><span
		className="path11"></span><span className="path12"></span><span className="path13"></span><span
		className="path14"></span><span className="path15"></span></span></span>
};

let CardIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-cards-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span></span></span>
};

let CountriesIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-countries-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span><span className="path6"></span><span className="path7"></span><span
		className="path8"></span><span className="path9"></span><span className="path10"></span><span
		className="path11"></span></span></span>
};

let DiseasesIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-diseases-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span><span className="path6"></span><span className="path7"></span><span
		className="path8"></span><span className="path9"></span></span></span>
};

let InventoryIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-inventory-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span><span className="path6"></span><span className="path7"></span><span
		className="path8"></span><span className="path9"></span><span className="path10"></span><span
		className="path11"></span><span className="path12"></span><span className="path13"></span><span
		className="path14"></span><span className="path15"></span><span className="path16"></span><span
		className="path17"></span><span className="path18"></span><span className="path19"></span><span
		className="path20"></span><span className="path21"></span></span></span>
}

let OverviewIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-overview-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span></span></span>
}

let PetsIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-pets-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span><span className="path6"></span><span className="path7"></span><span
		className="path8"></span><span className="path9"></span><span className="path10"></span><span
		className="path11"></span><span className="path12"></span></span></span>
}

let SyringeIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-syringe-icon"><span
		className="path1"></span><span
		className="path2"></span><span className="path3"></span><span className="path4"></span><span
		className="path5"></span><span className="path6"></span><span className="path7"></span><span
		className="path8"></span></span></span>
}

let VetCenterIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}}><span className="icon-vet-centers-icon"><span
		className="path1"></span><span
		className="path2"></span></span></span>
}

let VisitsIcon = ({size}) => {
	return <span style={{fontSize: size, lineHeight: `${size}px`}} className="icon-visits-icon"><span
		className="path1"></span><span className="path2"></span><span
		className="path3"></span><span className="path4"></span><span className="path5"></span><span
		className="path6"></span><span className="path7"></span></span>
}

let DeleteIcon = ({size})=>{
	return <span style={{fontSize: size, lineHeight: `${size}px`}} className="icon-delete-icon"><span className="path1"></span><span className="path2"></span><span
		className="path3"></span><span className="path4"></span><span className="path5"></span><span
		className="path6"></span><span className="path7"></span></span>
}


let EditIcon = ({size})=>{
	return <span style={{fontSize: size, lineHeight: `${size}px`}} className="icon-edit-icon"><span className="path1"></span><span className="path2"></span><span
		className="path3"></span><span className="path4"></span><span className="path5"></span></span>
}


export {
	AppointmentsIcon,
	CardIcon,
	CountriesIcon,
	DiseasesIcon,
	InventoryIcon,
	OverviewIcon,
	PetsIcon,
	SyringeIcon,
	VetCenterIcon, VisitsIcon,
	DeleteIcon,
	EditIcon
}
