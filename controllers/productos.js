import ProductosRepository from '../persistence/Repositories/ProductosRepository.js'
const productosRepo = new ProductosRepository()

const admin = true

// GET api/productos
const get = async (ctx) => {
  const { id } = ctx.params
  if (id) {
    const product = await productosRepo.getById(id)

    product
      ? ((ctx.status = 200), (ctx.body = product))
      : ((ctx.status = 400), (ctx.body = { error: 'product not found' }))
  } else {
    const products = await productosRepo.getAll()
    ctx.status = 200
    ctx.body = products
  }
}

// POST api/productos
const post = async (ctx) => {
  if (admin) {
    const { body } = ctx.request
    console.log(body)
    const newProductId = await productosRepo.save(body)

    newProductId
      ? ((ctx.status = 200),
        (ctx.body = { success: 'product added with ID: ' + newProductId }))
      : ((ctx.status = 400),
        (ctx.body = {
          error: 'invalid key. Please verify the body content',
        }))
  } else {
    ctx.body = {
      error: -1,
      descripcion: 'ruta api/productos metodo post no autorizada',
    }
  }
}

// PUT api/productos/:id
const put = async (ctx) => {
  if (admin) {
    const { id } = ctx.params
    const { body } = ctx.request

    const wasUpdated = await productosRepo.updateById(id, body)

    wasUpdated
      ? ((ctx.status = 200), (ctx.body = { success: 'product updated' }))
      : ((ctx.status = 404), (ctx.body = { error: 'product not found' }))
  } else {
    ctx.body = {
      error: -1,
      descripcion: 'ruta api/productos metodo post no autorizada',
    }
  }
}

// DELETE /api/productos/:id
const deleteProduct = async (ctx) => {
  if (admin) {
    const { id } = ctx.params
    const wasDeleted = await productosRepo.deleteById(id)

    wasDeleted
      ? ((ctx.status = 200),
        (ctx.body = { success: 'product successfully removed' }))
      : ((ctx.status = 404), (ctx.body = { error: 'product not found' }))
  } else {
    ctx.body = {
      error: -1,
      descripcion: 'ruta api/productos metodo post no autorizada',
    }
  }
}

export default { get, post, put, deleteProduct }
