module.exports = function (myArray, alicesArray) {
    const output = [];
    while (myArray.length && alicesArray.length) {
        output.push(myArray[0] < alicesArray[0] ? myArray.shift() : alicesArray.shift());
    }
    return [...output, ...myArray, ...alicesArray];
}
