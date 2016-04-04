var config = require("./config")

var isMod = function(username) {
  return config.app.mods.indexOf(username) > -1;
}

var toDate = function(timestamp){
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = date + ' ' + month + ' ' + year;
  return time;
}


module.exports = {
  isMod: isMod,
  toDate: toDate
}
