import { env } from '../../../env'

import userCreatedTemplate from './user-created.html'
import verifyEmailTemplate from './verify-email.html'
import resetPasswordTemplate from './reset-password.html'

export const templates = {
  'user-created': {
    fileString: userCreatedTemplate,
    subject: '💥 Le plus dur est derrière vous !',
    refactor: (data: any) => ({
      link: `${env.client.url}/enable-account/${data.jwtToken}`,
      firstName: data.firstName,
    }),
  },
  'verify-email': {
    fileString: verifyEmailTemplate,
    subject: 'Changement de votre adresse e-mail... C’est par ici !',
    refactor: (data: any) => ({
      link: `${env.client.url}/${data.jwtToken}`,
      firstName: data.firstName,
    }),
  },
  'reset-password': {
    fileString: resetPasswordTemplate,
    subject: 'Changement de votre mot de passe... C’est par ici !',
    refactor: (data: any) => ({
      link: `${env.client.url}/reset-password/${data.jwtToken}`,
      firstName: data.firstName,
    }),
  },
}
