const { exec } = require('child_process');

const process = exec('dir');

process.stdout.on('data', (data) => {console.log(data.toString('utf8'))});

process.stderr.on('data', (data) => {console.error(data.toString('utf8'))})