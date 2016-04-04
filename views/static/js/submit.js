$(document).delegate("#submit-content", "click", function() {
  var to = $("#recipient").val(),
      subject = $("#subject").val(),
      body = $("#body").val()

  $.post('/data/compose', {
     to: to,
     subject: subject,
     body: body
  });
})
