import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles({
  root: {
    width: 500,
    backgroundColor: '#00d1b2',
  },
  div: {
    display: 'flex',
    justifyContent: 'space-around',
    // flexDirection: 'column',
    alignContent: 'flex-end',
    backgroundColor: '#00d1b2',
    marginTop: 'calc(5% + 60px)',
    bottom: 0,
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.div} >
      <BottomNavigation
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="2021" icon={<CopyrightIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default Footer;
