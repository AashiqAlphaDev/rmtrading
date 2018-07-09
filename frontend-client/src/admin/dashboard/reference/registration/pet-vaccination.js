import React from "react"
import {withStyles} from "@material-ui/core/styles/index";
import style from "../style";
import {connect} from "react-redux";
import {REQUEST_PET_FETCH} from "../../../stores/pets/actions";
import {QUERY_VACCINATIONS} from "../../../stores/vaccinations/actions";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core/es/index";

let Index = withStyles((theme) => {
	return {
		...style(theme),
		body: {
			marginLeft: theme.spacing.unit * 2,
			display: "flex",
			flexDirection: "column"
		},
		title: {
			background: "#e6ecf0",
			width: "100%",
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 2,
		},

		segment: {
			marginBottom: theme.spacing.unit * 3,
			padding: theme.spacing.unit * 1
		}
	}
})(class extends React.Component {
	state = {
		pet_id: ""
	}

	componentWillMount() {
		this.props.dispatch({type: QUERY_VACCINATIONS, payload: {pet_id: this.props.match.params.pet_id}});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.petDetail._id) {

		}
	}

	render() {
		const {classes} = this.props;
		return <div className={classes.body}>
			<form onSubmit={(e) => {
				e.preventDefault();
				this.props.dispatch({type: REQUEST_PET_FETCH, payload: {pet_id: this.state.pet_id}});
			}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.props.vaccinations.list.map((item, i) => {
								return <TableRow key={item._id}>
									<TableCell>Dose {i}</TableCell>
									<TableCell>{item.status}</TableCell>
								</TableRow>
							})
						}
					</TableBody>
				</Table>
			</form>
		</div>;
	}
});

export default connect(store => store)(Index)