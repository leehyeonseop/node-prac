const url = require('url');

const { URL } = url;

const myURL = new URL('http://www.naver.com?name=gustjq');

console.log('myURL : ',myURL);
console.log('format : ', url.format(myURL))