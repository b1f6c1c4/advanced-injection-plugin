const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const AdvancedInjectionPlugin = require('advanced-injection-plugin');
const AdvancedInjectionPlugin = require('../');

const compiler = webpack({
  mode: 'development', // This is for debug/test purpose
  entry: {
    main: ['index'],
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /index\.css$/,
        use: [
          // 'style-loader', // to keep js untouched
          'css-loader',
        ],
      },
      {
        test: /vender\.css$/,
        use: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: false, // for debug/test
            },
          }],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('vender.css'),
    new HtmlWebpackPlugin({
      inject: false, // Make sure to turn off default injection
      minify: false, // This is for debug/test purpose, turn it on in production
      template: 'src/index.html',
    }),
    // new AdvancedInjectionPlugin({}),
  ],
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(stats.toString({
      colors: true,
    }));
  }
});
