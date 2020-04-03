const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const AdvancedInjectionPlugin = require('advanced-injection-plugin');
const {
  AdvancedInjectionPlugin,
  Prefetch,
  Preload,
  Css,
  AsyncCss,
  InlineJs,
} = require('..');

const compiler = webpack({
  mode: 'development', // This is for debug/test purpose
  entry: {
    // Useless entry, only to get the file
    mock: ['file-loader?name=[name].[ext]!fg-loadcss/dist/cssrelpreload.min.js'],
    main: ['index'],
    next: ['index'],
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'vender.css',
    }),
    new HtmlWebpackPlugin({
      inject: false, // Make sure to turn off default injection
      minify: false, // This is for debug/test purpose, turn it on in production
      template: 'src/index.html',
    }),
    new AdvancedInjectionPlugin(HtmlWebpackPlugin, {
      rules: [{
        match: 'index.html', // RegExp /^index\.html$/ also works here
        head: [
          new AsyncCss(/^vender.*\.css$/),
          new Preload(/^main.*\.js$/, { as: 'script' }),
          new Prefetch(/^next.*\.js$/),
          // It's (technically) possible to include same asset twice
          new Css(/^vender.*\.css/),
          new InlineJs(/^main.*\.js$/, {
            attr: {
              defer: true,
            },
          }),
          new InlineJs('cssrelpreload.min.js', {
            attr: {
              type: null,
            },
          }),
        ],
      }],
    }),
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
