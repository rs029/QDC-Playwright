const { spawn } = require('child_process');
const args = process.argv.slice(2);

// Default world parameters for headed mode
const worldParams = {
  headed: true,
  slowMo: args.includes('--slow') ? 500 : 0
};

// Convert world parameters to JSON string
const worldParamsJson = JSON.stringify(worldParams);

const cucumberArgs = [
  '--config', 'cucumber.config.js',
  '--world-parameters', worldParamsJson,
  ...args.filter(arg => arg !== '--slow')
];

console.log('Running Cucumber with world parameters:', worldParamsJson);
console.log('Command:', 'cucumber-js', cucumberArgs.join(' '));

const cucumber = spawn('npx', ['cucumber-js', ...cucumberArgs], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

cucumber.on('error', (error) => {
  console.error('Error spawning cucumber:', error);
  process.exit(1);
});

cucumber.on('close', (code) => {
  process.exit(code || 0);
});

