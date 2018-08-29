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
import {Typography,Avatar,Card,GridList, GridListTile, CardMedia, CardContent, Divider,Paper,
    Tabs,
    Tab} from "@material-ui/core/index";
import {PlusIcon, ShareIcon} from "../../components/icons";


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

    handleChange = (event, value) => {
        this.setState({ value });
    };

    state = {value: 0,};


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.userContainer}>
                <Avatar
                    alt="Adelle Charles"
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                    className={classes.bigAvatar}
                />
                <Layout direction={"column"} className={classes.infoLayout}>
                    <Layout className={classes.userInfo} alignItems={"center"}>
                        <Typography variant={"headline"} className={classes.userInfoText}>
                            Kate
                        </Typography>
                    </Layout>
                    <Layout className={classes.userInfo} alignItems={"center"}>
                        <Typography variant={"body1"} className={classes.userInfoText}>
                            Kodchakon
                        </Typography>
                    </Layout>
                    <Layout className={classes.userInfo} alignItems={"center"}>
                        <Typography variant={"body1"} className={classes.userInfoText}>
                            Bangalore,India
                        </Typography>
                    </Layout>
                </Layout>

            </Layout>


            <Layout className={classes.body}>
                <Layout direction={"column"} className={classes.flex} >
                    <Paper className={classes.root}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Timeline" />
                            <Tab label="Library" />
                            <Tab label="Connections" />
                        </Tabs>
                        {this.state.value==0&& <Layout className={classes.tabLayout} direction={"column"}>Timeline</Layout>}
                        {this.state.value==1&& <Layout className={classes.tabLayout} direction={"column"}>
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

                        </Layout>}
                        {this.state.value==2&& <Layout className={classes.tabLayout} direction={"column"}>
                            <GridList cols={8} cellHeight={350}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13].map((item) => {
                                        return<GridListTile key={item} cols={1}>
                                            <Layout>
                                                <Card className={classes.card}>
                                                    <Layout alignItems={"center"}  direction={"column"} className={classes.topicPictureContainer}>
                                                        <Layout className={classes.avatarLayout}>
                                                        <Avatar
                                                            alt="Adelle Charles"
                                                            src="https://i.pinimg.com/236x/d3/38/a8/d338a83a27fe3b09d2b9efac0b3a891d.jpg"
                                                            className={classes.avatar}
                                                        />
                                                        </Layout>
                                                        <Typography variant={"title"} className={classes.topicLabelContainer}>
                                                            Chu
                                                        </Typography>
                                                        <CardContent>
                                                        <Typography   variant={"caption"} component="p" className={classes.topicLabelContainer}>
                                                            #Adobe, #Photoshop, #Music, #Instrumentals, #Riding, #Dancing, #Reading, #Python, #Clothing, #Science, #Politics
                                                        </Typography>
                                                        </CardContent>

                                                    </Layout>
                                                    <Layout alignItem={"center"} className={classes.userCardFooterLayout}>
                                                        <PlusIcon size={15}/>
                                                        <Typography variant={"body1"} className={classes.userCardFooterText}>
                                                            Follow
                                                        </Typography>
                                                    </Layout>
                                                </Card>
                                            </Layout>
                                        </GridListTile>
                                    })
                                }
                            </GridList>

                        </Layout>}

                    </Paper>

            </Layout>
            </Layout>

        </LoopContainer>

    }
};


const Index = withStyles((theme) => {
    return {
        userCardFooterLayout:{
            marginLeft:theme.spacing.unit*1,
            paddingBottom:theme.spacing.unit*1
        },
        userCardFooterText:{
            marginLeft:theme.spacing.unit*1
        },
        avatarLayout:{
            marginTop:theme.spacing.unit*2
        },
        topicLabelContainer:{
            paddingTop:theme.spacing.unit,
        },
        topicPictureContainer:{
            height:310
        },
        userInfo:{

            margin:theme.spacing.unit,
            height:32
        },
        tabLayout:{
            flex:1,
            display:"flex",
            padding:theme.spacing.unit*2
        },
        userInfoText:{

            padding:theme.spacing.unit
        },
        userContainer:{
            backgroundColor:"#fff",
            padding:theme.spacing.unit*2
        },
        infoLayout:{
          marginLeft:theme.spacing.unit,
            marginTop:theme.spacing.unit

        },
        body:{
            padding:theme.spacing.unit*2,
            backgroundColor:"#F9F9FB",
            flex:1,

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
            width: 150,
            height: 150,
        },
        avatar: {
            width: 75,
            height: 75,
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
            height:"100%",
            overflow:"scroll"


        },
        card: {
            margin:theme.spacing.unit,
            width:300
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