const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'development',
	
	entry: {
    index: [
      path.resolve(__dirname, 'src', 'css', 'app.css'),
    ]
	},

	output: {
    path: path.resolve(__dirname, 'public'),
  },

	target: 'electron-renderer',

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}
