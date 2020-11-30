module.exports = function (myArray, alicesArray) {
    const combined = [];
    let mineIndex = 0;
    let alicesIndex = 0;
    const myArrayLength = myArray.length;
    const alicesArrayLength = alicesArray.length;

    // Combine the sorted arrays into one large sorted array
    while (mineIndex < myArrayLength || alicesIndex < alicesArrayLength) {
        const mineDefined = typeof myArray[mineIndex] !== 'undefined';
        const alicesDefined = typeof alicesArray[alicesIndex] !== 'undefined';

        if (!mineDefined || (alicesDefined && myArray[mineIndex] > alicesArray[alicesIndex])) {
            combined.push(alicesArray[alicesIndex++]);
        } else {
            combined.push(myArray[mineIndex++]);
        }
    }

    return combined;
}