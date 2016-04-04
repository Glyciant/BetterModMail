$(document).delegate("#mute-user", "click", function() {
  var user = $("#user").val(),
      reason = $("#reason").val(),
      date = new Date(),
      date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      mod = $(this).data("mod")

  $("tbody").append("<tr><td>" + date  + "</td><td>" + user + "</td><td>" + mod + "</td><td>" + reason + "</td><td><a href='javascript:;' class='btn grey lighten-4 black-text' data-user=" + user + " id='unmute'><i class='large material-icons'>done</i></a></td></tr>")

  $.post('/data/mute', {
     id: user,
     mod: mod,
     date: date,
     reason: reason
  });
})

$(document).delegate("#unmute", "click", function() {
  var user = $(this).data("user")

  $(this).parent().parent().hide()

  $.post('/data/unmute', {
     id: user
  });
})
