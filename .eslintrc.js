/* eslint-disable import/no-commonjs */

module.exports = {
  extends: '@mysg',
  root: true,
  rules: {
    // node version needs to be set manually in a monorepo setup due to engines field being present only in the root
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        version: '>=10.16',
      },
    ],
  },
}
