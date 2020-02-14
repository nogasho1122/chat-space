$(function(){ 
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat_main_messages').append(insertHTML);
      $('.chat_main_messages').animate({ scrollTop: $('.chat_main_messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  var buildHTML = function(message) {
    if (message.content && message.image) {

      var html =
       `<div class ="message" data-message-id=${message.id}>
        <div class="chat_main_messages_message">
        <div class="chat_main_messages_message_upper_info">
          <div class="chat_main_messages_message_upper_info_talker">
            ${message.user_name}
          </div>
          <div class="uchat_main_messages_message_upper_info_date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat_main_messages_message_text">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {

      var html = 
      `<div class ="message" data-message-id=${message.id}>
        <div class="chat_main_messages_message">
        <div class="chat_main_messages_message_upper_info">
          <div class="chat_main_messages_message_upper_info_talker">
            ${message.user_name}
          </div>
          <div class="chat_main_messages_message_upper_info_date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat_main_messages_message_text">
        <p class="lower-message__content">
          ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {

      var html = 
      `<div class ="message" data-message-id=${message.id}>
        <div class="chat_main_messages_message">
        <div class="chat_main_messages_message_upper_info">
          <div class="chat_main_messages_message_upper_info_talker"">
            ${message.user_name}
          </div>
          <div class="chat_main_messages_message_upper_info_date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message__content">
          <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };

  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class ="message" data-message-id=${message.id}>
        <div class="chat_main_messages_message">
        <div class="chat_main_messages_message_upper_info">
          <p class="chat_main_messages_message_upper_info_talker">
            ${message.user_name}
          </p>
          <p class="chat_main_messages_message_upper_info_date">
            ${message.created_at}
          </p>
        </div>
        <p class="chat_main_messages_message_text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </p>
          <img class="lower-message__image" src=${message.image} >
    </div>`
      return html;
    } else {
      var html =
      `<div class ="message" data-message-id=${message.id}>
        <div class="chat_main_messages_message">
          <div class="chat_main_messages_message_upper_info">
            <p class="chat_main_messages_message_upper_info_talker">
              ${message.user_name}
            </p>
            <p class="chat_main_messages_message_upper_info_date">
              ${message.created_at}
            </p>
          </div>
          <p class="chat_main_messages_message_text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </p>
        </div>`
      return html;
    };
}

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')

  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })

  .done(function(data){
    var html = buildHTML(data);
      $('.chat_main_messages').append(html);
      $('.chat_main_messages').animate({ scrollTop: $('.chat_main_messages')[0].scrollHeight});
      $('.submit_btn').attr('disabled', false);
    })
    
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });

 })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});