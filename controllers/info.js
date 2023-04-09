import os from 'os'

const info = async (ctx) => {
  const data = {
    directorioActual: process.cwd(),
    idProceso: process.pid,
    vNode: process.version,
    rutaEjecutable: process.execPath,
    sistemaOperativo: process.platform,
    cantProcesadores: os.cpus().length,
    memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
  }

  await ctx.render('info', data)
}

export default { info }
