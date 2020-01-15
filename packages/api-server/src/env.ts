import { ConnectionOptions } from 'tls'

import { Options as SMTPConnectionOptions } from 'nodemailer/lib/smtp-connection'
import { Options as MailOptions } from 'nodemailer/lib/mailer'

// TODO: better handling with type, move into config module

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

const SSLSettings: {
  POSTGRES_SSL?: ConnectionOptions
  ELASTICSEARCH_SSL?: ConnectionOptions
} = {
  POSTGRES_SSL: undefined,
  ELASTICSEARCH_SSL: undefined,
}

const common = {
  // TODO: No longer use 'isX' constants
  isLocal: false,
  isTest: false,
  isStaging: false,
  isLive: false,
  isDev: false,
  isProd: false,
  client: {
    protocol: process.env.CLIENT_PROTOCOL,
    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT,
    url: process.env.CLIENT_URL,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: (process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT)) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: SSLSettings.POSTGRES_SSL,
    schema: process.env.POSTGRES_SCHEMA,
  },
  elasticsearch: {
    host: process.env.ELASTICSEARCH_HOST,
    ssl: SSLSettings.ELASTICSEARCH_SSL,
  },
  server: {
    type: process.env.SERVER_TYPE,
    protocol: process.env.SERVER_PROTOCOL,
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: (process.env.SERVER_PORT && parseInt(process.env.SERVER_PORT)) || 3000,
    url: process.env.SERVER_URL,
  },
  email: {
    transports: [{ host: 'localhost', port: 587, secure: false, ignoreTLS: true }] as SMTPConnectionOptions[],
    defaults: { from: '"Starter Notifications" <noreply@mysg.fr>' } as MailOptions,
  },
  userSettings: {
    expiryDelay: {
      session: 14 * 24 * 60 * 60 * 1000, // 14 days
      passwordReset: 14 * 24 * 60 * 60 * 1000, // 14 days
    },
  },
  auth: {
    jwtSecretKey: 'changeThisPlease',
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
