import React from "react";
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles";
import style from "../style";
import {connect} from "react-redux";
import {BugIcon, HospitalBuildingIcon, MapIcon, MedicalBagIcon, PawIcon, PillIcon} from "mdi-react";
import {MetricDataCard, OverViewMetric} from "../../../components/dashboard-components";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			overflow: "scroll"
		},
		content: {
			marginTop: theme.spacing.unit * 2,
		},
		listCard: {
			flex: 1,
			minWidth: 200,
			margin: theme.spacing.unit * 1,
			boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
		},
		listTitle: {
			padding: theme.spacing.unit * 2
		},
		card: {
			flex: 1,
			margin: theme.spacing.unit * 1,
			padding: theme.spacing.unit * 2,
			boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
		},
		cardInfo: {
			marginLeft: theme.spacing.unit * 2,
		},
		cardIcon: {
			border: `2px solid ${theme.palette.grey['200']}`,
			background: "none",
		},
		cardIconSvg: {
			fill: theme.palette.secondary.main
		},
		titleIconSvg: {
			paddingRight: 1 * theme.spacing.unit,
			fill: theme.palette.secondary.main
		}
	}
})(class extends React.Component {

	state = {
		metrics: [
			{
				icon: ({className}) => {
					return <MedicalBagIcon className={className} />
				}, title: "Vaccinations", metric: "30,000"
			},
			{
				icon: ({className}) => {
					return <PawIcon className={className} />
				}, title: "Pets", metric: "30,000"
			},
			{
				icon: ({className}) => {
					return<PillIcon className={className} />
				}, title: "Vaccines", metric: "30,000"
			},
			{
				icon: ({className}) => {
					return <BugIcon className={className} />
				}, title: "Diseases", metric: "30,000"
			},
			{
				icon: ({className}) => {
					return <HospitalBuildingIcon className={className} />
				}, title: "Vet Centers", metric: "30,000"
			},
		],
		vetCenters: {
			columnTitles: ["Name", {label: "Count", isNumeric: true}],
			data: [
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
			]
		},
		vaccines: {
			columnTitles: ["Name", {label: "Count", isNumeric: true}],
			data: [
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
			]
		},
		states: {
			columnTitles: ["Name", {label: "Count", isNumeric: true}],
			data: [
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
				["Sample 1", 100],
			]
		},
		vaccinations: {
			columnTitles: ["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
			data: [
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
				["Vaccine", "Pet Id", "Date", "Vaccination Center", "State", "Country"],
			]
		}
	}

	componentWillMount() {
		if (this.props.onPageChange) {
			this.props.onPageChange("/admin/dashboard");
		}
	}

	render() {
		const {classes} = this.props;
		return <div direction={"column"} flex={1} className={`${classes.body}`}>
			<div className={`container ${classes.content}`}>
				<Layout>
					{
						this.state.metrics.map((item, index) => {
							return <OverViewMetric key={index} title={item.title} metric={item.metric} Icon={item.icon}
							                       classes={classes}/>
						})
					}
				</Layout>
				<Layout>
					<MetricDataCard title="Top Vet Centers"
					                classes={classes}
					                MetricCardIcon={HospitalBuildingIcon}
					                data={this.state.vetCenters}
					/>
					<MetricDataCard title="Top Vaccines"
					                classes={classes}
					                MetricCardIcon={PillIcon}
					                data={this.state.vaccines}/>
					<MetricDataCard title="Top States"
					                classes={classes}
					                MetricCardIcon={MapIcon}
					                data={this.state.states}/>
				</Layout>
				<Layout>
					<MetricDataCard title="Recent Vaccinations" classes={classes} MetricCardIcon={MedicalBagIcon}
					                data={this.state.vaccinations}/>
				</Layout>
			</div>
		</div>;
	}
});

export default connect(store => store)(Index);