export default {
  plugins: [
    'remark-preset-lint-recommended',
    ['remark-lint-no-dead-urls', { skipOffline: true }]
  ]
};
