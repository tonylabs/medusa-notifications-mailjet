import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { customerRegisteredNotificationWorkflow } from "../workflows/customer-registered-notification"

export default async function customerRegisteredSubscriber({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await customerRegisteredNotificationWorkflow(container).run({
    input: data,
  })
}

export const config: SubscriberConfig = {
  event: "customer.registered",
}
