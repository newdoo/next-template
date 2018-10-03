import moment from 'moment'
const easing = require('@common/easing')

let interval = null;

export default (cur, dest, onUpdate) => {
  if(interval !== null) clearInterval(this.interval);

  const diffBalance = Math.abs(cur - dest);
  const sub = cur > dest;
  const time = moment().utc().valueOf();

  interval = setInterval(() => {
    const now = moment().utc();
    const diff = now.diff(moment(time));
    const value = Number((easing.easeInSine(diff, 0, diffBalance, 500)).toFixed(0));
    onUpdate(cur + (sub ? -value : value));

    if(diff > 500) {
      clearInterval(interval);
      interval = null;
      onUpdate(Number(dest));
    }
  }, 10);
}