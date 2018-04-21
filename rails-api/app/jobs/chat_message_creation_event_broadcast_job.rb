class ChatMessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(chat_message)
    ActionCable
      .server.broadcast(
      'chat_channel',
      id: chat_message.id,
      content: chat_message.content,
      created_at: chat_message.created_at.strftime('%H:%M')
     )
  end
end
