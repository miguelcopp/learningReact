import React from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    fontWeight: '600',
    color: '#333'
  },
  formTitle: {
    marginTop: '10px',
    marginBottom: '30px',
    fontSize: 'x-large',
    color: theme.palette.secondary.main,
    fontWeight: '600'
  }
}));

function EventForm(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.formTitle} variant="h6">
        New Event
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            fullWidth
            type="text"
            name="label"
            value={props.singledata.label}
            onChange={props.handleChange}
            variant="outlined"
          />
        </Grid> 
        <Grid item xs={12}>
          <TextField
            required
            label="Description"
            fullWidth
            type="text"
            name="description"
            value={props.singledata.description}
            onChange={props.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Location"
            fullWidth
            type="text"
            name="location"
            value={props.singledata.location}
            onChange={props.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="date"
            fullWidth
            name="date"
            value={props.singledata.date}
            onChange={props.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
            <Select
              native
              value={props.singledata.categoryId}
              onChange={props.handleChange}
              label="Category"
            >
              <option aria-label="None" value="" />
              {props.alldata.map((category) => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div className={classes.buttons}>        
        <Button 
          className={classes.button}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={props.createList}
          className={classes.button}
        >
          Create
        </Button>
      </div>
    </React.Fragment>
  );
}

export default EventForm;
