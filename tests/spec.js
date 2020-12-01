const assert = require('chai').assert;
const getQuestion = require('../utils/getQuestion');
const task = require('../task.json');

console.clear();

describe(`Testing task ${task.question}:`, async () => {
    const { tests, solutions } = await getQuestion(task.question);

    Object.keys(solutions).forEach(name => {
        describe(`Soluton from ${name.split('.')[0].toUpperCase()}: `, function () {
            tests.forEach(test => {
                // clone this since it is passed by reference and different solutions can
                // make problems for each other
                let cloneCaseStringify = JSON.stringify(test.case);
                let cloneToBeStringify = JSON.stringify(test.toBe);

                it(`${test.description} - ${cloneCaseStringify} - should be '${cloneToBeStringify}'`, () => {
                    assert.deepEqual(solutions[name](...JSON.parse(cloneCaseStringify)), JSON.parse(cloneToBeStringify));
                });
            })
        });
    });
});
