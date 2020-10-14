const execa = require('execa');

const execaOptions = {
  stdout: 'inherit',
  stderr: 'inherit'
};

async function run() {
  await execa('rimraf', ['pkg'], execaOptions);

  execa(
    'cross-env',
    [
      'NODE_ENV=development',
      'webpack-dev-server',
      '--hot',
      '--config',
      './scripts/webpack.dev.config.js'
    ],
    execaOptions
  );
}

run();
