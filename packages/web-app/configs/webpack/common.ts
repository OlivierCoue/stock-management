import { join } from 'path'

import { MySGWebpackConfig } from '@mysg/webpack-config'
import webpack from 'webpack'

const dirname = join(__dirname, '../..')
const nodeModulesDir = '../../node_modules'
export const rootNodeModules = join(dirname, nodeModulesDir)

export const webpackConfig = new MySGWebpackConfig({
  entry: ['./lib/index.js'],
  outDir: join(dirname, 'dist'),
  loaders: {
    fileLoaderType: 'file',
  },
  client: {
    htmlWebpackTemplateOptions: {
      title: 'Starter',
      meta: [
        {
          name: 'description',
          content: 'Starter description',
        },
      ],
      // favicon: join(dirname, 'public/assets/image/favicon.png'),
    },
  },
})

webpackConfig.updateBase({
  plugins: [new webpack.EnvironmentPlugin(['SERVER_URL', 'CLIENT_URL'])],
})
