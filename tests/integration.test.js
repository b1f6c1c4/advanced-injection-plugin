const fs = require('fs');
const path = require('path');

const loadFile = (filename) => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '../', filename), 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

describe('example', () => {
  it('should output index.html', async (done) => {
    const [act, exp, cssPreload, mainJs] = await Promise.all([
      loadFile('./example/dist/index.html'),
      loadFile('./example_output/index.html'),
      loadFile('./example/node_modules/fg-loadcss/dist/cssrelpreload.min.js'),
      loadFile('./example/dist/main.js'),
    ]);
    let exps = exp;
    exps = exps.replace('CSSRELPRELOAD_MIN_JS', cssPreload);
    exps = exps.replace('MAIN_JS', mainJs);
    expect(act).toEqual(exps);
    done();
  });
});
