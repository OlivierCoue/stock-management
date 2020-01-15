import { CustomException } from './exception'

// TODO: Add logger service
export function customExceptionHandler(err: CustomException): CustomException {
  console.error(err)

  switch (process.env.NODE_ENV) {
    case 'development': {
      break
    }
    default: {
      if (err.stack) delete err.stack
      break
    }
  }

  return err
}
