export function formatDate(date) {
  var dateFormat = require("dateformat");
  return dateFormat(date, "dd.mm.yyyy");
}
