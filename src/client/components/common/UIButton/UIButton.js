import { Link } from '@common/routes'
import Button from '@material-ui/core/Button'
import styles from './UIButton.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const UIButton = props => {

  const borderRadius = () => { return {borderRadius: props.radius}}
  const text = children => children === undefined ? '' : children
  const button = () => 
    <Button
      className={cx('button','root', props.theme === undefined ? 'default':props.theme, props.disabled && 'disabled')} 
      variant={props.variant} 
      color={props.color} 
      style={borderRadius()} 
      onClick={props.disabled ? () => null : props.onClick}
      data={props.data}>
      {text(props.children)}
    </Button>
  const render = link => link === undefined ? button() : <Link route={link} passHref>{ button() }</Link>

  return (
    <div>
      { render(props.link) }
    </div>
  )    
}
  
export default UIButton;
