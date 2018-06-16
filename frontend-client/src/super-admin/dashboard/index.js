import React from "react";
import DashboardLayout from "./dashboard-layout"
import VetCenters from "./vet-centers"


let Index = (class extends React.Component {
	render(){
		return <DashboardLayout location={this.props.location}>
			<VetCenters />
		</DashboardLayout>;
	}
});

export default Index;