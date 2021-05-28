import { Buffer } from 'buffer';
import { createHash, randomBytes } from 'crypto';

/**
 * The default options.
 */
export const options = {
  algorithm: 'sha256',
  seed: 'random-bytes-seed',
};

/**
 * Generate random bytes and allow the final user to pass a seed for repeatability.
 * @param {number} length The random bytes desired length.
 * @param {Buffer | string} seed The seed. If not seed is provided, fallbacks to native {@link randomBytes}.
 * @return {Buffer} A pseudo random bytes buffer.
 */
export function randomBytesSeed(length: number, seed?: Buffer | string): Buffer {
  // Validate the inputs
  if (typeof length !== 'number' || !Number.isInteger(length) || length < 1) {
    throw new TypeError('`length` argument must be a valid strictly positive integer.');
  }

  if (!seed) {
    // No seed: fallback to native randomBytes
    return randomBytes(length);
  }

  /**
   * The round buffer, which is updated until the output buffer is long enough.
   */
  let round: Buffer = createHash('sha256').update(options.seed).update(seed).digest();

  /**
   * The output buffer, which size is increased after each round.
   */
  let output = Buffer.alloc(0);

  while (output.length < length) {
    round = createHash('sha256').update(round).digest();
    output = Buffer.concat([output, round]);
  }

  return output.slice(0, length);
}

export default randomBytesSeed;
