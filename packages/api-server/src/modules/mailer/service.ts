import hogan from 'hogan.js'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { createTransport, SentMessageInfo, Transporter as NodemailerTransporter } from 'nodemailer'
import { Options as MailOptions } from 'nodemailer/lib/mailer'
import { Omit } from 'utility-types'

import { env } from '../../env'

import { templates } from './templates'

@Injectable()
export class MailerService implements OnModuleInit {
  private transporters: NodemailerTransporter[] = []
  private transporter: NodemailerTransporter // FIXME

  onModuleInit(): void {
    if (!env.email) throw new Error('[Mailer] Email configuration not found')

    const { transports, defaults } = env.email
    if (!transports || !Array.isArray(transports) || transports.length === 0) {
      throw new Error('[Mailer] Invalid transports configuration')
    }

    const { transporters } = this
    for (const transport of transports) {
      transporters.push(createTransport(transport, defaults))
    }
    this.transporter = transporters[0] // FIXME
  }

  // TODO: replace hogan.js & refactor how template works
  sendTemplateMail(templateOptions: ISendTemplateMail, options: TSendTemplateMailOptions): Promise<SentMessageInfo> {
    const { key, data } = templateOptions

    const template = templates[key]
    if (!template) throw new Error(`[Mailer] Template not found for key: ${key}`)

    const templateData = template.refactor(data || {})

    return this.sendMail({
      ...options,
      subject: template.subject,
      html: hogan.compile(template.fileString).render(templateData),
    })
  }

  sendMail(options: MailOptions): Promise<SentMessageInfo> {
    const { transporter } = this
    if (!transporter) throw new Error(`[Mailer] Transporter is not initialized`)

    return transporter.sendMail(options)
  }
}

interface ISendTemplateMail {
  key: keyof typeof templates
  data?: object
}

type TSendTemplateMailOptions = Omit<MailOptions, 'subject' | 'html'>
