import styled from 'styled-components'

const Diamond = styled.div`
	width: 0;
	height: 0;
	border: 50px solid transparent;
	border-bottom-color: ${props => props.color === undefined ? 'red' : props.color};
	position: relative;
	top: -50px;
  
  &:after {
    content: '';
    position: absolute;
    left: -50px;
    top: 50px;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top-color: ${props => props.color === undefined ? 'red' : props.color};
  }
`

export default props => <Diamond {...props}/> 