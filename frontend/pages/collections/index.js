/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../routes"
import LoopContainer from "../../components/top-bar/index";
import {Typography,Avatar,Card,GridList, GridListTile, CardMedia, CardContent, Divider} from "@material-ui/core/index";
import {ShareIcon} from "../../components/icons";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
    }


    state = {};


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.body}>
                <Layout direction={"column"} className={classes.flex} alignItems={"center"}>
                    <Layout className={classes.topCard} direction={"column"} alignItems={"center"}>
                    <Typography variant={"headline"} className={classes.titleSpacing}>
                        Nothin' But Yet
                    </Typography>
                    <Typography variant={"body1"} className={classes.titleSpacing}>
                        Technologies changing us and digital revolution
                    </Typography>
                        <Layout className={classes.titleSpacing}>
                        <Avatar
                            alt="Adelle Charles"
                            src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/08/shutterstock_277867241-796x796.jpg"
                            className={classes.bigAvatar}
                        />
                        </Layout>
                        <Layout className={classes.titleSpacing} direction={"column"} alignItems={"center"}>
                            <Typography variant={"caption"} >
                                Created by Loopsssssss
                            </Typography>
                            <Typography variant={"caption"} >
                                Updated May 15 ,2018
                            </Typography>
                        </Layout>
                        <Layout className={classes.shareIconLayout} alignItem={"center"}>
                            <ShareIcon size={15}/>
                            <Layout alignItems={"center"}>
                            <Typography variant={"caption"} className={classes.shareIconText}>
                                Share
                            </Typography>
                            </Layout>
                        </Layout>

                    </Layout>
                <Layout className={classes.paper} direction={"column"}>
                    <GridList cols={6} cellHeight={420}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13].map((item) => {
                                return<GridListTile key={item} cols={1}>
                                    <Layout>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.media}
                                                image="http://techdew.in/wp-content/uploads/2014/01/6d.jpg  "
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="headline" component="h2">
                                                    Ux 6D Process
                                                </Typography>
                                                <Typography component="p">
                                                    However, the UX process itself is very flexible, depends on different situations and different product teams will have different
                                                    ways of implementing their process.

                                                </Typography>

                                            </CardContent>
                                            <Divider/>
                                            <Layout className={classes.urlLayout}>
                                                <Typography variant={"body2"} className={classes.urlText}>
                                                    http://techdew.in/2014/01/ux-6d-process-2/
                                                </Typography>
                                            </Layout>
                                        </Card>
                                    </Layout>
                                </GridListTile>
                            })
                        }
                    </GridList>
                </Layout>
                </Layout>
            </Layout>

        </LoopContainer>
    }
};


const Index = withStyles((theme) => {
    return {
        body:{
            overflow:"scroll",
            padding:theme.spacing.unit*2,
            backgroundColor:"#F9F9FB",
            flex:1
        },
        flex:{
            flex:1
        },
        titleSpacing:{
            marginTop:theme.spacing.unit*2
        },
        topCard:{
            padding:theme.spacing.unit*2
        },
        bigAvatar: {
            width: 100,
            height: 100,
        },
        shareIconLayout:{
            backgroundColor:"#fff",
            marginTop:theme.spacing.unit*2,
            padding:theme.spacing.unit
        },
        shareIconText:{
            marginLeft:theme.spacing.unit,
            borderRadius:5
        },
        paper:{
            backgroundColor:"#fff",
            padding:theme.spacing.unit,
            margin:theme.spacing.unit,
            flex:1,
            width:"100%",
            height:"100%"
        },
        card: {
            margin:theme.spacing.unit
        },
        media: {
            height:0,
            paddingTop: '56.25%',
        },
        urlLayout:{
            padding:theme.spacing.unit
        },
        urlText:{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width:241,
            height: "1.4em",
            whiteSpace: "nowrap",
            color:"#bfbfbf"
        }



    }

})(connect(store => store)(_Index))
export default Index;