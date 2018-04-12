const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-0']
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // { test: /.(jpg|png|svg)$/, 
      //   loader: 'url-loader', 
      //   options: { limit: 25000, }, 
      // }, 
      // { test: /.(jpg|png|svg)$/, 
      //   loader: 'file-loader', 
      //   options: { 
      //     name: '../../[path][name].[ext]', 
      //   }, 
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};