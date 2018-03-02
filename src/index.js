const PatternBase = require('./PatternBase');
const Prefetch = require('./Prefetch');
const Preload = require('./Preload');

class AdvancedInjectionPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('PreloadPlugin', () => {
      compiler.hooks.thisCompilation.tap('PreloadPlugin', (compilation) => {
        const proc = this.beforeHtmlProcessing.bind(this, compilation);
        compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', (hwp) => {
          hwp.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('PreloadPlugin', proc);
        });
      });
    });
  }

  // eslint-disable-next-line no-unused-vars
  beforeHtmlProcessing(compilation, htmlPluginData) {
    // TODO
  }
}

module.exports = {
  default: AdvancedInjectionPlugin,
  AdvancedInjectionPlugin,
  PatternBase,
  Prefetch,
  Preload,
};
