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
    const [act, exp] = await Promise.all([
      loadFile('./example/dist/index.html'),
      loadFile('./example_output/index.html'),
    ]);
    expect(act).toEqual(exp);
    done();
  });
});
