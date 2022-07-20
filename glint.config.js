module.exports = {
  fix: true,
  ts: false,
  path: ['src'],
  formatter: 'stylish',
  extensions: ['.js', '.ts'],
  config: {
    rules: {
      camelcase: 'off',
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
    },
  },
};
