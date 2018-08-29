import React from "react"
import Layout from "../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../routes"
import {AppBar, Toolbar, Typography,TextField,Tabs,Tab,Card,
    CardMedia,
    CardContent,
    Divider,Avatar,CardActions,
    Button} from "@material-ui/core/index";
import {
    ChatIconPlain, CollectionSelected, CollectionUnSelected, GroupIconPlain, HomeIconPlain, LibraryIconPlain,
    LinkSelected, LinkUnselected,
    MenuItemSample,
    NotificationIconPlain, PeopleSelected, PeopleUnSelected, TopicSelected, TopicUnselected,

} from "../components/icons";
import LoopContainer from "../components/top-bar/index";
import _ from "underscore";

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


    state = {selectedFilters:[]};


    render() {
        const {classes} = this.props;
        return <LoopContainer>


            <Layout direction={"column"} className={classes.body}>

            <Layout>
                <Layout>
                    <Card style={{width:240}}>
                        <Layout>
                            <Typography variant={"headline"} className={classes.filterTitle}>
                            Filters
                            </Typography>
                        </Layout>
                        <div onClick={()=>{
                            var currentFilters = this.state.selectedFilters
                            if(this.state.selectedFilters.indexOf("People")==-1){
                                currentFilters.push("People")
                            }
                            else{
                                currentFilters = _.reject(currentFilters,function(item){
                                    return item =="People"
                                })
                            }
                            this.setState({selectedFilters:currentFilters})

                        }}>
                        <Layout className={(this.state.selectedFilters.indexOf("People")==-1)?classes.unselectedFilter:classes.selectedFilter}>
                            {
                                this.state.selectedFilters.indexOf("People") == -1 &&
                            <PeopleUnSelected size={25}/>
                            }
                            {
                                this.state.selectedFilters.indexOf("People") != -1 &&
                                <PeopleSelected size={25}/>
                            }


                            <Typography variant={"title"} className={(this.state.selectedFilters.indexOf("People")==-1)?classes.unselectedText:classes.selectedText}>
                                People
                            </Typography>

                        </Layout>
                        </div>
                        <div onClick={()=>{
                            var currentFilters = this.state.selectedFilters
                            if(this.state.selectedFilters.indexOf("Topic")==-1){
                                currentFilters.push("Topic")
                            }
                            else{
                                currentFilters = _.reject(currentFilters,function(item){
                                    return item =="Topic"
                                })
                            }
                            this.setState({selectedFilters:currentFilters})

                        }}>
                        <Layout className={(this.state.selectedFilters.indexOf("Topic")==-1)?classes.unselectedFilter:classes.selectedFilter}>

                            {
                                this.state.selectedFilters.indexOf("Topic") == -1 &&
                                <TopicUnselected size={25}/>
                            }
                            {
                                this.state.selectedFilters.indexOf("Topic") != -1 &&
                                <TopicSelected size={25}/>
                            }


                            <Typography variant={"title"} className={(this.state.selectedFilters.indexOf("Topic")==-1)?classes.unselectedText:classes.selectedText}>
                                Topic
                            </Typography>
                        </Layout>
                        </div>
                        <div onClick={()=>{
                            var currentFilters = this.state.selectedFilters
                            if(this.state.selectedFilters.indexOf("Collections")==-1){
                                currentFilters.push("Collections")
                            }
                            else{
                                currentFilters = _.reject(currentFilters,function(item){
                                    return item =="Collections"
                                })
                            }
                            this.setState({selectedFilters:currentFilters})

                        }}>
                        <Layout className={(this.state.selectedFilters.indexOf("Collections")==-1)?classes.unselectedFilter:classes.selectedFilter}>
                            {
                                this.state.selectedFilters.indexOf("Collections") == -1 &&
                                <CollectionUnSelected size={25}/>
                            }
                            {
                                this.state.selectedFilters.indexOf("Collections") != -1 &&
                                <CollectionSelected size={25}/>
                            }
                            <Typography variant={"title"} className={(this.state.selectedFilters.indexOf("Collections")==-1)?classes.unselectedText:classes.selectedText}>
                                Collections
                            </Typography>
                        </Layout>
                        </div>
                            <div onClick={()=>{
                                var currentFilters = this.state.selectedFilters
                                if(this.state.selectedFilters.indexOf("Links")==-1){
                                    currentFilters.push("Links")
                                }
                                else{
                                    currentFilters = _.reject(currentFilters,function(item){
                                        return item =="Links"
                                    })
                                }
                                this.setState({selectedFilters:currentFilters})

                            }}>
                        <Layout className={(this.state.selectedFilters.indexOf("Links")==-1)?classes.unselectedFilter:classes.selectedFilter}>

                            {
                                this.state.selectedFilters.indexOf("Links") == -1 &&
                                <LinkUnselected size={25}/>
                            }
                            {
                                this.state.selectedFilters.indexOf("Links") != -1 &&
                                <LinkSelected size={25}/>
                            }



                            <Typography variant={"title"} className={(this.state.selectedFilters.indexOf("Links")==-1)?classes.unselectedText:classes.selectedText}>
                                Links
                            </Typography>
                        </Layout>
                            </div>

                    </Card>
                </Layout>
            <Layout direction={"column"}>
                <Typography variant={"headline"} className={classes.filterTitle}>
                    Search Results
                </Typography>
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
                <Card className={classes.card}>
                    <Layout alignItems={"center"} justifyContent={"center"} direction={"column"} className={classes.topicPictureContainer}>
                    <MenuItemSample size={70}/>
                        <Typography variant={"headline"} className={classes.topicLabelContainer}>
                            Programming
                        </Typography>
                    </Layout>
                </Card>
                <Card className={classes.card}>
                    <Layout alignItems={"center"} justifyContent={"center"} direction={"column"} className={classes.topicPictureContainer}>
                        <Avatar
                            alt="Adelle Charles"
                            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                            className={classes.bigAvatar}
                        />
                        <Typography variant={"headline"} className={classes.topicLabelContainer}>
                            User Card
                        </Typography>
                    </Layout>
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="https://pluralsight.imgix.net/paths/python-7be70baaac.png  "
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            Phython
                        </Typography>
                        <Layout className={classes.descriptionLayout}>
                        <Typography component="p">
                            Learn Python at a beginners level here.

                        </Typography>
                        </Layout>

                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                    <Divider/>
                    <Layout className={classes.urlLayout}>
                        <Typography variant={"body2"} className={classes.urlText}>
                            10 Links
                        </Typography>
                    </Layout>
                </Card>
            </Layout>
            </Layout>
            </Layout>
        </Layout>
            </LoopContainer>
    }
};


const Index = withStyles((theme) => {
    return {
        descriptionLayout:{
          height:120
        },
        bigAvatar: {
            width: 60,
            height: 60,
        },
        topicPictureContainer:{
            height:400
        },
        topicLabelContainer:{
            paddingTop:theme.spacing.unit,
        },
        body:{
            padding:theme.spacing.unit*2,
            backgroundColor:"#F9F9FB",
            flex:1
        },
        logo:{
            marginRight:theme.spacing.unit*3
        },
        leftSectionToolBar:{
            flex:1
        },
        tabs:{
            padding:theme.spacing.unit,
            marginRight:theme.spacing.unit *3
        },
        loginLayout:{
            marginLeft:theme.spacing.unit *5

        },
        toolBarText:{
          color:"#ffffff"
        },
        card: {
            height:380,
            width:260,
            margin:theme.spacing.unit
        },
        media: {
            height:0,
            paddingTop: '56.25%',
        },
        urlLayout:{
            padding:theme.spacing.unit,

        },
        urlText:{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width:241,
            height: "1.4em",
            whiteSpace: "nowrap",
            color:"#bfbfbf"
        },
        flex:{
            flex:1
        },
        selectedFilter:{
            padding:theme.spacing.unit,
            paddingLeft:theme.spacing.unit*2,
            backgroundColor:"#063554"
        },
        unselectedFilter:{
            padding:theme.spacing.unit,
            paddingLeft:theme.spacing.unit*2,
        },
        selectedText:{
            marginLeft:theme.spacing.unit*2,
            color:"#fff"

        },
        unselectedText:{
            marginLeft:theme.spacing.unit*2,
        },
        filterTitle:{
            paddingTop:theme.spacing.unit,
            paddingLeft:theme.spacing.unit
        }

    }

})(connect(store => store)(_Index))
export default Index;