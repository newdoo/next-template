import { Link } from 'src/routes'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Grow'

const styles = theme => ({
  link: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none'
    }
  },
  button: {
    margin: theme.spacing.unit,
  }
});

const UIButton = props => {
  const {classes} = props;

  const borderRadius = () => {return {borderRadius: props.radius}}
  const text = children => children === undefined ? '' : children
  const button = () => <Fade in={props.fade} style={props.fadeStyle}><Button className={classes.button} variant={props.variant} color={props.color} style={borderRadius()} onClick={props.onClick} data={props.data}>{text(props.children)}</Button></Fade>
  const render = link => link === undefined ? button() : <Link route={link} passHref>{button()}</Link>

  return (
    <div>
      {render(props.link)}
    </div>
  )    
}
  
export default withStyles(styles)(UIButton);
