export const isWord = (keyPressed) => {
  const words = "abcdfghijklmnñopqrstuvwxyz";
  words.forEach((element) => {
    if (keyPressed === element) {
      return true;
    }
  });
  return false;
};
export const isNumber = (keyPressed) => {
  const words = "0123456789";
  words.forEach((element) => {
    if (keyPressed === parseInt(element)) {
      return true;
    }
  });
  return false;
};
