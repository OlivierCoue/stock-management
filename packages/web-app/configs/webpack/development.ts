import { join } from 'path'

import express from 'express'
import WebpackDevServer from 'webpack-dev-server'

import { rootNodeModules, webpackConfig } from './common'

webpackConfig.updateBase(
  {
    resolve: {
      alias: {
        '@material-ui/core': join(rootNodeModules, '@material-ui/core'),
        '@material-ui/icons': join(rootNodeModules, '@material-ui/icons'),
        '@material-ui/styles': join(rootNodeModules, '@material-ui/styles'),
        '@mysg/helper': join(rootNodeModules, '@mysg/helper'),
        '@mysg/react-common': join(rootNodeModules, '@mysg/react-common'),
        'class-validator': join(rootNodeModules, 'class-validator'),
        react: join(rootNodeModules, 'react'),
        'react-dom': join(rootNodeModules, 'react-dom'),
        'styled-components': join(rootNodeModules, 'styled-components'),
      },
    },
    devServer: {
      before: (app: express.Application, server: WebpackDevServer) => {
        // Serve uploaded files
        app.use('/fs', express.static(join(process.cwd(), '..', 'api-server', 'local', 'uploads')))
        // Cache all the uploads for 1year
        app.use('/fs', (req, res, next) => {
          res.header('Cache-Control', 'max-age=31536000')
          next()
        })
      },
    },
  },
  true
)

export default webpackConfig.getClientDevelopment()
