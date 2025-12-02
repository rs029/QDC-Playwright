module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/**/*.ts'],
    format: [
      'json:reports/cucumber-report.json',
      '@cucumber/pretty-formatter',
      'progress-bar'
    ],
    paths: ['features/**/*.feature'],
    worldParameters: {
      headed: true,
      slowMo: 500
    }
  }
};

