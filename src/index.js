const _ = require('lodash');
const PatternBase = require('./PatternBase');
const AsyncCss = require('./AsyncCss');
const Prefetch = require('./Prefetch');
const Preload = require('./Preload');

class AdvancedInjectionPlugin {
  constructor({ rules }) {
    this.rules = rules || [];
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

  gatherEmits(indent, emits) {
    const res = _.flattenDeep(emits).filter(_.identity).map((e) => {
      const spaces = ' '.repeat(indent);
      return e
        .replace(/^(<[a-z]+|<!--)/, `${spaces}$1`)
        .replace(/\n *(<\/[a-z]+>|-->)$/, `\n${spaces}$1`);
    });
    return res.join('\n');
  }

  // eslint-disable-next-line no-unused-vars
  beforeHtmlProcessing(compilation, htmlPluginData) {
    const { filename } = htmlPluginData.plugin.options;
    this.rules.forEach(({ match, head, body, ...other }) => {
      if (_.isString(match)) {
        if (match !== filename) return;
      } else if (_.isArray(match)) {
        if (!match.includes(filename)) return;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!match.test(filename)) return;
      }

      let { html } = htmlPluginData;

      const inject = (pat, obj) => {
        if (!obj) return;

        const make = (indent) => {
          const emits = _.flatten([
            obj.map((p) => p.apply(compilation, filename)),
            obj.map((p) => p.finalEmit()),
          ]);
          return this.gatherEmits(indent, emits);
        };

        const reg0 = new RegExp(`\n( *)${pat}`);
        if (reg0.test(html)) {
          html = html.replace(reg0, (m, indent) => {
            let diff = 0;
            if (pat.startsWith('</')) {
              diff = +2;
            }
            const str = make(indent.length + diff);
            if (!str) return m;
            return `\n${str}\n${indent}${pat}`;
          });
          return;
        }
        const reg1 = new RegExp(pat);
        if (reg1.test(html)) {
          html = html.replace(reg1, (m) => {
            const str = make(0);
            if (!str) return m;
            return `${str}\n${m}`;
          });
          return;
        }
        html += make(0);
      };

      inject('</head>', head);
      inject('</body>', body);
      _.toPairs(other).forEach((p) => inject(...p));
      _.set(htmlPluginData, 'html', html);
    });
  }
}

module.exports = {
  default: AdvancedInjectionPlugin,
  AdvancedInjectionPlugin,
  PatternBase,
  AsyncCss,
  Prefetch,
  Preload,
};
