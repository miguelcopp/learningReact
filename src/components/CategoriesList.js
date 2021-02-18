import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SportIcon from '@material-ui/icons/SportsBaseball';
import WorkIcon from '@material-ui/icons/Work';
import LunchIcon from '@material-ui/icons/Fastfood';
import VoluntaryIcon from '@material-ui/icons/EmojiPeople';
import EventsList from "./Event/EventsList";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    display: 'inline-block',
    color: theme.palette.secondary.main,
    fontSize: '40px',
    verticalAlign: 'middle'
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  subtitle: {
    fontSize: '36px',
    color: theme.palette.secondary.main,
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}));


//Set an icon for each category label
function getCategoryIcon(categoryId, classes) {
  switch (categoryId) {
    case 0:
      return <WorkIcon className={classes.icon} />;
    case 1:
      return <SportIcon className={classes.icon} />;
    case 2:
      return <LunchIcon className={classes.icon} />
    case 3:
      return <VoluntaryIcon className={classes.icon} />
    default:
      return null;
  }
}

function CategoriesList(props) {
    const classes = useStyles();

    return(
      <Container className={classes.cardGrid} maxWidth="md">
          {props.alldata.map((category) => (
              <div key={category.id}>
                  <div> 
                    {getCategoryIcon(category.id, classes)}
                    <h2 className={classes.subtitle}>{category.label}</h2>
                  </div>                  
                  <Container className={classes.cardGrid} maxWidth="md">
                      <EventsList categoryId={category.id}/>
                  </Container>
              </div>
          ))}
      </Container>
    )
}

export default CategoriesList;