const withSass = require('@zeit/next-sass')
const paths = require('./paths')

module.exports = withSass({
  distDir: "../../.next",
  sassLoaderOptions: {
    includePaths: [paths.globalStyles]
  }
  
})