import React from "react";
import configData from "../config.json";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Background from '../images/background-landing.jpg';
import EventForm from "../components/Event/EventForm";
import CategoriesList from "../components/CategoriesList";
import { withAlert } from 'react-alert'

const useStyles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    padding: theme.spacing(2, 4, 3)
  },
  bannerContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'bottom',
    height: '330px',
    color: '#fff'
  },
  bannerButtons: {
    marginTop: theme.spacing(4)
  },
  pageTitle: {
    letterSpacing: '40px',
    textTransform: 'uppercase',
    marginLeft: '44px',
    marginTop: theme.spacing(7)
  },
  createBtn: {
    fontSize: '22px',
    textTransform: 'none',
    borderRadius: '30px'
  },
  topTextDiv: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
  },
  topText: {
    textAlign: 'left',
    color: '#404040'
  },
  loading: {
      marginLeft: '20%',
      fontWeight: '600',
      fontSize: 'xx-large'
  }
});

//get the server URL where the db.json is running from config file
const url = configData.SERVER_URL; 

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: false,
            alldata: [],
            singledata: {
                label: "",
                description: "",
                location: "",
                date: "",
                categoryId: ""
            }
        };
        this.createList = this.createList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    //Handle the opening state for the create event modal window
    handleOpen = () => {
        this.setState({ open: true });
    };

    //Handle the close state for the create event modal window
    handleClose = () => {
        this.setState({ open: false });
        //Clears the inputs upon closure
        this.setState({
            singledata: {
                label: "",
                description: "",
                location: "",
                date: "",
                categoryId: ""
            }
        });
    };

    //Handle the input changes state for the create event modal window
    handleChange(event) {
        var label = this.state.singledata.label;
        var description = this.state.singledata.description;
        var location = this.state.singledata.location;
        var date = this.state.singledata.date;
        var categoryId = this.state.singledata.categoryId;

        switch(event.target.name) {
            case 'label':
                label = event.target.value;
                break;
            case 'description':
                description = event.target.value;
                break;
            case 'location':
                location = event.target.value;
                break;
            case 'date':
                date = event.target.value;
                break;
            default:
                categoryId = parseInt(event.target.value);
        }

        //Store the values from inputs
        this.setState({
            singledata: {
                label: label,
                description: description,
                location: location,
                date: date,
                categoryId: categoryId
            }
        });
    }

    //Get the list of all categories
    getCategories() {
        this.setState({ loading: true }, () => {
            fetch(url + "categories")
                .then(res => res.json())
                .then(result =>
                    this.setState({
                        loading: false,
                        alldata: result
                    })
                )
                .catch(console.log);
        });
    }

    //Handle the event creation
    createList() {
        if(this.state.singledata.label !== "" &&
            this.state.singledata.description !== "" &&
            this.state.singledata.location !== "" &&
            this.state.singledata.date !== "" &&
            this.state.singledata.categoryId !== "") {
                
            fetch(url + "events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.singledata)
            }).then(
                this.setState({
                    singledata: {
                        label: "",
                        description: "",
                        location: "",
                        date: "",
                        categoryId: ""
                    }
                })
            );
            //Close the modal after creating the event
            this.handleClose();
            setTimeout(function(){
                window.location.reload(); 
            }, 500);
        } else {
            this.props.alert.show('All fields are required!');
        }
    }

    render() {
        const { classes } = this.props;
        //Set the loading state so the categories only loads when is ready
        const categories = this.state.loading ? (
            <span className={classes.loading}>Loading...</span>
        ) : (
            <CategoriesList alldata={this.state.alldata} />
        );
        return (
            <React.Fragment>
                <main>
                    {/* Modal for creating an event */}
                    <Modal
                        aria-labelledby="event-form"
                        aria-describedby="event-creation-modal"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div style={getModalStyle()} className={classes.paper}>
                        <EventForm
                            alldata={this.state.alldata}
                            singledata={this.state.singledata}
                            createList={this.createList}
                            handleChange={this.handleChange}
                            handleClose={this.handleClose}
                        />
                        </div>
                    </Modal>
                    {/* Banner */}
                    <div className={classes.bannerContent}>
                        <Container maxWidth="sm">
                            <Typography className={classes.pageTitle} component="h1" variant="h2" align="center">
                                Events
                            </Typography>
                            <Typography variant="h5" align="center" paragraph>
                                Are you ready for your next adventure?
                            </Typography>
                            <div className={classes.bannerButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button className={classes.createBtn} variant="contained" size="large" color="primary" onClick={this.handleOpen}>
                                            Create a New Event Now!
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    {/* Dashboard */}
                    <div className={classes.topTextDiv}>
                        <Typography className={classes.topText} variant="h6" align="center" paragraph>
                            Looking for things to do? Whether you're a local, new in town or just cruising through we've got loads of great tips and events. 
                            You can explore by category... you got this. Ready?
                        </Typography>
                    </div>
                    {categories}
                </main>
            </React.Fragment>
        );
    }
}

export default withAlert()(withStyles(useStyles)(Dashboard));