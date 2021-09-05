export const truncate_string = (type, str1, length) => {
  if (str1.constructor === String && length > 0) {
    let newStr = str1.slice(0, length);
    return type.concat(newStr);
  }
};
