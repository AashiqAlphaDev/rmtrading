import React from "react"
import DashboardContainer from "../../../components/admin-dashboard";
import {checkAdmin} from "../index";

let _Index = ()=>{
	return <DashboardContainer>
		Appointments
	</DashboardContainer>
};

let Index = checkAdmin(_Index);

export default Index