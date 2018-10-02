import React from 'react'
import { mobileCheck } from 'lib/device'

export default class Scene extends React.Component {
  state = {loading: false, isMobile: false};

  componentDidMount() {
    this.setState({isMobile: mobileCheck()});
    this.setState({loading: true});
  }
}