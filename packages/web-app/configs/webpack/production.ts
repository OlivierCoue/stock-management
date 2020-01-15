import { webpackConfig } from './common'

export default process.env.BUNDLE_ANALYSIS === 'true'
  ? webpackConfig.getClientProductionAnalysis()
  : webpackConfig.getClientProduction()
