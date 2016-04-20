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

 $(document).delegate("#mail-reply-post", "click", function() {
   var id = $(this).data("id"),
       content = $("#create-reply-" + id).val()

    Materialize.toast('Message Sent', 4000)
    $.post('/data/reply', {
      id: id,
      content: content
    })
 })

 $(document).delegate("#select-auto-response", "change", function() {
   var value = $(this).val(),
   id = $(this).data("id")

   if (value === "") {
     $("#create-reply-" + id).val("")
   }
   else if (value === "Channel Advertisement") {
     $("#create-reply-" + id).val("Hey there,\n \nDirect channel advertisements are a violation of rule #3 and are not allowed on the Sub. Instead, I suggest you [create a channel intro over at TwitchDB.tv](http://www.twitchdb.tv/createintro), a site managed by the /r/Twitch mod team. Beyond the Sub, there are many ways to promote your channel and your brand. These are [some](https://www.reddit.com/r/Twitch/comments/3clebh/getting_noticed_on_twitch/) [guides](https://www.reddit.com/r/Twitch/comments/3drowh/using_social_media_effectively/) from around the Sub.\n \nThanks for messaging us!")
   }
   else if (value === "Personal Help Response") {
     $("#create-reply-" + id).val("Hey there,\n \nYou have sent us a modmail message, however we are unable to help individual users with non-subreddit related problems. Instead, I suggest clicking the '[Submit New Topic](https://www.reddit.com/r/Twitch/submit?selftext=true)' button, on the subreddit sidebar - and let the community help you. Please make sure to read the rules, and check your post follows them. It would also help if you can provide as much information as possbile.\n \nThanks!")
   }
   else if (value === "Ad Request Form") {
     $("#create-reply-" + id).val("Hey there,\n \nPlease could you fill out [this form](http://requests.twitchdb.tv/submit)? It helps us to find out more information about your advertisement request and helps to improve our judgement on approving it. Ensure any links are included and you provide as much information as possible. Remember that posting your request before it is approved is against subreddit rule #3. Please note these approvals sometimes take a while, but feel free to ask again after 7 days.\n \nIf you have any other issues, please let us know.\n \nThanks!")
   }
   else if (value === "Ad Request Approved") {
     $("#create-reply-" + id).val("Hey there,\n \nWe have now had time to review the advertisement request you submitted, and have decided to allow your post.\n \nThanks for your patience!"     )
   }
   else if (value === "Ad Request Rejected") {
     $("#create-reply-" + id).val("Hey there,\n \nWe have now had time to review the advertisement request you submitted. However, we do not currently think it would be suitable to allow you to post your thread at this time.\n \nThanks for your patience and understanding!")
   }
   else if (value === "Karma Filter Query Approve") {
     $("#create-reply-" + id).val("Hey there,\n \nSorry to hear this has been happening to you. We have our AutoModerator bot configured to automatically remove any comment/thread posted by a user whose karma falls below a certain level. This is generally effective at removing some trolls from the subreddit, though some good users do get caught up in it occassionally. It would appear that is what has happened here.\n \nSince your reddit history shows you were downvoted unfairly, I have added you to the filter's whitelist and re-approved any comments/posts that were accidentally removed. AutoMod should leave you alone now.\n \nThanks for messaging us!")
   }
   else if (value === "Karma Filter Query Rejection") {
     $("#create-reply-" + id).val("Hey there,\n \nWe have our AutoModerator bot configured to automatically remove any comment/thread posted by a user whose karma falls below a certain level. Your reddit history suggests that you are not suitable to be put in this filter's whitelist, and AutoMod will therefore continue to remove your comments/posts.\n \nThanks for understanding.")
   }
   else if (value === "Shadowbanned") {
     $("#create-reply-" + id).val("Hey there,\n \nIt appears that you have been shadowbanned from the entirety of reddit. This means that only you and community moderators are able to see what you comment or post. We have no insight into why you are shadowbanned, so it's best to discuss and appeal it with reddit admins. For more information, you might want to look at [this guide](https://www.reddit.com/r/ShadowBan/comments/1vyaa2/a_guide_to_getting_unshadowbanned_sticky_maybe/). In the meantime, I will approve any non-rule-breaking posts/comments you submitted.\n \nThanks for messaging us!")
   }
   else if (value === "Global Moderator Application") {
     $("#create-reply-" + id).val("Hey there,\n \nWe are a community-run unofficial subreddit and therefore are in no position to provide users this position. Furthermore, there is no set application process at this current time. I suggest reading [this guide](https://www.reddit.com/r/Twitch/comments/3xwwj2/how_to_become_a_twitch_global_moderatoradmin_v20/).\n \nThanks for messaging us!")
   }
   else if (value === "Reporting Users") {
     $("#create-reply-" + id).val("Hey there,\n \nWe are a community-run unofficial subreddit and therefore are in no position to manage Twitch moderation. You should instead use the [report feature](http://help.twitch.tv/customer/portal/articles/725568-how-to-file-a-report), which will allow the problem to be reviewed by an on-duty admin and for action to be taken where necessary. Make sure to include as much evidence and detail as possible - [this guide](https://www.reddit.com/r/Twitch/comments/3trrov/report_guide_and_faq/) provides tips on how to do so.\n \nThanks for messaging us!")
   }
   else if (value === "Flair Fixed") {
     $("#create-reply-" + id).val("Hey there,\n \nYour flair has now been restored. Please try to avoid clicking 'edit flair' on the sidebar as lots of people manage to remove their flair by doing so.\n \nThanks for messaging us!")
   }
})
