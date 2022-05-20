const {
  encodeDelimitedArray,
  decodeDelimitedArray,
  decodeQueryParams,
  withDefault,
} = require("serialize-query-params");
const CommaArrayParam = {
  encode: (array) => encodeDelimitedArray(array, ","),
  decode: (array) => decodeDelimitedArray(array, ","),
};

const decodeQueryParamsForReservedVisits = (searchParams) => {
  return decodeQueryParams(
    { completed: withDefault(CommaArrayParam, []) },
    { completed: searchParams.get("completed") }
  );
};

module.exports = {
  CommaArrayParam,
  decodeQueryParamsForReservedVisits,
};
