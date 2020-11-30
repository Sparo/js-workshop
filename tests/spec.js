const assert = require('chai').assert;
const getQuestion = require('../utils/getQuestion');
const task = require('../task.json');

console.clear();

describe(`Testing task ${task.question}:`, async () => {
    const { tests, solutions } = await getQuestion(task.question);

    Object.keys(solutions).forEach(name => {
        describe(`Soluton from ${name.split('.')[0].toUpperCase()}: `, function () {
            tests.forEach(test => {
                it(`${test.description} - ${JSON.stringify(test.case)} - should be '${JSON.stringify(test.toBe)}'`, () => {
                    assert.deepEqual(solutions[name](...test.case), test.toBe);
                });
            })
        });
    });
});
