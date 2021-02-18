import React from 'react';
import configData from "../../config.json";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CalendarIcon from '@material-ui/icons/Event';
import LocationIcon from '@material-ui/icons/LocationOn';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    verticalAlign: 'middle'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardBottom: {
    marginBottom: '15px',
  },
  cardInline: {
    display: 'inline',
    verticalAlign: 'middle'
  },
  cardContent: {
    flexGrow: 1
  },
  cardLines: {
    color: 'rgba(0, 0, 0, 0.54);'
  },
  iconCard: {
    marginRight: '10px',
    fontSize: '22px !important'
  },
  subscribe: {
    marginLeft: '85%'
  },
  loading: {
    marginLeft: '20%',
    fontWeight: '600',
    fontSize: 'xx-large'
  }
});

//get the server URL where the db.json is running from config file
const url = configData.SERVER_URL; 

class EventsList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        isChecked: false
      };
      this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    this.initLocalStorage();
    this.getEvents();
  }

  //Get the subscribed events id from localstorage
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('subscribed'))
  }

  //Update the localstorage with the suscribed events id
  setLocalStorage(subs) {
    localStorage.setItem('subscribed', JSON.stringify(subs));
  }

  //Handle the check and uncheck event from the subscribe Checkbox
  handleChange(e) {
    this.setState({
      isChecked: !this.state.isChecked
    });

    var eventId = parseInt(e.target.value);
    var subs = this.getLocalStorage();
    
    //If the event exists in the subscribed list, then unsubscribe
    if(subs.includes(eventId)) {
      const index = subs.indexOf(eventId);

      if (index > -1) {
        subs.splice(index, 1)
      }
    } else { //If the event doesnt exists in the subscribed list, then subscribe
        subs.push(eventId) 
    }

    //Updates the localstorage
    this.setLocalStorage(subs);
  };

  //Initialize localstorage with an empty subscribed events list
  initLocalStorage() {
    if (this.getLocalStorage() == null)
      this.setLocalStorage([]);
  }

  //Get the subscribed events id from localstorage to set the check status for each event
  isSubscribed(eventId) {
    if (this.getLocalStorage().indexOf(eventId) > -1) {
      return true;
    }

    return false;
  }

  //Get all the events filtered by category and sorted by date
  getEvents() {
    this.setState({ loading: true }, () => {
      fetch(url + "events")
      .then(res => res.json())
      .then(result =>
          this.setState({
          loading: false,
          alldata: result
                      .filter(events => events.categoryId === this.props.categoryId)
                      .sort((a, b) => new Date(a.date) -  new Date(b.date))
          })
      )
      .catch(console.log);
    });
  }

  render() {
    const { classes } = this.props;
    
    return(
      //Display the events after loading
      this.state.loading ? (
          <span className={classes.loading}>Loading...</span>
      ) : (
          <Grid container spacing={4}>
          {this.state.alldata.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" component="h2" className={classes.cardBottom}>
                    {event.label}
                  </Typography>
                  <Typography color="textSecondary" className={`${classes.cardLines} ${classes.cardBottom}`}>
                    {event.description}
                  </Typography>
                  <div className={classes.cardLines}>
                    <LocationIcon className={classes.icon} />
                    <Typography color="textSecondary" className={`${classes.cardBottom} ${classes.cardInline}`}>
                      {event.location}
                    </Typography>
                  </div>
                  <div className={classes.cardLines}>
                    <CalendarIcon className={classes.icon} />
                    <Typography color="textSecondary" className={`${classes.cardBottom} ${classes.cardInline}`}>
                      {(new Date(event.date)).toLocaleDateString('en-US', {
                        weekday:'short', 
                        month:'long', 
                        day:'2-digit', 
                        year:'numeric'
                      })}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Checkbox value={event.id} checked={this.isSubscribed(event.id)} className={classes.subscribe} inputProps={{ 'aria-label': 'primary-checkbox' }} onChange={(e) => this.handleChange(e)}/>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )
    )
  }
}

export default withStyles(useStyles)(EventsList);