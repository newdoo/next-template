import React from 'react'
import { Link } from 'src/routes'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: 1
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginRight: -10,
  },
};

const Header = props => {
  const {classes} = props;

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>         
          <Typography variant="title" color="textSecondary" className={classes.flex}>
            Title
          </Typography>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>   
        </Toolbar>
      </AppBar>
      <Link route='home' passHref>
        <a>Home</a>
      </Link>
      <Link route='about' passHref>
        <a>About</a>
      </Link>
      <Link route='blog' passHref>
        <a>Blog</a>
      </Link>
    </header>
  )
}

export default withStyles(styles)(Header);
