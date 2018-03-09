const match = require('../src/match');

describe('match', () => {
  it('should accept undefined', () => {
    const af = (o) => match(undefined, o);
    expect(af('some')).toEqual(true);
  });

  it('should decline null', () => {
    const af = (o) => match(null, o);
    expect(af('some')).toEqual(false);
  });

  it('should accept string', () => {
    const af = (o) => match('some', o);
    expect(af('some')).toEqual(true);
  });

  it('should accept array of string', () => {
    const af = (o) => match(['some', 'x'], o);
    expect(af('some')).toEqual(true);
  });

  it('should accept deep array', () => {
    const af = (o) => match([[['some']]], o);
    expect(af('some')).toEqual(true);
  });

  it('should accept regexp', () => {
    const af = (o) => match(/.me$/, o);
    expect(af('some')).toEqual(true);
  });

  it('should accept array of regexp', () => {
    const af = (o) => match([/om(?!e)/, /so/], o);
    expect(af('some')).toEqual(true);
  });
});
