$(document).ready(function(){
   $('.modal-trigger').leanModal();
 });

 $(document).delegate("#mail-tags-post", "click", function() {
   var id = $(this).data("id")
       tags = $("#edit-tags-" + id).val()

   $("#message-tags-" + id).html(tags)

   $.post('/data/tags', {
      id: id,
      tags: tags
   });
 })

 $(document).delegate("#mail-assigned_to-post", "click", function() {
   var id = $(this).data("id")
       user = $("#edit-assigned_to-" + id).val()

   $("#message-assigned_to-" + id).html(user)

   $.post('/data/assigned_to', {
      id: id,
      user: user
   });
 })

 $(document).delegate("#mail-status-post", "click", function() {
   var id = $(this).data("id")
       status = $(this).data("update")

   if (status == "open") {
     var open = true
     $("#message-status-" + id).html("Open")
     $("#message-change-status-" + id).html("done")
   }
   else if (status == "close") {
     var open = false
     $("#message-status-" + id).html("Closed")
     $("#message-change-status-" + id).html("not_interested")
   }
   
   $.post('/data/open', {
      id: id,
      open: open
   });
 })
