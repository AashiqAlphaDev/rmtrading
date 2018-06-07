import React from "react";
import {connect} from "react-redux";
import withRoot from "../../../src/withRoot";
import {
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@material-ui/core";
import style from "../style"
import InventoryTmpl from "./inventory-tmpl"


const Index = withRoot(style)(class extends React.Component {
	render() {
		const {classes} = this.props;
		return <InventoryTmpl>
			<div>
				<Typography variant="title" className={`${classes.title} flex`}>
					Search Results
				</Typography>
			</div>
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Order ID</TableCell>
							<TableCell>Items</TableCell>
							<TableCell>Vaccination Center</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => {
                                return <TableRow key={index}>
									<TableCell>Date</TableCell>
									<TableCell>Order ID</TableCell>
									<TableCell>Items</TableCell>
									<TableCell>Vaccination Center</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>

                            })
                        }
					</TableBody>
				</Table>
			</Paper>
		</InventoryTmpl>
	}
})

export default connect(store => store)(Index)