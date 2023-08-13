const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '새로운 글을 입력합니다.')
    .then(() => {
        return fs.readFile('./writeme.txt')
    })
    .then((data) => {
        console.log('데이터 불러오기 : ', data.toString());
    })
    .catch((err) => {
        throw err
    })