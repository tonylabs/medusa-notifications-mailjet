import { createWorkflow } from "@medusajs/framework/workflows-sdk"
import { sendNotificationsStep, useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { TemplateData, getTemplateName } from "../emails/customer-registered"

type WorkflowInput = {
  id: string
}

const getRecipientName = ({ first_name, last_name, email }: {
  first_name: string | null
  last_name: string | null
  email: string
}) => {
  const parts = [first_name, last_name]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is string => !!value)
  return parts.length ? parts.join(" ") : email
}

export const customerRegisteredNotificationWorkflow = createWorkflow(
  "customer-registered-notification",
  ({ id }: WorkflowInput) => {
    const { data: customers } = useQueryGraphStep({
      entity: "customer",
      fields: ["id", "email", "first_name", "last_name"],
      filters: {
        id,
      },
    })

    if (!customers.length) {
      return
    }

    const customer = customers[0]

    if (!customer.email) {
      return
    }

    const recipientName = getRecipientName({
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
    })
    
    const template = getTemplateName()

    sendNotificationsStep([
      {
        to: customer.email,
        channel: "email",
        template,
        data: {
          customer_id: customer.id,
          email: customer.email,
          first_name: customer.first_name,
          last_name: customer.last_name,
          to_name: recipientName,
        } satisfies TemplateData,
      },
    ])
  }
)
