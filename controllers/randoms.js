import { spawn } from 'child_process'

const randomsGet = async (ctx) => {
  await ctx.render(`objectRandomIN`)
}

const randomsPost = async (ctx) => {
  const { cantBucle } = ctx.request.body
  process.env.CANT_BUCLE = cantBucle

  const objectRandom = spawn(`./controllers/getObjectRandom`)
  objectRandom.stdout.on(`data`, (data) => {
    ctx.body = data.toString()
  })
}

export default { randomsGet, randomsPost }
