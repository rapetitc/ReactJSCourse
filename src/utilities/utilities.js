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
  const numbers = "0123456789";
  numbers.forEach((element) => {
    if (keyPressed === parseInt(element)) {
      return true;
    }
  });
  return false;
};
export const isArrow = (keyPressed) => {
  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  let result = false;
  keys.forEach((element) => {
    if (keyPressed === element) {
      result = true;
    }
  });
  return result;
};
export const isTab = (keyPressed) => {
  const keys = ["Tab"];
  let result = false;
  keys.forEach((element) => {
    if (keyPressed === element) {
      result = true;
    }
  });
  return result;
};
export const isRemoving = (keyPressed) => {
  const keys = ["Backspace", "Delete"];
  let result = false;
  keys.forEach((element) => {
    if (keyPressed === element) {
      result = true;
    }
  });
  return result;
};
