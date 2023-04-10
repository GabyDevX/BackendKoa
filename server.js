import Koa from 'koa'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import dotenv from 'dotenv'
import cluster from 'cluster'
import compress from 'koa-compress'
import logger from './logger/logger.js'
import routes from './routes/index.js'
import numCPUs from 'os'
import mongoConnect from './services/mongoConnect.js'
import ioController from './controllers/ioController.js'
import views from 'koa-views'
import path from 'path'
import { fileURLToPath } from 'url'
import session from 'koa-session'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config()

const envPort = parseInt(process.argv[2]) || 8080
const PORT = process.env.PORT || envPort

if (cluster.isMaster) {
  console.log(numCPUs)
  console.log(`PID number: ${process.pid}`)

  for (let i = 0; i < numCPUs; i++) {}

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died: ${new Date().toString()}`)
    cluster.fork()
  })
} else {
  const app = new Koa()

  app.listen(PORT, () => {
    logger.info(`Servidor escuchando el puerto ${PORT} - PID: ${process.pid}`)
  })
}

const app = new Koa()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(
  views('public/views', {
    map: {
      html: 'ejs', // render .html files with the ejs engine
    },
    extension: 'ejs', // use the ejs engine by default
  }),
)
app.use(serve('./public'))
app.use(bodyParser())
app.use(compress())
// app.use(koaCookie());
app.keys = ['super-secret-key']
app.use(session(app))

app.use(routes.routes())

// app.use(
//   views('./public/views', {
//     extension: 'ejs',
//   }),
// )

// app.use(async (ctx, next) => {
//   logger.info(`
//     Ruta consultada: ${ctx.originalUrl}
//     Metodo ${ctx.method}`);
//   await next();
// })

// app.use(async (ctx, next) => {
//   logger.warn(`
//     Estado: 404
//     Ruta consultada: ${ctx.originalUrl}
//     Metodo ${ctx.method}`);

//   ctx.status = 404;
//   ctx.body = {
//     error: -2,
//     descripcion: `ruta ${ctx.originalUrl} metodo ${ctx.method} no implementada`,
//   };

//   await next();
// })

ioController.startChatServer(app, io) // Move this call here after MongoDB connection is established

app.listen(PORT, async () => {
  console.log('Servidor escuchando en el puerto ' + PORT)
  try {
    await mongoConnect.connect()
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`)
  }
})
