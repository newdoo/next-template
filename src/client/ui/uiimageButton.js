import { Link } from 'src/routes'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fade from '@material-ui/core/Grow'

const styles = theme => ({
  link: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none'
    }
  },
});

const UIImageButton = props => {
  const img = src => src === undefined ? props.children : <img src={src} alt={src}/>
  const button = () => <Fade in={true}><ButtonBase onClick={props.onClick}>{img(props.src)}</ButtonBase></Fade>
  const render = link => link === undefined ? button() : <Link route={link} passHref>{button()}</Link>

  return (
    <div>
      {render(props.link)}
    </div>
  )    
}
  
export default withStyles(styles)(UIImageButton);
