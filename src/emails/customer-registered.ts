import * as React from "react"
import { Body, Container, Head, Html, Preview, Text } from "@react-email/components"

export type TemplateData = {
  customer_id: string
  email: string
  first_name?: string | null
  last_name?: string | null
  to_name: string
  preview_text?: string
  intro?: string
  body?: string
  signature?: string
  subject?: string
}

export const getTemplateName = () => "customer_registered"

export const resolveCustomerRegisteredSubject = (data?: TemplateData) => {
  const subjectFromData = typeof data?.subject === "string" ? data.subject.trim() : ""
  if (subjectFromData) {
    return subjectFromData
  }
  return process.env.MJ_CUSTOMER_REGISTERED_SUBJECT || "Welcome to Cyber Maker"
}

export const buildCustomerRegisteredTemplate = (data: TemplateData) => {
  const greetingName = data.to_name || "there"
  const greeting =
    data.intro ||
    `Hi ${greetingName}, thanks for creating a ${process.env.MJ_STORE_NAME || "Cyber Maker"} account.`
  const body =
    data.body ||
    "You're all set to start shopping. If you have any questions, just reply to this email and our team will help."
  const signature =
    data.signature || `Cheers,<br />${process.env.MJ_STORE_NAME || "The Cyber Maker Team"}`
  const preview =
    data.preview_text ||
    process.env.MJ_CUSTOMER_REGISTERED_PREVIEW ||
    "Thanks for registering with Cyber Maker."

  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(Preview, null, preview),
    React.createElement(
      Body,
      {
        style: {
          backgroundColor: "#f7fafc",
          fontFamily: "Inter, Arial, sans-serif",
        },
      },
      React.createElement(
        Container,
        {
          style: {
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          },
        },
        React.createElement(
          Text,
          {
            style: {
              fontSize: "18px",
              lineHeight: "26px",
              marginBottom: "16px",
              color: "#1a202c",
            },
          },
          greeting
        ),
        React.createElement(
          Text,
          {
            style: {
              fontSize: "16px",
              lineHeight: "24px",
              marginBottom: "16px",
              color: "#4a5568",
            },
          },
          body
        ),
        React.createElement(Text, {
          style: {
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "0",
            color: "#4a5568",
          },
          dangerouslySetInnerHTML: { __html: signature },
        })
      )
    )
  )
}

export const getCustomerRegisteredTemplateConfig = () => {
  const templateName = getTemplateName()
  return {
    name: templateName,
    config: {
      subject: (_locale: string, templateData?: TemplateData) =>
        resolveCustomerRegisteredSubject(templateData),
      template: (templateData: TemplateData) => buildCustomerRegisteredTemplate(templateData),
    },
  }
}
