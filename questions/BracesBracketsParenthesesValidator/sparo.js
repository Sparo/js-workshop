module.exports = function (code) {
    // Determine if the input code is valid
    let openers = ["(", "{", "["];
    let closers = [")", "}", "]"];

    let chars = code.split("");
    let openingBracket = [];

    for (let i = 0; i < chars.length; i++) {
        let item = chars[i];
        const indexInOpeners = openers.indexOf(item);
        const indexInClosers = closers.indexOf(item);

        if (indexInOpeners !== -1) {
            openingBracket.push(item);
        }

        if (indexInClosers !== -1) {
            if (indexInClosers === openers.indexOf(openingBracket[openingBracket.length - 1])) {
                openingBracket.pop();
            } else {
                return false;
            }
        }
    }

    return openingBracket.length === 0;
}