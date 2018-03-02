const _ = require('lodash');
const fs = require('fs');

class PreloadPlugin {
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('PreloadPlugin', () => {
      compiler.hooks.thisCompilation.tap('PreloadPlugin', (compilation) => {
        const proc = this.beforeHtmlProcessing.bind(this, compilation);
        compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', (hwp) => {
          hwp.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('PreloadPlugin', proc);
        });
      });
    });
  }

  beforeHtmlProcessing(compilation, htmlPluginData, cb) {
    fs.readFile(path.resolve('fg-loadcss/dist/cssrelpreload.min.js'), 'utf-8', (err, data) => {
      this.beforeHtmlProcessingAsync(compilation, htmlPluginData, data);
      cb(err, htmlPluginData);
    });
  }

  injectAssets(compilation, htmlPluginData, cssPreloadFix) {
    const entry = (e) => compilation.outputOptions.publicPath + e;
    const makeMake = (fun) => (reg, ...args) => _.keys(compilation.assets)
      .filter((a) => reg.test(a.replace(/^assets\//, '')))
      .map((a) => fun(a, ...args));
    const makePreloadImmeStyle = makeMake((a) => {
    });
    const makePreload = makeMake((a, as) => `<link rel="preload" as="${as}" href="${entry(a)}">`);
    const makePrefetch = makeMake((a) => `<link rel="prefetch" href="${entry(a)}">`);

    const preloads = [];
    if (/^index/.test(htmlPluginData.plugin.options.filename)) {
      // outdatedbrowser.min.js outdated.js
      preloads.push(...makePreload(/^outdated(browser)?\..*\.js$/, 'script'));
      // index.js
      preloads.push(...makePreload(/^index\..*\.js$/, 'script'));
      // roboto-latin-400.woff2 roboto-latin-300.woff2
      preloads.push(...makePreload(/^roboto-latin-[34]00\..*\.woff2$/, 'font'));
      // NotoSansSC-Regular-X.woff2 NotoSansSC-Light-X.woff2
      preloads.push(...makePreload(/^NotoSansSC-(Regular|Light)-X\..*\.woff2$/, 'font'));
      // app.js
      preloads.push(...makePrefetch(/^app\..*\.js$/));
      // app.css
      preloads.push(...makePrefetch(/^app\..*\.css$/));
      // 0.chunk.js
      preloads.push(...makePrefetch(/^[0-9]+\..*\.chunk\.js$/, 'script'));
      // LoginContainer.chunk.js
      preloads.push(...makePrefetch(/^LoginContainer.*\.chunk\.js$/));
      // HomeContainer.chunk.js
      preloads.push(...makePrefetch(/^HomeContainer.*\.chunk\.js$/));
      // NotoSansSC-Regular.woff2
      preloads.push(...makePrefetch(/^NotoSansSC-Regular\..*\.woff2$/));
    } else if (/^app/.test(htmlPluginData.plugin.options.filename)) {
      // outdatedbrowser.min.js outdated.js
      preloads.push(...makePreload(/^outdated(browser)?\..*\.js$/, 'script'));
      // app.js common-app.chunk.js
      preloads.push(...makePreload(/^(common-)?app\..*\.js$/, 'script'));
      // roboto-latin-400.woff2 roboto-latin-300.woff2
      preloads.push(...makePreload(/^roboto-latin-[34]00\..*\.woff2$/, 'font'));
      // NotoSansSC-Regular-X.woff2 NotoSansSC-Light-X.woff2
      preloads.push(...makePreload(/^NotoSansSC-(Regular|Light)-X\..*\.woff2$/, 'font'));
      // NotoSansSC-Regular.woff2
      preloads.push(...makePrefetch(/^NotoSansSC-Regular\..*\.woff2$/));
      // *.chunk.js
      preloads.push(...makePrefetch(/\.chunk\.js$/));
      // *.worker.js
      preloads.push(...makePrefetch(/^.*\.worker\.js$/));
    }

    _.set(htmlPluginData, 'html', htmlPluginData.html.replace('</head>', `${preloads.join('\n')}</head>`));
  }
}

module.exports = PreloadPlugin;
