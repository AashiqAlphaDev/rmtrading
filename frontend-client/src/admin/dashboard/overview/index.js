import React from "react"
import Layout from "../../../components/layout";
import {withStyles} from "@material-ui/core/styles"
import style from "../style";
import {connect} from "react-redux"
import {
	Avatar,
	Divider,
	Paper,
	Table,
	TableBody, TableCell, TableHead,
	TableRow,
	Typography
} from "@material-ui/core/es/index";
import {HospitalIcon,AccountBoxIcon} from "mdi-react"

const OverViewMetric = ({title,metric, classes})=>(
	<Paper className={classes.card}>
		<Layout>
			<Avatar className={classes.cardIcon}>
				<HospitalIcon className={classes.cardIconSvg} />
			</Avatar>
			<Layout direction={"column"} className={classes.cardInfo}>
				<Typography color={"textSecondary"}>{title}</Typography>
				<Typography variant={"title"}>{metric}</Typography>
			</Layout>
		</Layout>
	</Paper>
);

let Index = withStyles((theme)=>{
    return {
        ...style(theme),
        body:{
            overflow:"scroll"
        },
        content:{
            marginTop:theme.spacing.unit*2,
        },
        listCard:{
            flex:1,
            minWidth:200,
            margin:theme.spacing.unit*1,
	        boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
        },
        listTitle:{
            padding:theme.spacing.unit*2
        },
        card:{
            flex:1,
            margin:theme.spacing.unit*1,
            padding:theme.spacing.unit*2,
	        boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
        },
        cardInfo:{
            marginLeft:theme.spacing.unit*2,
        },
	    cardIcon:{
        	border:`2px solid ${theme.palette.grey['200']}`,
		    background:"none",
	    },
	    cardIconSvg:{
        	fill:theme.palette.secondary.main
	    },
	    titleIconSvg:{
		    paddingRight:1*theme.spacing.unit,
		    fill:theme.palette.secondary.main
	    }
    }
})(class extends React.Component {

	state = {
		metrics:[
			{title:"Vaccinations", metric:"30,000"},
			{title:"Visits", metric:"30,000"},
			{title:"Pets", metric:"30,000"},
			{title:"Vaccines", metric:"30,000"},
			{title:"Diseases", metric:"30,000"},
			{title:"Vet Centers", metric:"30,000"},
		]
	}

    componentWillMount(){
        if(this.props.onPageChange){
            this.props.onPageChange("/admin/dashboard");
        }
    }

    render(){
        const {classes} = this.props;
	    return <div direction={"column"} flex={1} className={`${classes.body}`}>
		    <div className={`container ${classes.content}`}>
			    <Layout>
				    {
				    	this.state.metrics.map((item, index)=>{
						    return <OverViewMetric key={index} title={item.title} metric={item.metric} classes={classes}/>
					    })
				    }

			    </Layout>
			    <Layout>
				    <Paper className={classes.listCard}>
					    <Layout direction={"column"}>
						    <Typography className={classes.listTitle} gutterBottom variant={"title"}>
							    <Layout alignItems={"center"}>
								    <HospitalIcon className={classes.titleIconSvg}/>
								    Top States
							    </Layout>
						    </Typography>
						    <Divider/>
						    <Table>
							    <TableHead>
								    <TableRow>
									    <TableCell>Name</TableCell>
									    <TableCell numeric>Count</TableCell>
								    </TableRow>
							    </TableHead>
							    <TableBody>
								    {
									    [1, 2, 3, 4, 5, 6].map((i) => {
										    return <TableRow key={i}>
											    <TableCell>Sample {i}</TableCell>
											    <TableCell numeric>100</TableCell>
										    </TableRow>
									    })
								    }
							    </TableBody>
						    </Table>
					    </Layout>
				    </Paper>
				    <Paper className={classes.listCard}>
					    <Layout direction={"column"}>
						    <Typography className={classes.listTitle} gutterBottom variant={"title"}>Top Vet
							    Centers</Typography>
						    <Divider/>
						    <Table>
							    <TableHead>
								    <TableRow>
									    <TableCell>Name</TableCell>
									    <TableCell numeric>Count</TableCell>
								    </TableRow>
							    </TableHead>
							    <TableBody>
								    {
									    [1, 2, 3, 4, 5, 6].map((i) => {
										    return <TableRow key={i}>
											    <TableCell>Sample {i}</TableCell>
											    <TableCell numeric>100</TableCell>
										    </TableRow>
									    })
								    }
							    </TableBody>
						    </Table>
					    </Layout>
				    </Paper>
				    <Paper className={classes.listCard}>
					    <Layout direction={"column"}>
						    <Typography className={classes.listTitle} gutterBottom variant={"title"}>Top
							    Vaccines</Typography>
						    <Divider/>
						    <Table>
							    <TableHead>
								    <TableRow>
									    <TableCell>Name</TableCell>
									    <TableCell numeric>Count</TableCell>
								    </TableRow>
							    </TableHead>
							    <TableBody>
								    {
									    [1, 2, 3, 4, 5, 6].map((i) => {
										    return <TableRow key={i}>
											    <TableCell>Sample {i}</TableCell>
											    <TableCell numeric>100</TableCell>
										    </TableRow>
									    })
								    }
							    </TableBody>
						    </Table>
					    </Layout>
				    </Paper>
			    </Layout>
			    <Layout>
				    <Paper className={classes.listCard}>
					    <Layout direction={"column"}>
						    <Typography className={classes.listTitle} gutterBottom variant={"title"}>Recent
							    Vaccinations</Typography>
						    <Divider/>
						    <Table>
							    <TableHead>
								    <TableRow>
									    <TableCell>Name</TableCell>
									    <TableCell numeric>Count</TableCell>
								    </TableRow>
							    </TableHead>
							    <TableBody>
								    {
									    [1, 2, 3, 4, 5, 6].map((i) => {
										    return <TableRow key={i}>
											    <TableCell>Sample {i}</TableCell>
											    <TableCell numeric>100</TableCell>
										    </TableRow>
									    })
								    }
							    </TableBody>
						    </Table>
					    </Layout>
				    </Paper>
			    </Layout>
		    </div>
	    </div>;
    }
});

export default connect(store=>store)(Index);