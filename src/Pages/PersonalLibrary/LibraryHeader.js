import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
    background: '#3d3bbf',
    color: "white",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    fontSize: 17
  },
}));


export default function Header() {
  const classes = useStyles();
  // const { sections, title } = props;

  const sections = [
    { title: '', url: '' },
    { title: 'RETURN TO HOME', url: '/' },
    { title: 'SEARCH PUBLIC LIBRARY', url: 'Search' },
    { title: '', url: '' },
  ];

  return (
    <React.Fragment>
      <Toolbar style={{width:1860}} className={classes.toolbar}>
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
         
        </Typography>
        <Button><AccountCircleIcon fontSize="large" ></AccountCircleIcon></Button>
      </Toolbar>
      <Toolbar style={{width:1900}} component="nav" variant="regular" color="primary" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
