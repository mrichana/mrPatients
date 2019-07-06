const webpack = require('webpack');
module.exports = {
  plugins: [
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /el/),
  ]
}
