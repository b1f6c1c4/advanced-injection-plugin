const makeAttr = require('../src/makeAttr');

describe('makeAttr', () => {
  it('should escape', () => {
    const attr = {
      key: 'va&amp;l"ue',
    };
    expect(makeAttr(attr)).toEqual(' key="va&#x26;amp;l&#x22;ue"');
  });

  it('should handle multipl', () => {
    const attr = {
      key1: 'a',
      key2: 'b',
    };
    expect(makeAttr(attr)).toEqual(' key1="a" key2="b"');
  });

  it('should handle empty', () => {
    const attr = {};
    expect(makeAttr(attr)).toEqual('');
  });
});
