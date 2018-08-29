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
import {categoriesList} from "../../api/api";
import {Typography,TextField,Card,CardMedia,CardContent,GridList,GridListTile,Divider} from "@material-ui/core/index";
import {MenuItemSample} from "../../components/icons";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {


        let categorieslist = await categoriesList();
        return {categoriesList:categorieslist}

    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
        console.log(this.props.categoriesList);
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
            <Layout className={classes.container} >
                <Layout className={classes.sidebar} direction={"column"}>
                    <Typography variant={"subheading"} className={classes.menuItem}>
                        Categories
                    </Typography>
                    {
                        this.props.categoriesList.docs.map((item)=> {
                            return <Layout className={classes.menuItem} alignItems={"center"}>
                                <MenuItemSample size={32} />
                                <Typography variant={"caption"} className={classes.menuText}>
                                    {item.title}
                                </Typography>
                            </Layout>
                        })
                    }

                    <div onClick={()=>{
                        Router.pushRoute(`/home/categories`)
                    }}>

                    <Typography variant={"caption"} className={classes.menuText}>
                        View More +
                    </Typography>
                    </div>

                </Layout>
                <Layout className={classes.rightSection} direction={"column"}>

                    <Layout direction={"column"}>
                        <Typography variant={"title"} className={classes.pageTitle}>
                            Discover
                        </Typography>
                        <TextField placeholder="Search" className={classes.flex}/>
                    </Layout>
                    <Layout className={classes.list} direction={"row"}>
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
            margin:theme.spacing.unit*2
        },
        container:{
            backgroundColor:"#F9F9FB",
            flex:1
        },
        sidebar:{
            maxWidth:240,
            backgroundColor:"#fff",
            flexDirection:"column",
            flex:1,
            paddingTop:theme.spacing.unit
        },
        flex:{
            flex:1
        },
        menuItem:{
            height:40,
            paddingLeft:theme.spacing.unit*3,
            paddingRight:theme.spacing.unit*3
        },
        menuText:{
            paddingLeft:theme.spacing.unit*3,
            textOverflow: "ellipsis",
            overflow: "hidden",
            width:160,
            height: "1.4em",
            whiteSpace: "nowrap"
        },
        rightSection:{
            padding:theme.spacing.unit,
            flex:1
        },
        pageTitle:{
            paddingBottom:theme.spacing.unit
        },
        list:{
            overflow:"scroll",
            flex:1
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