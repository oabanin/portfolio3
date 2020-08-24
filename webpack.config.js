const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// We need Nodes fs module to read directory contents
const fs = require('fs');

// Our function that generates our html plugins
function generateHtmlPlugins (templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./src/_layouts')

module.exports = {
  entry: {  
      application: './src/index.js',
      print: './src/print.js',
    },  
  mode: 'development',
  plugins: [
  	new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './src/_layouts/home.pug',
    // }),
    // new HtmlWebpackPlugin({
    // filename: 'contact.html',
    // inject: false,
    // template: './src/_layouts/contact.pug'
    // })

  ].concat(htmlPlugins),
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
    overlay: true,
    port: 9000,
    open: true //открыть браузер по окончанию старта сервера
  }
};