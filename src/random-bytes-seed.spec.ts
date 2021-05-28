import { randomBytes, randomInt } from 'crypto';
import randomBytesSeed from './random-bytes-seed';

const iterations = 10;

describe('randomBytesSeed', () => {
  it.each([-2, 17.2, 'hello'])('should reject %p as `length` argument', (invalidLength) => {
    // @ts-expect-error
    expect(() => randomBytesSeed(invalidLength)).toThrowError(TypeError);
  });

  it('should return a stable length buffer', () => {
    const expectedLength = randomInt(20, 30);

    for (let i = 0; i < iterations; i++) {
      expect(randomBytesSeed(expectedLength).length).toBe(expectedLength);
    }
  });

  it('should return a stable buffer value for a given seed', () => {
    const seeds = [...Array(5)].map(() => randomBytes(20));

    seeds.forEach((seed) => {
      const expectedBuffer = randomBytesSeed(20, seed);

      for (let i = 0; i < iterations; i++) {
        expect(randomBytesSeed(20).compare(expectedBuffer)).toBeTruthy();
      }
    });
  });
});
