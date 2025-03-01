export const titleCase = (string) => {
  var splitted_string = string.toLowerCase().split(" ");
  for (var i = 0; i < splitted_string.length; i++) {
    splitted_string[i] =
      splitted_string[i].charAt(0).toUpperCase() +
      splitted_string[i].substring(1);
  }
  return splitted_string.join(" ");
};
