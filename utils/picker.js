const inquirer = require('inquirer');
const path = require('path');
const fs = require("fs");

const questionsPath = path.join(__dirname, "../questions");
const questions = fs.readdirSync(questionsPath);

module.exports = function () {
    inquirer
        .prompt([{
            type: 'list',
            name: 'question',
            message: `Choose task to validate:`,
            choices: questions,
            default: false,
        }])

        .then(answers => {
            fs.writeFileSync('task.json', JSON.stringify(answers));
        })
        .catch(error => {
            console.log(error)
        });
};


