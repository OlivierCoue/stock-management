/* eslint-disable import/no-default-export */
import { getMySGBabelConfig } from '@mysg/babel-config'

export default function(api) {
  const base = getMySGBabelConfig(api)

  return {
    ...base,
    ...{
      // Custom options
    },
  }
}
