const path = require('path');

console.log(__dirname);
console.log(__filename);

const mypath = path.join(__dirname, '..' ,'/dep1.js');

console.log('mypath : ', mypath);

const myresolvePath = path.resolve(__dirname, '..', '/dep2.js');

console.log('myresolvePath : ',myresolvePath);

console.log('path.sep : ', path.sep);

console.log('path.extname : ', path.extname('./path.js'));
