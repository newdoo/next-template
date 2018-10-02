import styled from 'styled-components'

const CurvedArrow = styled.div`
    position: relative;
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-right: 9px solid red;
    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
    -ms-transform: rotate(10deg);
    -o-transform: rotate(10deg);

  &:after {
    content: "";
    position: absolute;
    border: 0 solid transparent;
    border-top: 3px solid red;
    border-radius: 20px 0 0 0;
    top: -12px;
    left: -9px;
    width: 12px;
    height: 12px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
`

export default props => <CurvedArrow {...props}/> 