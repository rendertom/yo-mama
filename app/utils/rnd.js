export default rnd = {
  getFromArray(array) {
    const index = this.getInt(0, array.length - 1);
    return array[index];
  },

  getInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getIntWithLength(numDigits) {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;

    return this.getInt(min, max);
  },
};
