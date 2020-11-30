module.exports = function (myArray, alicesArray) {
    // Combine the sorted arrays into one large sorted array
    let maIndex = 0;
    let aaIndex = 0;
    let finalArray = [];

    while (maIndex < myArray.length || aaIndex < alicesArray.length) {
        let elem = Math.min(
            myArray[maIndex] || alicesArray[aaIndex],
            alicesArray[aaIndex] || myArray[maIndex]
        );

        elem === myArray[maIndex] ? maIndex++ : aaIndex++;

        finalArray.push(elem);
    }

    return finalArray;
}