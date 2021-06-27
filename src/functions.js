export function formatDate(date) {
  var dateFormat = require("dateformat");
  return dateFormat(date, "dd.mm.yyyy");
}

export function formatDate2(date) {
  var dateFormat = require("dateformat");
  return dateFormat(date, "yyyy-mm-dd");
}
