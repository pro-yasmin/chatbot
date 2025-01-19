const Utils = {
  /**
   * Generates a random string of Arabic characters.
   *
   * @param {number} num - The length of the desired Arabic string.
   * @returns {string} - A randomly generated string of Arabic characters.
   */
  generateRandomArabicString: function (num) {
    const asciirange1 = 0x0621; // Unicode for 'ء'
    const asciirange2 = 0x063a; // Unicode for 'غ'
    let result = "";
    for (let i = 0; i < num; i++) {
      const randomChar = String.fromCharCode(
        Math.floor(Math.random() * (asciirange2 - asciirange1 + 1)) +
          asciirange1
      );
      result += randomChar;
    }
    return result;
  },

  /**
   * Generates a random string of English letters.
   *
   * @param {number} num - The length of the desired English string.
   * @returns {string} - A randomly generated string of English letters.
   */
  generateRandomEnglishString: function (num) {
    const asciirange1 = 65; // ASCII for 'A'
    const asciirange2 = 122; // ASCII for 'z'
    let result = "";
    for (let i = 0; i < num; i++) {
      let randomChar;
      do {
        randomChar = String.fromCharCode(
          Math.floor(Math.random() * (asciirange2 - asciirange1 + 1)) +
            asciirange1
        );
      } while (!/[a-zA-Z]/.test(randomChar)); // Ensure the character is a valid letter
      result += randomChar;
    }
    return result;
  },

  /**
   * Generates a random numeric string of the specified length.
   *
   * @param {number} length - The desired length of the numeric string.
   * @returns {string} - A randomly generated numeric string.
   */
  generateRandomNumber: function (length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
      ""
    );
  },
};

module.exports = { Utils };
