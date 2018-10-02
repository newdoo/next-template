import anime from 'animejs'
import { LineChart, Line, XAxis, YAxis } from 'recharts'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  chart: {
    position: 'relative',
    width: 500
  },
  bust: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    align: 'left'
  }
});

class Chart extends React.Component {
  state = {data: [], bustValue: 1};

  componentDidMount = async() => {
    this.runBust(4000);
  }

  runBust = dest => {
    let bust = {value: 1}

    anime({
      targets: bust,
      value: dest,
      easing: 'easeInSine',//'easeInCirc',
      duration: 1000000,
      update: anim => {
        this.setState({data: this.state.data.concat({time: Number((anim.currentTime / 1000).toFixed(4)), uv: bust.value})});
        this.setState({bustValue: bust.value});
      }
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.menu}>
        <div className={classes.chart}>
          <LineChart width={500} height={300} data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis type='number' domain={[0, dataMax => Math.max(8, dataMax.toFixed(1))]} dataKey='time' minTickGap={90}/>
            <YAxis type='number' domain={[1, dataMax => Math.max(1, (dataMax * 1.1).toFixed(2))]}/>
            <Line type='monotone' dataKey='uv' stroke='#123123' isAnimationActive={false} dot={false}/>
          </LineChart>
          <Typography className={classes.bust} variant='display1'>{this.state.bustValue.toFixed(2)} X</Typography>
        </div>
      </div>
    )  
  }
}

Chart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chart);