const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');


//сканирует
// We need Nodes fs module to read directory contents
// const fs = require('fs');

// // Our function that generates our html plugins (many templates)
// function generateHtmlPlugins(templateDir) {
//   // Read files in template directory
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
//   return templateFiles.map(item => {
//     // Split names and extension
//     const parts = item.split('.');
//     const name = parts[0];
//     const extension = parts[1];
//     // Create new HTMLWebpackPlugin with options
//     return new HtmlWebpackPlugin({
//       filename: `${name}.html`,
//       inject: false,
//       template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
//     })
//   })
// }

// Call our function on our views directory.
//const htmlPlugins = generateHtmlPlugins('./src/pages')

module.exports = {
  entry: {
    application: './src/index.js',
    //print: './src/print.js',
    //styles: './src/sass/style.scss'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),

    new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: false,
    template: './src/pages/index.pug'
    }),

    //inline SVG 
    new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true, //If true plugin doesn't needy any loader
    }),

  ],
  // .concat(htmlPlugins)  - for multiple pug files


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
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /checked\.svg$/,  //LOADING VIA HtmlWebpackInlineSVGPlugin
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash].[ext]', //if [path] path goes from src, node_modules etc.
            },
          },
          //  Image compress
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false,
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.90],
          //       speed: 4
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // the webp option will enable WEBP
          //     // webp: {
          //     //   quality: 75
          //     // }
          //   }
          // },
        ],
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
        use: [{
	            loader: 'file-loader',
	            options: {
	              name: 'fonts/[name].[hash].[ext]', //if [path] path goes from src, node_modules etc.
	            },
	          },
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


      
      // { 
      //   test: /checked\.svg$/, 
      //   loader: 'svg-inline-loader' 
      // },



        //SVG as data: data:image/svg+xml
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'svg-url-loader',
      //       options: {
      //         limit: 10000,
      //       },
      //     },
      //   ],
      // },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
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
    port: 9001,
    open: true //открыть браузер по окончанию старта сервера
  }
};