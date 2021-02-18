import React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';

const useStyles  = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
}));

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Events
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

function Footer() {
    const classes = useStyles();

    return(
        <footer className={classes.footer}>
            <div align="center">
                <FacebookIcon className={classes.icon} />
                <InstagramIcon className={classes.icon} />
                <TwitterIcon className={classes.icon} />
            </div>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Terms of Use | Privacy Policy
            </Typography>
            <Copyright />
        </footer>
    )
}

export default Footer;