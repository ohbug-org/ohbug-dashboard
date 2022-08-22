import cluster from 'node:cluster'
import os from 'node:os'

export class Cluster {
  static register(workers: Number, callback: Function): void {
    if (cluster.isPrimary) {
      console.warn(`Master server started on ${process.pid}`)

      // ensure workers exit cleanly
      process.on('SIGINT', () => {
        console.warn('Cluster shutting down...')
        for (const id in cluster.workers) {
          cluster.workers[id]?.kill()
        }
        process.exit(0)
      })

      const cpus = os.cpus().length
      if (workers > cpus) {
        workers = cpus
      }

      for (let i = 0; i < workers; i++) {
        cluster.fork()
      }
      cluster.on('online', (worker) => {
        console.warn('Worker %s is online', worker.process.pid)
      })
      cluster.on('exit', (worker) => {
        console.warn(`Worker ${worker.process.pid} died. Restarting`)
        cluster.fork()
      })
    }
    else {
      callback().catch((error: any) => {
        console.error(error)
        process.exit(1)
      })
    }
  }
}
