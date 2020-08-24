const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// We need Nodes fs module to read directory contents
const fs = require('fs');

// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
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
      inject: false,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./src/pages')

module.exports = {
  entry: {
    application: './src/index.js',
    print: './src/print.js',
    //style: './src/sass/style.scss'
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    
    new MiniCssExtractPlugin({
      filename:  '[name].[hash].css',
      chunkFilename:  '[id].[hash].css',
    }),

    
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
        use: ['style-loader', 'css-loader']
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
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },

      // //Compile SCSS to separateCSS without Plugin
      // {  
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: { outputPath: '', name: '[name].min.css' }
      //     },
      //     'sass-loader'
      //   ]
      // },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },

      // //SCSS to js bundle
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     'style-loader',
      //     // Translates CSS into CommonJS
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: 'sass-loader', // Compiles Sass to CSS
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },// End SCSS to js bundle

    ],//End rules
  },//End Module
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    port: 9000,
    open: true //открыть браузер по окончанию старта сервера
  }
};