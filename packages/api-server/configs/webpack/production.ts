/* eslint-disable import/no-default-export */
import { webpackConfig } from './common'

export default process.env.BUNDLE_ANALYSIS === 'true'
  ? webpackConfig.getServerProductionAnalysis()
  : webpackConfig.getServerProduction()
