module.exports = {
  fix: true,
  ts: false,
  path: ['src'],
  formatter: 'stylish',
  extensions: ['.js', '.ts'],
  delay: 1500,
  config: {
    rules: {
      camelcase: 'off',
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
    },
  },
};
