const path = require('path');
const fs = require('fs');
var Parser = require('ansidown');

module.exports = function (question) {
    return new Promise(function (resolve, reject) {
        const taskFilesPath = path.join(__dirname, `../questions/${question}/`);
        const taskSolutions = fs.readdirSync(taskFilesPath);

        let readme = null;
        let solutions = {};
        let tests = null;

        taskSolutions.forEach(item => {
            switch (item.toLowerCase()) {
                case 'readme.md': {
                    readme = fs.readFileSync(taskFilesPath + item, 'utf-8');
                    var parsed = new Parser(readme);

                    console.log("=======================================================");
                    console.log(parsed.toString());
                    console.log("=======================================================");
                    break;
                }
                case 'tests.js': {
                    tests = require(taskFilesPath + item);
                    break;
                }
                default: {
                    if (!item.includes('.js')) {
                        reject(new Error('there must be some problem with file naming in: ', item));
                        break;
                    }
                    solutions[item] = require(taskFilesPath + item);
                    break;
                }
            }
        });

        resolve({ tests, solutions });
    })
}