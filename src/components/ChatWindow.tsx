'use client';

import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Message } from '../types'

let socket: any;

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetchMessages()
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('newMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message])
    })
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async (content: string) => {
    socket.emit('sendMessage', content)
  }

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  )
}

export default ChatWindow