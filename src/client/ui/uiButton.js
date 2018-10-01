import { Link } from '../../common/routes'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
  const { classes } = props;

  const borderRadius = () => { return {borderRadius: props.radius} }
  const text = children => children === undefined ? '' : children
  const button = () => <Button className={ classes.button } variant={ props.variant } color={ props.color } style={ borderRadius() } onClick={ props.onClick } data={ props.data }>{ text(props.children) }</Button>
  const render = link => link === undefined ? button() : <Link route={ link } passHref>{ button() }</Link>

  return (
    <div>
      { render(props.link) }
    </div>
  )    
}
  
export default withStyles(styles)(UIButton);
