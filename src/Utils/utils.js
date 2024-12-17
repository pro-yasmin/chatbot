const Utils = {
  generateRandomArabicString: function (num) {
    const asciirange1 = 0x0621; // Unicode for 'ء'
    const asciirange2 = 0x063A; // Unicode for 'غ'
    let result = '';
    for (let i = 0; i < num; i++) {
      const randomChar = String.fromCharCode(
        Math.floor(Math.random() * (asciirange2 - asciirange1 + 1)) + asciirange1
      );
      result += randomChar;
    }
    return result;
  },

  generateRandomEnglishString: function (num) {
    const asciirange1 = 65; // ASCII for 'A'
    const asciirange2 = 122; // ASCII for 'z'
    let result = '';
    for (let i = 0; i < num; i++) {
      let randomChar;
      do {
        randomChar = String.fromCharCode(
          Math.floor(Math.random() * (asciirange2 - asciirange1 + 1)) + asciirange1
        );
      } while (!(/[a-zA-Z]/.test(randomChar))); // Ensure the character is a valid letter
      result += randomChar;
    }
    return result;
  },

  generateRandomNumber: function (length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  },
  
};
module.exports = {Utils};