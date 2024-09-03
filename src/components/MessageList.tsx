'use client';

import React from 'react'
import { Message } from '../types'

interface MessageListProps {
  messages: Message[]
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <p>{message.content}</p>
          <small>{new Date(message.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  )
}

export default MessageList