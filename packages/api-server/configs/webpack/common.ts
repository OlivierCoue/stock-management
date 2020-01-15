import { join } from 'path'

import { MySGWebpackConfig } from '@mysg/webpack-config'
import WebpackFilterWarningsPlugin from 'webpack-filter-warnings-plugin'

const dirname = join(__dirname, '../..')
const nodeModulesDir = '../../node_modules'
export const rootNodeModules = join(dirname, nodeModulesDir)

export const webpackConfig = new MySGWebpackConfig({
  entry: ['./lib/main.js'],
  outDir: join(dirname, 'dist'),
  loaders: {
    fileLoaderType: 'raw',
  },
  plugins: {
    filesToCopy: [
      { from: join(dirname, 'package.json'), to: '.' },
      { from: join(dirname, '../../yarn.lock'), to: '.' },
    ],
  },
  server: {
    bundleDependencies: false,
    nodeModulesDir,
  },
})

webpackConfig.updateBase({
  // @ts-ignore Note: Rules[] is not needed there
  module: {
    exprContextCritical: false, // Silence warnings about non-used optional dynamic dependencies
  },
  plugins: [
    new WebpackFilterWarningsPlugin({
      exclude: [
        /**
         * Related to TypeORM
         * see https://github.com/typeorm/typeorm/blob/master/docs/faq.md#how-to-use-webpack-for-the-backend
         */
        /mongodb/,
        /mssql/,
        /mysql/,
        /mysql2/,
        /oracledb/,
        // /pg/,
        /pg-native/,
        /pg-query-stream/,
        /redis/,
        /sqlite3/,

        /**
         * Other optional dependencies from TypeORM
         */
        /react-native-sqlite-storage/,
        /sql.js/,
      ],
    }),
  ],
})
