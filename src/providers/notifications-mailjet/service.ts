import { AbstractNotificationProviderService, MedusaError } from "@medusajs/framework/utils"
import { Attachment, Logger, ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from "@medusajs/framework/types"

// No template rendering in provider

import Mailjet, { Client as MailjetClient, SendEmailV3_1 } from "node-mailjet"

// Workflows provide email content; provider does not manage templates

type InjectedDependencies = {
  logger: Logger
}

// Removed template-related types; provider consumes pre-rendered content

type Options = {
  api_key: string
  api_secret: string
  from_email: string
  from_name?: string
  default_locale?: string
}

type ResolvedOptions = Omit<Options, "default_locale"> & {
  default_locale: string
}

class MailjetNotificationProviderService extends AbstractNotificationProviderService {

  static identifier = "notification-mailjet"
  protected logger: Logger
  protected options: ResolvedOptions
  protected client?: MailjetClient

  constructor({ logger }: InjectedDependencies, options: Options) {
    super()
    this.logger = logger
    this.options = {
      api_key: options.api_key,
      api_secret: options.api_secret,
      from_email: options.from_email,
      from_name: options.from_name,
      default_locale: options.default_locale ?? "en",
    }
  }

  static validateOptions(options: Options) {
    if (!options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Mailjet API key is required. You can get it from https://app.mailjet.com/account/apikeys`
      )
    }
    if (!options.api_secret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Mailjet secret key is required. You can get it from https://app.mailjet.com/account/apikeys`
      )
    }
    if (!options.from_email) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Mailjet from_email is required`
      )
    }
  }

  async send(notification: ProviderSendNotificationDTO): Promise<ProviderSendNotificationResultsDTO> {
    const client = this.initializeClient()
    const templateData = (notification.data ?? {}) as Record<string, unknown>
    const subjectCandidate = notification.content?.subject
    const subjectFromData = templateData["subject"]
    const subject =
      (typeof subjectCandidate === "string" && subjectCandidate.trim().length
        ? subjectCandidate.trim()
        : undefined) ??
      (typeof subjectFromData === "string" && subjectFromData.trim().length
        ? (subjectFromData as string).trim()
        : undefined)

    if (!subject) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Subject is required in notification.content.subject or data.subject"
      )
    }
    const htmlCandidate = notification.content?.html
    const html =
      typeof htmlCandidate === "string" && htmlCandidate.trim().length
        ? htmlCandidate
        : undefined

    try {
      const { attachments, inlineAttachments } = this.prepareAttachments(notification)
      const textPart = this.resolveTextContent(notification, templateData)
      const replyTo = this.resolveReplyTo(templateData)
      if (!html && !textPart) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Either HTML content or text content is required"
        )
      }
      const requestBody = {
        Messages: [
          {
            From: this.resolveFrom(notification),
            To: this.formatRecipients(notification, templateData),
            Subject: subject,
            HTMLPart: html,
            TextPart: textPart,
            Attachments: attachments.length ? attachments : undefined,
            InlinedAttachments: inlineAttachments.length ? inlineAttachments : undefined,
            ReplyTo: replyTo,
          },
        ],
      } satisfies SendEmailV3_1.Body

      const response = await client
        .post("send", { version: "v3.1" })
        .request<SendEmailV3_1.Response>(requestBody as Record<string, unknown>)
      const responseMessage = response?.body?.Messages?.[0]
      const responseId =
        responseMessage?.To?.[0]?.MessageUUID ??
        responseMessage?.To?.[0]?.MessageID?.toString()

      return {
        id: responseId,
      }
    } catch (e) {
      this.logger.error(
        `Mailjet: failed to send ${notification.template} to ${notification.to}`,
        e
      )

      const errorMessage =
        e instanceof Error ? e.message : typeof e === "string" ? e : JSON.stringify(e)

      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Error sending email with template ${notification.template}, to ${notification.to}: ${errorMessage}`
      )
    }
  }

  private initializeClient(): MailjetClient {
    if (this.client) {
      return this.client
    }
    this.client = Mailjet.apiConnect(this.options.api_key, this.options.api_secret)
    return this.client
  }

  private resolveFrom(notification: ProviderSendNotificationDTO): SendEmailV3_1.EmailAddressTo {
    const email = (notification.from ?? this.options.from_email).trim()
    return {
      Email: email,
      Name: this.options.from_name,
    }
  }

  private formatRecipients( notification: ProviderSendNotificationDTO, templateData: Record<string, unknown> ): SendEmailV3_1.EmailAddressTo[] {
    const email = (notification.to ?? "").trim()
    if (!email) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Recipient email address is required"
      )
    }

    const toNameCandidate = templateData["to_name"]
    const recipientName = typeof toNameCandidate === "string" ? toNameCandidate : undefined

    return [
      {
        Email: email,
        Name: recipientName,
      },
    ]
  }

  private resolveTextContent( notification: ProviderSendNotificationDTO, templateData: Record<string, unknown> ): string | undefined {
    if (notification.content?.text) {
      return notification.content.text
    }

    const textCandidate = templateData["text"]

    if (typeof textCandidate === "string") {
      return textCandidate
    }

    return undefined
  }

  private resolveReplyTo( templateData: Record<string, unknown> ): SendEmailV3_1.EmailAddressTo | undefined {
    const replyEmailCandidate = templateData["reply_to_email"]
    const replyNameCandidate = templateData["reply_to_name"]

    if (typeof replyEmailCandidate === "string" && replyEmailCandidate.trim().length) {
      return {
        Email: replyEmailCandidate.trim(),
        Name: typeof replyNameCandidate === "string" ? replyNameCandidate : undefined,
      }
    }

    return undefined
  }

  private prepareAttachments(notification: ProviderSendNotificationDTO): {
    attachments: SendEmailV3_1.Attachment[]
    inlineAttachments: SendEmailV3_1.InlinedAttachment[]
  } {
    const attachments = (notification.attachments ?? []) as Attachment[]

    const mapAttachment = (att: Attachment): SendEmailV3_1.Attachment => ({
      Filename: att.filename,
      ContentType: att.content_type ?? "application/octet-stream",
      Base64Content: att.content,
    })

    const regular: SendEmailV3_1.Attachment[] = []
    const inline: SendEmailV3_1.InlinedAttachment[] = []

    for (const attachment of attachments) {
      if (attachment?.disposition === "inline") {
        inline.push({
          ...mapAttachment(attachment),
          ContentID: attachment.id,
        })
        continue
      }

      regular.push(mapAttachment(attachment))
    }

    return {
      attachments: regular,
      inlineAttachments: inline,
    }
  }
}

export default MailjetNotificationProviderService
