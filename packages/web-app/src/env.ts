/*
 * |====================================================================================================================
 * | Env
 * |====================================================================================================================
 */

/*
 * |--------------------------------------------------------------------------------------------------------------------
 * | Common
 * |--------------------------------------------------------------------------------------------------------------------
 * |
 * | Mostly inherited from dotenv (.env) that should be preloaded, could be overridden by the CLI or the machine.
 * | See dotenv documentation for more context on this.
 * |
 */

const common = {
  isLocal: false,
  isTest: false,
  isStaging: false,
  isLive: false,
  isDev: false,
  isProd: false,
  server: {
    url: process.env.SERVER_URL,
    maxUploadSize: 100000000,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
}

export const env = Object.assign({}, common)

/*
 * |--------------------------------------------------------------------------------------------------------------------
 * | App Env
 * |--------------------------------------------------------------------------------------------------------------------
 */

switch (process.env.APP_ENV) {
  case 'local': {
    Object.assign(env, {
      isLocal: true,
    })
    break
  }
  case 'test': {
    Object.assign(env, {
      isTest: true,
    })
    break
  }
  case 'staging': {
    Object.assign(env, {
      isStaging: true,
    })
    break
  }
  // live
  default: {
    Object.assign(env, {
      isLive: true,
    })
    break
  }
}

/*
 * |--------------------------------------------------------------------------------------------------------------------
 * | Node Env
 * |--------------------------------------------------------------------------------------------------------------------
 */

switch (process.env.NODE_ENV) {
  case 'development': {
    Object.assign(env, {
      isDev: true,
    })
    break
  }
  // production
  default: {
    Object.assign(env, {
      isProd: true,
    })
    break
  }
}
