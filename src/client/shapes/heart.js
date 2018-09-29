import styled from 'styled-components'

const Heart = styled.div`
  position: relative;
  width: 100px;
  height: 90px;

  &:before,
  &:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: ${props => props.color === undefined ? 'red' : props.color};
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
      -moz-transform-origin: 0 100%;
        -ms-transform-origin: 0 100%;
        -o-transform-origin: 0 100%;
            transform-origin: 0 100%;
  }
  &:after {
    left: 0;
    -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
            transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
      -moz-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
        -o-transform-origin: 100% 100%;
            transform-origin :100% 100%;
  }
`

export default props => <Heart {...props}/> 
