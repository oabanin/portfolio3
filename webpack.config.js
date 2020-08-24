const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {  
      application: './src/index.js',
      print: './src/print.js',
    },  
  mode: 'development',
  plugins: [
  	new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
    new HtmlWebpackPlugin({
    filename: 'about.html',
    template: './src/about.pug'
  })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), //ПАПКА куда кладет файл js
    filename: '[name].bundle.js' //имя СБОРКи
  },

  module: {
    rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader',
         ],
       },
       {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
  	      options: {
  	        name: '[name].[ext]',
  	      },
        },
      	{ 
        test: /\.pug$/,
        use: [
          {
          loader: 'pug-loader',
            options: {
              pretty: true
            }
          },
        ]
        },
      	{
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
        {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        },
     ],
   },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true //открыть браузер по окончанию старта сервера
  }
};