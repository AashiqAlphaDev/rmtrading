import React from "react";
import {
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Typography,
    Button,
    CardActions,
    CardMedia,
    Chip,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Divider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    GridList,
    GridListTile,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Slide,
    CircularProgress,
    Checkbox,
    Switch,
    Select,
    Tabs,
    Tab,
    TextField
} from "@material-ui/core";
import AppLayout from "../layouts/app-layout";
import withRoot from "../src/withRoot";


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

export default withRoot((theme) => (
    {
        button: {
            margin: 10
        },
        card: {
            //margin: 10,
            width: 275,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        cover: {
            width: 151,
            height: 151,
        },
        play_card: {
            margin: 10,
            display: "flex",
            width: 300
        },
        chip: {
            margin: theme.spacing.unit,
        },
        gridList: {
            margin: 10,
            height: 300
        },
        root: {
            display: 'none',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },

        list: {
            margin: 10,
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        progress: {
            margin: theme.spacing.unit * 2,
        },
        input: {
            margin: theme.spacing.unit * 2,
        }
    }
))(class extends React.Component {
    state = {
        anchorEl: null,
        openD: false,
        checked: true,
        age: 10,
        selectedTab: 0
    };
    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;

        return <AppLayout>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Title
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
                <Button className={classes.button}>Default</Button>
                <Button color="primary" className={classes.button}>
                    Primary
                </Button>
                <Button color="secondary" className={classes.button}>
                    Secondary
                </Button>
                <Button disabled className={classes.button}>
                    Disabled
                </Button>
                <Button href="#flat-buttons" className={classes.button}>
                    Link
                </Button>

                <Button variant="outlined" className={classes.button}>
                    Default
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}>
                    Primary
                </Button>
                <Button variant="outlined" color="secondary" className={classes.button}>
                    Secondary
                </Button>
                <Button variant="outlined" disabled className={classes.button}>
                    Disabled
                </Button>
                <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
                    Link
                </Button>
                <Button variant="raised" className={classes.button}>
                    Default
                </Button>
                <Button variant="raised" color="primary" className={classes.button}>
                    Primary
                </Button>
                <Button variant="raised" color="secondary" className={classes.button}>
                    Secondary
                </Button>
                <Button variant="raised" color="secondary" disabled className={classes.button}>
                    Disabled
                </Button>
                <Button variant="raised" href="#raised-buttons" className={classes.button}>
                    Link
                </Button>
                <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                    +
                </Button>
                <Button size="small" className={classes.button}>
                    Small
                </Button>
                <Button size="medium" className={classes.button}>
                    Medium
                </Button>
                <Button size="large" className={classes.button}>
                    Large
                </Button>
                <Button variant="outlined" size="small" color="primary" className={classes.button}>
                    Small
                </Button>
                <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                    Medium
                </Button>
                <Button variant="outlined" size="large" color="primary" className={classes.button}>
                    Large
                </Button>
                <Button variant="raised" size="small" color="primary" className={classes.button}>
                    Small
                </Button>
                <Button variant="raised" size="medium" color="primary" className={classes.button}>
                    Medium
                </Button>
                <Button variant="raised" size="large" color="primary" className={classes.button}>
                    Large
                </Button>
                <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
                    +
                </Button>
                <Button variant="fab" color="secondary" aria-label="add" className={classes.button}>
                    +
                </Button>
            </div>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={3}>
                    <GridListTile cols={1}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary">
                                    Word of the Day
                                </Typography>
                                <Typography variant="headline" component="h2">
                                    belent
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography component="p">
                                    well meaning and kindly.<br/>
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                    <GridListTile cols={1}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image="/static/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    Lizard
                                </Typography>
                                <Typography component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                    ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                    <GridListTile cols={1}>
                        <Card className={classes.play_card}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography variant="headline">Live From Space</Typography>
                                    <Divider/>
                                    <Typography variant="subheading" color="textSecondary">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                                <div className={classes.controls}>

                                </div>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image="/static/live-from-space.jpg"
                                title="Live from space album cover"
                            />
                        </Card>
                    </GridListTile>
                </GridList>


            </div>

            <div>
                <Chip
                    label="Clickable Chip"
                    className={classes.chip}
                />
                <Chip
                    label="Clickable Chip"
                    className={classes.chip}
                />
                <Chip
                    label="Clickable Chip"
                    className={classes.chip}
                />
                <Chip
                    label="Clickable Chip"
                    className={classes.chip}
                />
                <Chip
                    label="Clickable Chip"
                    className={classes.chip}
                />
            </div>
            <div>
                <Button
                    onClick={() => {
                        this.setState({openD: true})
                    }}
                    className={classes.button}
                >
                    Open D
                </Button>
                <Dialog
                    open={this.state.openD}
                    onClose={() => {
                        this.setState({openD: false})
                    }}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary">
                            Disagree
                        </Button>
                        <Button color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Typography className={classes.heading}>Expansion Panel 1</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            <div>
                <List className={classes.list} subheader={<li/>}>
                    {[0, 1, 2, 3, 4].map(sectionId => (
                        <li key={`section-${sectionId}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                                {[0, 1, 2].map(item => (
                                    <ListItem key={`item-${sectionId}-${item}`}>
                                        <ListItemText primary={`Item ${item}`}/>
                                    </ListItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
            </div>
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.button}
                >
                    Open Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
            </div>
            <CircularProgress className={classes.progress}/>
            <Checkbox
                checked={this.state.checked}
                onChange={() => {
                    this.setState({checked: !this.state.checked})
                }}
            />
            <Switch
                checked={this.state.checked}
                onChange={() => {
                    this.setState({checked: !this.state.checked})
                }}
            />


            <Select
                value={this.state.age}
                onChange={this.handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Tabs value={this.state.selectedTab} onChange={(event, value) => {
                this.setState({selectedTab: value})
            }}>
                <Tab label="Item One"/>
                <Tab label="Item Two"/>
                <Tab label="Item Three" href="#basic-tabs"/>
            </Tabs>

            <TextField type="password" placeholder={"Sample"} label={"Sample"} className={classes.input}/>
            <TextField type="text" placeholder={"Sample"} className={classes.input}/>

        </AppLayout>

    }
})