/**
 * Babel configuration for Jest to handle ES6 modules
 */

export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};