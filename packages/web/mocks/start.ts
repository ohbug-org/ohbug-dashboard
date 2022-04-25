import { setupServer } from 'msw/node'

const server = setupServer()

server.listen({ onUnhandledRequest: 'bypass' })
console.warn('🔶 Mock server running')

process.once('SIGINT', () => server.close())
process.once('SIGTERM', () => server.close())
