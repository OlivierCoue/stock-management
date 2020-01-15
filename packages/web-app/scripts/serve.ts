import express from 'express'
import compression from 'compression'

const serveDir = `dist`

/**
 * Express setup
 */
const app = express()

/**
 * Main router
 */
const router = express.Router()

router.use(compression())
router.use(express.static(serveDir))
router.use((req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile('index.html', { root: serveDir })
  } else {
    next()
  }
})
app.use('/', router)

/**
 * Server listening
 */
const server = app.listen(9000, () => {
  console.log(`Server available at: http://localhost:9000/`)
})

// Add a SIGINT handler to stop the server
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server is now closed.')
  })
})
