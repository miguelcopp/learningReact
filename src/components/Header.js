import React from "react";
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles  = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    }
}));

function Header() {
    const classes = useStyles();

    return(
        <AppBar position="relative">
          <Toolbar>
            <HomeIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Dashboard | Events Manager
            </Typography>
          </Toolbar>
        </AppBar>
    )
}

export default Header;