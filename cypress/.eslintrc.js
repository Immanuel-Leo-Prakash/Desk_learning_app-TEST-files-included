module.exports = {
  root: true,
  plugins: ["eslint-plugin-cypress"],
  extend: ["kentcdodds", "kentcdodds/import", "plugin:cypress/recommended"],
  env: { "cypress/globals": true },
};
