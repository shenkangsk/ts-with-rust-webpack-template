const execa = require('execa');
const args = require('minimist')(process.argv.slice(2));

const execaOptions = {
  stdout: 'inherit',
  stderr: 'inherit'
};

async function run() {
  await execa('rimraf', ['pkg', 'dist'], execaOptions);

  console.log('--------- BUILD DLL ---------');
  await execa(
    'webpack',
    ['--config', './scripts/webpack.dll.config.js'],
    execaOptions
  );

  console.log('--------- BUILD UI ---------');
  await execa(
    'webpack',
    ['--config', './scripts/webpack.build.config.js'],
    execaOptions
  );
}

run();
