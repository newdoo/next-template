const dev = process.env.NODE_ENV !== 'production'

module.exports = req => {
  let ip;
  if (req.headers['x-forwarded-for'])
      ip = req.headers['x-forwarded-for'].split(",")[0];
  else if (req.connection && req.connection.remoteAddress)
      ip = req.connection.remoteAddress;
  else
      ip = req.ip;

  ip = (ip.length < 15 ? ip : (ip.substr(0, 7) === '::ffff:' ? ip.substr(7) : undefined));

  return dev === 'development' ? true : true;
}
