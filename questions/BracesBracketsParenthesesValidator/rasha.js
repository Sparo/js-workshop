module.exports = function (izraz) {
  const openers = ['{', '[', '('];
  const closers = ['}', ']', ')'];

  const nivoi = [];

  let valid = true;

  // proći prvo sve izraze:
  izraz.split('').forEach((znak, indeks) => {
    if (openers.includes(znak)) {
      nivoi.push(znak);
    }

    if (closers.includes(znak)) {
      if (nivoi.length > 0) {
        if (closers.indexOf(znak) !== openers.indexOf(nivoi.pop())) {
          valid = false;
        }
      } else {
        if (indeks === izraz.length - 1) {
          valid = false;
        }      
      }
    }
  });

  // ako nije "počišćen" niz nivoa - ne valja nešto:
  if (nivoi.length) {
    valid = false;
  }
  
  return valid;
}