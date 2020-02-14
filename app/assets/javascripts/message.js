$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="chat_main_messages_message" data-message-id=${message.id}>
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
      `<div class="chat_main_messages_message" data-message-id=${message.id}>
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
      $('.submit_btn').prop('disabled', false);
    })
    
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });

 })

});