import React from "react"
import Layout from "../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../routes"
import {AppBar, Toolbar, Typography,TextField,Tabs,Tab,Card,
    CardMedia,
    CardContent,
    Divider,Avatar,CardActions,Chip,
    Button} from "@material-ui/core/index";
import {
    ChatIconPlain, CollectionSelected, CollectionUnSelected, EverythingSelected, EverythingUnselected, GroupIconPlain,
    HomeIconPlain,
    LibraryIconPlain,
    LinkSelected, LinkUnselected,
    MenuItemSample,
    NotificationIconPlain, PeopleSelected, PeopleUnSelected, TopicSelected, TopicUnselected,

} from "../../components/icons";
import LoopContainer from "../../components/top-bar/index";
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

     handleClick = ()=> {
        window.alert('You clicked the Chip.');
    }


    state = {selectedTopFilter:"Everything"};


    render() {
        const {classes} = this.props;
        return <LoopContainer>


            <Layout direction={"column"} className={classes.body}>

                <Layout>
                    <Layout>
                        <Card style={{width:240}}>
                            <Layout className={classes.filterTitleContainer}>
                                <Typography variant={"headline"} className={classes.filterTitle}>
                                    Filters
                                </Typography>
                            </Layout>
                            <Layout direction={"column"}>


                            <div onClick={()=>{
                                this.setState({selectedTopFilter: "Everything"});
                            }}>
                                <Layout className={(this.state.selectedTopFilter !="Everything")?classes.unselectedFilter:classes.selectedFilter}>
                                    {
                                        (this.state.selectedTopFilter !="Everything") &&
                                        <EverythingUnselected size={25}/>
                                    }
                                    {
                                        (this.state.selectedTopFilter =="Everything")  &&
                                        <EverythingSelected size={25}/>
                                    }


                                    <Typography variant={"title"} className={(this.state.selectedTopFilter != "Everything")?classes.unselectedText:classes.selectedText}>
                                        Everything
                                    </Typography>

                                </Layout>
                            </div>




                            <div onClick={()=>{
                                this.setState({selectedTopFilter: "People"});
                            }}>
                                <Layout className={(this.state.selectedTopFilter !="People")?classes.unselectedFilter:classes.selectedFilter}>
                                    {
                                        (this.state.selectedTopFilter !="People") &&
                                        <PeopleUnSelected size={25}/>
                                    }
                                    {
                                        (this.state.selectedTopFilter =="People")  &&
                                        <PeopleSelected size={25}/>
                                    }


                                    <Typography variant={"title"} className={(this.state.selectedTopFilter != "People")?classes.unselectedText:classes.selectedText}>
                                        People
                                    </Typography>

                                </Layout>
                            </div>
                            <div onClick={()=>{
                                 this.setState({selectedTopFilter:"Topic"});
                            }}>
                                <Layout className={(this.state.selectedTopFilter != "Topic")?classes.unselectedFilter:classes.selectedFilter}>

                                    {
                                        this.state.selectedTopFilter != "Topic" &&
                                        <TopicUnselected size={25}/>
                                    }
                                    {
                                        this.state.selectedTopFilter == "Topic" &&
                                        <TopicSelected size={25}/>
                                    }


                                    <Typography variant={"title"} className={(this.state.selectedTopFilter !="Topic")?classes.unselectedText:classes.selectedText}>
                                        Topic
                                    </Typography>
                                </Layout>
                            </div>
                            <div onClick={()=>{
                                this.setState({selectedTopFilter:"Collections"})
                            }}>
                                <Layout className={(this.state.selectedTopFilter != "Collections")?classes.unselectedFilter:classes.selectedFilter}>
                                    {
                                        this.state.selectedTopFilter != "Collections" &&
                                        <CollectionUnSelected size={25}/>
                                    }
                                    {
                                        this.state.selectedTopFilter == "Collections" &&
                                        <CollectionSelected size={25}/>
                                    }
                                    <Typography variant={"title"} className={(this.state.selectedTopFilter != "Collections")?classes.unselectedText:classes.selectedText}>
                                        Collections
                                    </Typography>
                                </Layout>
                            </div>
                            <div onClick={()=>{
                                this.setState({selectedTopFilter:"Links"})
                            }}>
                                <Layout className={(this.state.selectedTopFilter != "Links")?classes.unselectedFilter:classes.selectedFilter}>

                                    {
                                        this.state.selectedTopFilter !="Links" &&
                                        <LinkUnselected size={25}/>
                                    }
                                    {
                                        this.state.selectedTopFilter == "Links" &&
                                        <LinkSelected size={25}/>
                                    }

                                    <Typography variant={"title"} className={(this.state.selectedTopFilter != "Links")?classes.unselectedText:classes.selectedText}>
                                        Links
                                    </Typography>
                                </Layout>
                            </div>
                            </Layout>
                            {
                                (this.state.selectedTopFilter =="Links" || this.state.selectedTopFilter =="Collections") &&
                                    <Layout >
                                        <Divider/>

                                        <Layout direction={"column"} className={classes.secondaryFilterContainer}>
                                            <Layout className={classes.filterTitleContainer} >
                                                <Typography variant={"subheading"} className={classes.filterTitle}>
                                                    Filter Results
                                                </Typography>
                                            </Layout>
                                            <Typography variant={"body1"} className={classes.secondaryFilterText}>
                                                Added Any Time
                                            </Typography>
                                            <Typography variant={"body1"} className={classes.secondaryFilterText}>
                                                Any Type
                                            </Typography>
                                            <Typography variant={"body1"} className={classes.secondaryFilterText}>
                                                Most Viewed
                                            </Typography>

                                        </Layout>

                                    </Layout>
                            }
                            {
                                this.state.selectedTopFilter =="Links" &&
                                <Layout >
                                    <Divider/>

                                    <Layout direction={"column"} className={classes.secondaryFilterContainer}>
                                        <Layout className={classes.filterTitleContainer} >
                                            <Typography variant={"subheading"} className={classes.filterTitle}>
                                                Search By Tag
                                            </Typography>
                                        </Layout>
                                        <Layout direction={"column"}>
                                            <Chip
                                                avatar={<Avatar src="https://scontent.fblr2-1.fna.fbcdn.net/v/t1.0-1/p480x480/13645265_10154396860566789_4855137813969521495_n.png?_nc_cat=0&oh=df2ab98fd33662bf4fcf1fe5893515f9&oe=5C384061" className={classes.smallAvatar}/>}
                                                label="Phyton"
                                                onClick={this.handleClick}
                                                className={classes.chip}
                                            />
                                            <Chip
                                                avatar={<Avatar src="https://pluralsight.imgix.net/paths/path-icons/javascript-36f5949a45.png?w=70" className={classes.smallAvatar}/>}
                                                label="Javascript"
                                                onClick={this.handleClick}
                                                className={classes.chip}
                                            />
                                            <Chip
                                                avatar={<Avatar src="https://www.softexia.com/wp-content/uploads/2017/04/Java-logo.png" className={classes.smallAvatar}/>}
                                                label="Java"
                                                onClick={this.handleClick}
                                                className={classes.chip}
                                            />
                                        </Layout>

                                    </Layout>

                                </Layout>
                            }



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
        chip: {
            margin: theme.spacing.unit,
        },
        secondaryFilterContainer:{
            padding:theme.spacing.unit
        },
        secondaryFilterText:{
          marginLeft:theme.spacing.unit,
            marginBottom:theme.spacing.unit
        },


        filterTitleContainer:{
            marginBottom:theme.spacing.unit
        },
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
        },
        smallAvatar:{
            height:20,
            width:20
        }

    }

})(connect(store => store)(_Index))
export default Index;