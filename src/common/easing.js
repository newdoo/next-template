const easeInSine = (t, b, c, d) => {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

const easeOutSine = (t, b, c, d) => {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
};

const easeInCirc = (t, b, c, d) => {
    t /= d;
    return -c * (Math.sqrt(1 - t*t) - 1) + b;
};

const easeInCubic = (t, b, c, d) => {
    t /= d;
    return c*t*t*t + b;
};

const easeOutCirc = (t, b, c, d) => {
    t /= d;
    t--;
    return c * Math.sqrt(1 - t*t) + b;
};

const easeInQuad = (t, b, c, d) => {
    t /= d;
    return c*t*t + b;
};

const linearTween = (t, b, c, d) => {
    return c*t/d + b;
};

const linearTween2 = (t, b, c, d) => {
    return c*(t*0.7)/d + b;
};

const lerp = (v0, v1, t) => {
  return v0 + t * (v1 - v0);
}

module.exports = { easeInSine, easeOutSine, easeInCirc, easeInCubic, easeOutCirc, easeInQuad, linearTween, linearTween2, lerp }
