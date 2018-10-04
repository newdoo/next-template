const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const paths = require('./paths')

module.exports = withCSS(withSass({
  distDir: "../../.next",
  sassLoaderOptions: {
    includePaths: [paths.globalStyles]
  },
  /*
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
  */
}))