// server.ts
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import { prisma } from './src/lib/db'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('sendMessage', async (content: string) => {
      try {
        const message = await prisma.message.create({
          data: { content },
        })
        io.emit('newMessage', message)
      } catch (error) {
        console.error('Error creating message:', error)
      }
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})