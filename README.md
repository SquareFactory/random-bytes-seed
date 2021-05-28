# `@csquare/random-bytes-seed`

![licence](https://img.shields.io/github/license/csquare-ai/random-bytes-seed)
![version](https://img.shields.io/npm/v/@csquare/random-bytes-seed)
![size](https://img.shields.io/bundlephobia/min/@csquare/random-bytes-seed)
![coverage](https://img.shields.io/codecov/c/github/csquare-ai/random-bytes-seed)

Zero-dependency package to generate seeded random bytes.

Maintained by [Mathieu Bour](https://github.com/mathieu-bour), Lead Platform Engineer at [Cohesive Computing SA](https://csquare.ai).

## Installation

Install with npm:

```shell
npm install --save @csquare/random-bytes-seed
```

Install with Yarn:

```shell
yarn add @csquare/random-bytes-seed
```

## Usage

### Basic usage

```typescript
import randomBytesSeed from '@csquare/random-bytes-seed';

const output = randomBytesSeed(10, 'my-seed'); / Generate a 10-bytes, stable buffer
```

### Advanced usage

#### Changing the base seed

By default, this packages uses a base seed equals to `random-bytes-seed` in conjunction of the given seed. You can
change the base seed by overriding the default options.

```typescript
// Overriding the default options
import { options } from '@csquare/random-bytes-seed';

options.seed = 'any-string-you-want'; / Override the base seed for all future calls
```

#### Changing the hash algorithm

This package use Node `createHash` function from the `crypto` module.
By default, the rounds are computed with the `sha256` hash algorithm.
You can change this behavior by overriding the default options.

```typescript
// Overriding the default options
import { options } from '@csquare/random-bytes-seed';

options.algorithm = 'sha512';
```

From the nodejs.org documentation:

> The algorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform.
> Examples are `'sha256'`, `'sha512'`, etc.
> On recent releases of OpenSSL, `openssl list -digest-algorithms` (`openssl list-message-digest-algorithms` for older versions of OpenSSL) will display the available digest algorithms.
>
> Reference: https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
