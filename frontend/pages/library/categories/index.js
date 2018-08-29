/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../../routes"
import LoopContainer from "../../../components/top-bar/index";
import {categoriesList} from "../../../api/api";
import {Typography,TextField,Card,CardMedia,CardContent,GridList,GridListTile,Divider} from "@material-ui/core/index";
import {MenuItemSample} from "../../../components/icons";


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
            <Layout className={classes.container} direction={"column"}>
                <Typography gutterBottom variant="headline"className={classes.pageTitle} component="h2">
                    Top Categories
                </Typography>
            <Layout>

                <GridList cols={6} cellHeight={300}>
                    {
                        this.props.categoriesList.docs.map((item) => {
                            return<GridListTile key={item} cols={1}>
                                <Layout >
                                    <Card className={classes.card}>
                                        <Layout className={classes.labelContainer}>
                                            <Layout className={classes.titleContainer}>
                                            <Typography gutterBottom variant="title" className={classes.cardTitle} component="h2">
                                                {item.title}
                                            </Typography>
                                            </Layout>
                                        </Layout>
                                    </Card>
                                </Layout>
                            </GridListTile>
                        })
                    }
                </GridList>

            </Layout>
            </Layout>
        </LoopContainer>
    }
};


const Index = withStyles((theme) => {
    return {
        container:{
            padding:theme.spacing.unit,
            backgroundColor:"#F9F9FB",
            flex:1,

        },
        card: {
            margin:theme.spacing.unit,
            flex:1,
            backgroundImage:"url('https://cdn1.iconfinder.com/data/icons/adobe-acrobat-pdf/154/pdf-file-rounded-square-512.png')",
            height:280,
            backgroundPosition: "center",

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
        },
        pageTitle:{
            paddingLeft:theme.spacing.unit
        },
        cardTitle:{
            padding:theme.spacing.unit,
            textAlign:"center",
            color:"#fff"
        },
        labelContainer:{
            height:"100%",
            justifyContent:"center",
            alignItems:"flex-end",
            flex:1,

        },
        titleContainer:{
            background: "rgba(0, 0, 0, 0.6  )",
            height:100          ,
            flex:1,
            padding:theme.spacing.unit,


        },

    }

})(connect(store => store)(_Index))
export default Index;