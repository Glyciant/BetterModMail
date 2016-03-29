$(document).ready(function(){
  //  var body = $("tbody").html(),
  //      newbody = body.replace("&amp;", "&");
   //
  //  $("tbody").html(newbody)
   //
  //  console.log(body)
   $('.modal-trigger').leanModal();
 });

 $(document).delegate("#mail-tags-post", "click", function() {
   var id = $(this).data("id")
       tags = $("#edit-tags-" + id).val()

   $.post('/data/tags', {
      id: id,
      tags: tags
   });
 })

 $(document).delegate("#mail-assigned_to-post", "click", function() {
   var id = $(this).data("id")
       user = $("#edit-assigned_to-" + id).val()

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
   }
   else if (status == "close") {
     var open = false
   }

   $.post('/data/open', {
      id: id,
      open: open
   });
 })
