function replaceNull(someObj, replaceValue = "***") {
  const replacer = (key, value) =>
    String(value) === "null" || String(value) === "undefined"
      ? replaceValue
      : value;

  return JSON.parse(JSON.stringify(someObj, replacer));
}

module.exports = {
  replaceNull,
};