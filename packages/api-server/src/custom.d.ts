/* eslint-disable @typescript-eslint/interface-name-prefix */
import '@mysg/typescript-config/lib/custom'

import { UserEntity } from './entities'

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
