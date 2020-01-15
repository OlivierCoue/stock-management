/* eslint-disable import/no-default-export */
import { join } from 'path'

import { rootNodeModules, webpackConfig } from './common'

webpackConfig.updateBase(
  {
    resolve: {
      alias: {
        '@mysg/helper': join(rootNodeModules, '@mysg/helper'),
        '@mysg/nest-common': join(rootNodeModules, '@mysg/nest-common'),
        '@nestjs/typeorm': join(rootNodeModules, '@nestjs/typeorm'),
        'class-validator': join(rootNodeModules, 'class-validator'),
        typeorm: join(rootNodeModules, 'typeorm'),
      },
    },
  },
  true
)

export default webpackConfig.getServerDevelopment()
