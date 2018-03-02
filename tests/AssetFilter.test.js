const AssetFilter = require('../src/AssetFilter');

describe('AssetFilter', () => {
  it('should accept string', () => {
    const af = new AssetFilter('some', {});
    expect(af.apply({ assets: { a: 1, some: 2 } })).toEqual(['some']);
  });

  it('should accept array of string', () => {
    const af = new AssetFilter(['some', 'x'], {});
    expect(af.apply({ assets: { a: 1, some: 2 } })).toEqual(['some']);
  });

  it('should accept deep array', () => {
    const af = new AssetFilter([[['some']]], {});
    expect(af.apply({ assets: { a: 1, some: 2 } })).toEqual(['some']);
  });

  it('should accept regexp', () => {
    const af = new AssetFilter(/.me$/, {});
    expect(af.apply({ assets: { a: 1, some: 2 } })).toEqual(['some']);
  });

  it('should accept array of regexp', () => {
    const af = new AssetFilter([/om(?!e)/, /so/], {});
    expect(af.apply({ assets: { a: 1, some: 2 } })).toEqual(['some']);
  });
});
