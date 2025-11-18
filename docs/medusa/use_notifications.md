# How to Use Notification Module

In this document, youâ€™ll learn about the different methods in the Notification Module's service and how to use them.

***

## Resolve Notification Module's Service

In your workflow's step, you can resolve the Notification Module's service from the Medusa container:

```ts
import { Modules } from "@medusajs/framework/utils"
import { createStep } from "@medusajs/framework/workflows-sdk"

const step1 = createStep(
  "step-1",
  async ({}, { container }) => {
    const notificationModuleService = container.resolve(
      Modules.NOTIFICATION
    )
    
    // TODO use notificationModuleService
  } 
)
```

You can then use the Notification Module's service's methods in the step. The rest of this guide details these methods.

***

## createNotifications

### createNotifications(data, sharedContext?): Promise\<[NotificationDTO](https://docs.medusajs.com/var/task/www/apps/resources/references/types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO)\[]>

This method is used to send multiple notifications and store them in the database.

#### Example

```ts
const notifications = await notificationModuleService.createNotifications([
  {
    to: "john@doe.me",
    template: "order-confirmation",
    channel: "email",
  },
  {
    to: "+38975123456",
    template: "order-confirmation",
    channel: "sms",
  },
])
```

#### Parameters

- data: (\[CreateNotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.CreateNotificationDTO/page.mdx)\[]) The notifications to be sent.

    - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

    - channel: (\`string\`) The channel through which the notification is sent, such as \`email\` or \`sms\`.

    - template: (\`null\` \\| \`string\`) The template name in the provider's system.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

    - content: (\`null\` \\| \[NotificationContent]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationContent/page.mdx)) The content that gets passed over to the provider.

        - subject: (\`string\`) the subject of the notification

        - text: (\`string\`) the text content of the notification

        - html: (\`string\`) the html content of the notification

    - trigger\_type: (\`null\` \\| \`string\`) The event name, the workflow, or anything else that can help to identify what triggered the notification.

    - resource\_id: (\`null\` \\| \`string\`) The ID of the resource this notification is for, if applicable. Useful for displaying relevant information in the UI.
      For example, the ID of the order if the notification is related to an order update.

    - resource\_type: (\`null\` \\| \`string\`) The type of the resource this notification is for, if applicable. For example, \`order\` if it's related to an order update.

    - receiver\_id: (\`null\` \\| \`string\`) The ID of the customer this notification is for, if applicable.

    - original\_notification\_id: (\`null\` \\| \`string\`) The original notification, in case this is a resent notification.

    - idempotency\_key: (\`null\` \\| \`string\`) An idempotency key that ensures the same notification is not sent multiple times.

    - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

        - content: (\`string\`) The content of the attachment, encoded as a binary string.

        - filename: (\`string\`) The filename of the attachment.

        - content\_type: (\`string\`) The MIME type of the attachment.

        - disposition: (\`string\`) The disposition of the attachment, For example, "inline" or "attachment".

        - id: (\`string\`) The ID, if the attachment is meant to be referenced within the body of the message.
- sharedContext: (\[Context]\(../../../types/interfaces/types.Context/page.mdx)) A context used to share resources, such as transaction manager, between the application and the module.

    - transactionManager: (TManager) An instance of a transaction manager of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`transactionManager\`.

    - manager: (TManager) An instance of a manager, typically an entity manager, of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`manager\`.

    - isolationLevel: (\`string\`) A string indicating the isolation level of the context. Possible values are \`READ UNCOMMITTED\`, \`READ COMMITTED\`, \`REPEATABLE READ\`, or \`SERIALIZABLE\`.

    - enableNestedTransactions: (\`boolean\`) A boolean value indicating whether nested transactions are enabled.

    - eventGroupId: (\`string\`) A string indicating the ID of the group to aggregate the events to be emitted at a later point.

    - transactionId: (\`string\`) A string indicating the ID of the current transaction.

    - runId: (\`string\`) A string indicating the ID of the current run.

    - messageAggregator: (\[IMessageAggregator]\(../../../types/interfaces/types.IMessageAggregator/page.mdx)) An instance of a message aggregator, which is used to aggregate messages to be emitted at a later point.

    - requestId: (\`string\`) A string indicating the ID of the current request.

    - idempotencyKey: (\`string\`) A string indicating the idempotencyKey of the current workflow execution.

    - parentStepIdempotencyKey: (\`string\`) A string indicating the idempotencyKey of the parent workflow execution.

    - preventReleaseEvents: (\`boolean\`) preventReleaseEvents

    - isCancelling: (\`boolean\`) A boolean value indicating whether the current workflow execution is being cancelled.

    - cancelingFromParentStep: (\`boolean\`) Weither or not a sub workflow cancellation is being triggered from a parent step.
      If true, the parent step will not be triggered by the sub workflow.

#### Returns

- Promise: (Promise\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\[]\&#62;) The list of sent notifications.

    - NotificationDTO\[]: (\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\[])

        - id: (\`string\`) The ID of the notification.

        - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

        - channel: (\`string\`) The channel through which the notification is sent, such as 'email' or 'sms'

        - template: (\`string\`) The template name in the provider's system.

        - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

        - provider\_id: (\`string\`) The ID of the notification provider.

        - provider: (\[NotificationProviderDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationProviderDTO/page.mdx)) Information about the notification provider

            - id: (\`string\`) The ID of the notification provider.

            - handle: (\`string\`) The handle of the notification provider.

            - name: (\`string\`) A user-friendly name of the notification provider.

            - channels: (\`string\`\[]) The supported channels by the notification provider.

        - created\_at: (\`Date\`) The date and time the notification was created.

        - status: (\`"pending"\` \\| \`"success"\` \\| \`"failure"\`) The status of the notification

        - from: (\`null\` \\| \`string\`) The sender of the notification. It can be email, phone number, or username, depending on the channel.

        - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

            - content: (\`string\`) The content of the attachment, encoded as a binary string.

            - filename: (\`string\`) The filename of the attachment.

            - content\_type: (\`string\`) The MIME type of the attachment.

            - disposition: (\`string\`) The disposition of the attachment, For example, "inline" or "attachment".

            - id: (\`string\`) The ID, if the attachment is meant to be referenced within the body of the message.

        - trigger\_type: (\`null\` \\| \`string\`) The event name, the workflow, or anything else that can help to identify what triggered the notification.

        - resource\_id: (\`null\` \\| \`string\`) The ID of the resource this notification is for, if applicable. Useful for displaying relevant information in the UI

        - resource\_type: (\`null\` \\| \`string\`) The type of the resource this notification is for, if applicable, eg. "order"

        - receiver\_id: (\`null\` \\| \`string\`) The ID of the customer this notification is for, if applicable.

        - original\_notification\_id: (\`null\` \\| \`string\`) The original notification, in case this is a retried notification.

        - external\_id: (\`null\` \\| \`string\`) The id of the notification in the external system, if applicable

### createNotifications(data, sharedContext?): Promise\<[NotificationDTO](https://docs.medusajs.com/var/task/www/apps/resources/references/types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO)>

This method is used to send a notification, and store the request in the database.

#### Example

```ts
const notification = await notificationModuleService.createNotifications({
  to: "john@doe.me",
  template: "order-confirmation",
  channel: "email",
})
```

#### Parameters

- data: (\[CreateNotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.CreateNotificationDTO/page.mdx)) The notification to be sent.

    - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

    - channel: (\`string\`) The channel through which the notification is sent, such as \`email\` or \`sms\`.

    - template: (\`null\` \\| \`string\`) The template name in the provider's system.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

    - content: (\`null\` \\| \[NotificationContent]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationContent/page.mdx)) The content that gets passed over to the provider.

        - subject: (\`string\`) the subject of the notification

        - text: (\`string\`) the text content of the notification

        - html: (\`string\`) the html content of the notification

    - trigger\_type: (\`null\` \\| \`string\`) The event name, the workflow, or anything else that can help to identify what triggered the notification.

    - resource\_id: (\`null\` \\| \`string\`) The ID of the resource this notification is for, if applicable. Useful for displaying relevant information in the UI.
      For example, the ID of the order if the notification is related to an order update.

    - resource\_type: (\`null\` \\| \`string\`) The type of the resource this notification is for, if applicable. For example, \`order\` if it's related to an order update.

    - receiver\_id: (\`null\` \\| \`string\`) The ID of the customer this notification is for, if applicable.

    - original\_notification\_id: (\`null\` \\| \`string\`) The original notification, in case this is a resent notification.

    - idempotency\_key: (\`null\` \\| \`string\`) An idempotency key that ensures the same notification is not sent multiple times.

    - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

        - content: (\`string\`) The content of the attachment, encoded as a binary string.

        - filename: (\`string\`) The filename of the attachment.

        - content\_type: (\`string\`) The MIME type of the attachment.

        - disposition: (\`string\`) The disposition of the attachment, For example, "inline" or "attachment".

        - id: (\`string\`) The ID, if the attachment is meant to be referenced within the body of the message.
- sharedContext: (\[Context]\(../../../types/interfaces/types.Context/page.mdx)) A context used to share resources, such as transaction manager, between the application and the module.

    - transactionManager: (TManager) An instance of a transaction manager of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`transactionManager\`.

    - manager: (TManager) An instance of a manager, typically an entity manager, of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`manager\`.

    - isolationLevel: (\`string\`) A string indicating the isolation level of the context. Possible values are \`READ UNCOMMITTED\`, \`READ COMMITTED\`, \`REPEATABLE READ\`, or \`SERIALIZABLE\`.

    - enableNestedTransactions: (\`boolean\`) A boolean value indicating whether nested transactions are enabled.

    - eventGroupId: (\`string\`) A string indicating the ID of the group to aggregate the events to be emitted at a later point.

    - transactionId: (\`string\`) A string indicating the ID of the current transaction.

    - runId: (\`string\`) A string indicating the ID of the current run.

    - messageAggregator: (\[IMessageAggregator]\(../../../types/interfaces/types.IMessageAggregator/page.mdx)) An instance of a message aggregator, which is used to aggregate messages to be emitted at a later point.

    - requestId: (\`string\`) A string indicating the ID of the current request.

    - idempotencyKey: (\`string\`) A string indicating the idempotencyKey of the current workflow execution.

    - parentStepIdempotencyKey: (\`string\`) A string indicating the idempotencyKey of the parent workflow execution.

    - preventReleaseEvents: (\`boolean\`) preventReleaseEvents

    - isCancelling: (\`boolean\`) A boolean value indicating whether the current workflow execution is being cancelled.

    - cancelingFromParentStep: (\`boolean\`) Weither or not a sub workflow cancellation is being triggered from a parent step.
      If true, the parent step will not be triggered by the sub workflow.

#### Returns

- Promise: (Promise\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\&#62;) The sent notification.

    - id: (\`string\`) The ID of the notification.

    - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

    - channel: (\`string\`) The channel through which the notification is sent, such as 'email' or 'sms'

    - template: (\`string\`) The template name in the provider's system.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

    - provider\_id: (\`string\`) The ID of the notification provider.

    - provider: (\[NotificationProviderDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationProviderDTO/page.mdx)) Information about the notification provider

        - id: (\`string\`) The ID of the notification provider.

        - handle: (\`string\`) The handle of the notification provider.

        - name: (\`string\`) A user-friendly name of the notification provider.

        - channels: (\`string\`\[]) The supported channels by the notification provider.

    - created\_at: (\`Date\`) The date and time the notification was created.

    - status: (\`"pending"\` \\| \`"success"\` \\| \`"failure"\`) The status of the notification

    - from: (\`null\` \\| \`string\`) The sender of the notification. It can be email, phone number, or username, depending on the channel.

    - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

        - content: (\`string\`) The content of the attachment, encoded as a binary string.

        - filename: (\`string\`) The filename of the attachment.

        - content\_type: (\`string\`) The MIME type of the attachment.

        - disposition: (\`string\`) The disposition of the attachment, For example, "inline" or "attachment".

        - id: (\`string\`) The ID, if the attachment is meant to be referenced within the body of the message.

    - trigger\_type: (\`null\` \\| \`string\`) The event name, the workflow, or anything else that can help to identify what triggered the notification.

    - resource\_id: (\`null\` \\| \`string\`) The ID of the resource this notification is for, if applicable. Useful for displaying relevant information in the UI

    - resource\_type: (\`null\` \\| \`string\`) The type of the resource this notification is for, if applicable, eg. "order"

    - receiver\_id: (\`null\` \\| \`string\`) The ID of the customer this notification is for, if applicable.

    - original\_notification\_id: (\`null\` \\| \`string\`) The original notification, in case this is a retried notification.

    - external\_id: (\`null\` \\| \`string\`) The id of the notification in the external system, if applicable

***

## listAndCountNotifications

This method is used to retrieve a paginated list of notifications along with the total count of available notifications satisfying the provided filters.

### Example

To retrieve a list of notifications using their IDs:

```ts
const [notifications, count] =
  await notificationModuleService.listAndCountNotifications({
    id: ["noti_123", "noti_321"],
  })
```

To specify relations that should be retrieved within the notifications:

:::note

You can only retrieve data models defined in the same module. To retrieve linked data models
from other modules, use [Query](https://docs.medusajs.com/learn/fundamentals/module-links/query) instead.

:::

```ts
const [notifications, count] =
  await notificationModuleService.listAndCountNotifications(
    {
      id: ["noti_123", "noti_321"],
    },
    {
      relations: ["provider"],
    }
  )
```

By default, only the first `15` records are retrieved. You can control pagination by specifying the `skip` and `take` properties of the `config` parameter:

```ts
const [notifications, count] =
  await notificationModuleService.listAndCountNotifications(
    {
      id: ["noti_123", "noti_321"],
    },
    {
      relations: ["provider"],
      take: 20,
      skip: 2,
    }
  )
```

### Parameters

- filters: (\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)) The filters to apply on the retrieved notifications.

    - $and: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

        - $and: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

        - $or: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

        - q: (\`string\`) Search through the notifications' attributes, such as trigger types and recipients, using this search term.

        - to: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the recipient of the notification.

        - channel: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the channel through which the notification is sent, such as 'email' or 'sms'

        - template: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the template name.

        - trigger\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the trigger type.

        - resource\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the resource that was the trigger for the notification.

        - resource\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) T\* Filter based on the resource type that was the trigger for the notification.

        - receiver\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the customer ID.

        - created\_at: (\[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filters a notification based on when it was sent and created in the database

    - $or: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

        - $and: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

        - $or: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

        - q: (\`string\`) Search through the notifications' attributes, such as trigger types and recipients, using this search term.

        - to: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the recipient of the notification.

        - channel: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the channel through which the notification is sent, such as 'email' or 'sms'

        - template: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the template name.

        - trigger\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the trigger type.

        - resource\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the resource that was the trigger for the notification.

        - resource\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) T\* Filter based on the resource type that was the trigger for the notification.

        - receiver\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the customer ID.

        - created\_at: (\[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filters a notification based on when it was sent and created in the database

    - q: (\`string\`) Search through the notifications' attributes, such as trigger types and recipients, using this search term.

    - to: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the recipient of the notification.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - channel: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the channel through which the notification is sent, such as 'email' or 'sms'

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - template: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the template name.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - trigger\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the trigger type.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - resource\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the resource that was the trigger for the notification.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - resource\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) T\* Filter based on the resource type that was the trigger for the notification.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - receiver\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the customer ID.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - created\_at: (\[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filters a notification based on when it was sent and created in the database

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)
- config: (\[FindConfig]\(../../../medusa/interfaces/medusa.FindConfig/page.mdx)\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\&#62;) The configurations determining how the notifications are retrieved. Its properties, such as \`select\` or \`relations\`, accept the
  attributes or relations associated with a notification.

    - select: ((keyof Entity \\| \`string\` & \`object\`)\[]) An array of strings, each being attribute names of the entity to retrieve in the result.

    - skip: (\`null\` \\| \`number\`) A number indicating the number of records to skip before retrieving the results.

    - take: (\`null\` \\| \`number\`) A number indicating the number of records to return in the result.

    - relations: (\`string\`\[]) An array of strings, each being relation names of the entity to retrieve in the result.

      You can only retrieve data models defined in the same module. To retrieve linked data models
      from other modules, use \[Query]\(https://docs.medusajs.com/learn/fundamentals/module-links/query) instead.

    - order: (\[FindConfigOrder]\(../../../medusa/types/medusa.FindConfigOrder/page.mdx)) An object used to specify how to sort the returned records. Its keys are the names of attributes of the entity, and a key's value can either be \`ASC\`
      to sort retrieved records in an ascending order, or \`DESC\` to sort retrieved records in a descending order.

    - withDeleted: (\`boolean\`) A boolean indicating whether deleted records should also be retrieved as part of the result. This only works if the entity extends the
      \`SoftDeletableEntity\` class.

    - filters: (\`Record\<string, any>\`) Enable ORM specific defined filters

    - options: (\`Record\<string, any>\`) Enable ORM specific defined options
- sharedContext: (\[Context]\(../../../types/interfaces/types.Context/page.mdx)) A context used to share resources, such as transaction manager, between the application and the module.

    - transactionManager: (TManager) An instance of a transaction manager of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`transactionManager\`.

    - manager: (TManager) An instance of a manager, typically an entity manager, of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`manager\`.

    - isolationLevel: (\`string\`) A string indicating the isolation level of the context. Possible values are \`READ UNCOMMITTED\`, \`READ COMMITTED\`, \`REPEATABLE READ\`, or \`SERIALIZABLE\`.

    - enableNestedTransactions: (\`boolean\`) A boolean value indicating whether nested transactions are enabled.

    - eventGroupId: (\`string\`) A string indicating the ID of the group to aggregate the events to be emitted at a later point.

    - transactionId: (\`string\`) A string indicating the ID of the current transaction.

    - runId: (\`string\`) A string indicating the ID of the current run.

    - messageAggregator: (\[IMessageAggregator]\(../../../types/interfaces/types.IMessageAggregator/page.mdx)) An instance of a message aggregator, which is used to aggregate messages to be emitted at a later point.

    - requestId: (\`string\`) A string indicating the ID of the current request.

    - idempotencyKey: (\`string\`) A string indicating the idempotencyKey of the current workflow execution.

    - parentStepIdempotencyKey: (\`string\`) A string indicating the idempotencyKey of the parent workflow execution.

    - preventReleaseEvents: (\`boolean\`) preventReleaseEvents

    - isCancelling: (\`boolean\`) A boolean value indicating whether the current workflow execution is being cancelled.

    - cancelingFromParentStep: (\`boolean\`) Weither or not a sub workflow cancellation is being triggered from a parent step.
      If true, the parent step will not be triggered by the sub workflow.

### Returns

- Promise: (Promise\&#60;\[\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\[], number]\&#62;) The list of notifications along with the total count.

    - NotificationDTO\[]: (\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\[])

    - number: (\`number\`)

***

## listNotifications

This method is used to retrieve a paginated list of notifications based on optional filters and configuration.

### Example

To retrieve a list of notifications using their IDs:

```ts
const notifications = await notificationModuleService.listNotifications({
  id: ["noti_123", "noti_321"],
})
```

To specify relations that should be retrieved within the notifications:

:::note

You can only retrieve data models defined in the same module. To retrieve linked data models
from other modules, use [Query](https://docs.medusajs.com/learn/fundamentals/module-links/query) instead.

:::

```ts
const notifications = await notificationModuleService.listNotifications(
  {
    id: ["noti_123", "noti_321"],
  },
  {
    relations: ["provider"],
  }
)
```

By default, only the first `15` records are retrieved. You can control pagination by specifying the `skip` and `take` properties of the `config` parameter:

```ts
const notifications = await notificationModuleService.listNotifications(
  {
    id: ["noti_123", "noti_321"],
  },
  {
    relations: ["provider"],
    take: 20,
    skip: 2,
  }
)
```

### Parameters

- filters: (\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)) The filters to apply on the retrieved notifications.

    - $and: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

        - $and: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

        - $or: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

        - q: (\`string\`) Search through the notifications' attributes, such as trigger types and recipients, using this search term.

        - to: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the recipient of the notification.

        - channel: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the channel through which the notification is sent, such as 'email' or 'sms'

        - template: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the template name.

        - trigger\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the trigger type.

        - resource\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the resource that was the trigger for the notification.

        - resource\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) T\* Filter based on the resource type that was the trigger for the notification.

        - receiver\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the customer ID.

        - created\_at: (\[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filters a notification based on when it was sent and created in the database

    - $or: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

        - $and: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "and" condition.

        - $or: ((\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx) \\| \[BaseFilterable]\(../../../types/DAL/interfaces/types.DAL.BaseFilterable/page.mdx)\&#60;\[FilterableNotificationProps]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.FilterableNotificationProps/page.mdx)\&#62;)\[]) An array of filters to apply on the entity, where each item in the array is joined with an "or" condition.

        - q: (\`string\`) Search through the notifications' attributes, such as trigger types and recipients, using this search term.

        - to: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the recipient of the notification.

        - channel: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the channel through which the notification is sent, such as 'email' or 'sms'

        - template: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the template name.

        - trigger\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the trigger type.

        - resource\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the resource that was the trigger for the notification.

        - resource\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) T\* Filter based on the resource type that was the trigger for the notification.

        - receiver\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the customer ID.

        - created\_at: (\[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filters a notification based on when it was sent and created in the database

    - q: (\`string\`) Search through the notifications' attributes, such as trigger types and recipients, using this search term.

    - to: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the recipient of the notification.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - channel: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the channel through which the notification is sent, such as 'email' or 'sms'

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - template: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the template name.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - trigger\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the trigger type.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - resource\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the resource that was the trigger for the notification.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - resource\_type: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) T\* Filter based on the resource type that was the trigger for the notification.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - receiver\_id: (\`string\` \\| \`string\`\[] \\| \[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string \\| string\[]\&#62;) Filter based on the customer ID.

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)

    - created\_at: (\[OperatorMap]\(../../../types/DAL/types/types.DAL.OperatorMap/page.mdx)\&#60;string\&#62;) Filters a notification based on when it was sent and created in the database

        - $and: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $or: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;\[])

        - $eq: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62; \\| \[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $ne: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $in: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $nin: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;\[])

        - $not: (\[Query]\(../../../types/types/types.Query/page.mdx)\&#60;T\&#62;) API wrapper around the remoteQuery

        - $gt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $gte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lt: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $lte: (\[ExpandScalar]\(../../../types/types/types.ExpandScalar/page.mdx)\&#60;T\&#62;)

        - $like: (\`string\`)

        - $re: (\`string\`)

        - $ilike: (\`string\`)

        - $fulltext: (\`string\`)

        - $overlap: (\`string\`\[])

        - $contains: (\`string\`\[])

        - $contained: (\`string\`\[])

        - $exists: (\`boolean\`)
- config: (\[FindConfig]\(../../../medusa/interfaces/medusa.FindConfig/page.mdx)\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\&#62;) The configurations determining how the notifications are retrieved. Its properties, such as \`select\` or \`relations\`, accept the
  attributes or relations associated with a notification.

    - select: ((keyof Entity \\| \`string\` & \`object\`)\[]) An array of strings, each being attribute names of the entity to retrieve in the result.

    - skip: (\`null\` \\| \`number\`) A number indicating the number of records to skip before retrieving the results.

    - take: (\`null\` \\| \`number\`) A number indicating the number of records to return in the result.

    - relations: (\`string\`\[]) An array of strings, each being relation names of the entity to retrieve in the result.

      You can only retrieve data models defined in the same module. To retrieve linked data models
      from other modules, use \[Query]\(https://docs.medusajs.com/learn/fundamentals/module-links/query) instead.

    - order: (\[FindConfigOrder]\(../../../medusa/types/medusa.FindConfigOrder/page.mdx)) An object used to specify how to sort the returned records. Its keys are the names of attributes of the entity, and a key's value can either be \`ASC\`
      to sort retrieved records in an ascending order, or \`DESC\` to sort retrieved records in a descending order.

    - withDeleted: (\`boolean\`) A boolean indicating whether deleted records should also be retrieved as part of the result. This only works if the entity extends the
      \`SoftDeletableEntity\` class.

    - filters: (\`Record\<string, any>\`) Enable ORM specific defined filters

    - options: (\`Record\<string, any>\`) Enable ORM specific defined options
- sharedContext: (\[Context]\(../../../types/interfaces/types.Context/page.mdx)) A context used to share resources, such as transaction manager, between the application and the module.

    - transactionManager: (TManager) An instance of a transaction manager of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`transactionManager\`.

    - manager: (TManager) An instance of a manager, typically an entity manager, of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`manager\`.

    - isolationLevel: (\`string\`) A string indicating the isolation level of the context. Possible values are \`READ UNCOMMITTED\`, \`READ COMMITTED\`, \`REPEATABLE READ\`, or \`SERIALIZABLE\`.

    - enableNestedTransactions: (\`boolean\`) A boolean value indicating whether nested transactions are enabled.

    - eventGroupId: (\`string\`) A string indicating the ID of the group to aggregate the events to be emitted at a later point.

    - transactionId: (\`string\`) A string indicating the ID of the current transaction.

    - runId: (\`string\`) A string indicating the ID of the current run.

    - messageAggregator: (\[IMessageAggregator]\(../../../types/interfaces/types.IMessageAggregator/page.mdx)) An instance of a message aggregator, which is used to aggregate messages to be emitted at a later point.

    - requestId: (\`string\`) A string indicating the ID of the current request.

    - idempotencyKey: (\`string\`) A string indicating the idempotencyKey of the current workflow execution.

    - parentStepIdempotencyKey: (\`string\`) A string indicating the idempotencyKey of the parent workflow execution.

    - preventReleaseEvents: (\`boolean\`) preventReleaseEvents

    - isCancelling: (\`boolean\`) A boolean value indicating whether the current workflow execution is being cancelled.

    - cancelingFromParentStep: (\`boolean\`) Weither or not a sub workflow cancellation is being triggered from a parent step.
      If true, the parent step will not be triggered by the sub workflow.

### Returns

- Promise: (Promise\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\[]\&#62;) The list of notifications.

    - NotificationDTO\[]: (\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\[])

        - id: (\`string\`) The ID of the notification.

        - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

        - channel: (\`string\`) The channel through which the notification is sent, such as 'email' or 'sms'

        - template: (\`string\`) The template name in the provider's system.

        - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

        - provider\_id: (\`string\`) The ID of the notification provider.

        - provider: (\[NotificationProviderDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationProviderDTO/page.mdx)) Information about the notification provider

            - id: (\`string\`) The ID of the notification provider.

            - handle: (\`string\`) The handle of the notification provider.

            - name: (\`string\`) A user-friendly name of the notification provider.

            - channels: (\`string\`\[]) The supported channels by the notification provider.

        - created\_at: (\`Date\`) The date and time the notification was created.

        - status: (\`"pending"\` \\| \`"success"\` \\| \`"failure"\`) The status of the notification

        - from: (\`null\` \\| \`string\`) The sender of the notification. It can be email, phone number, or username, depending on the channel.

        - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

            - content: (\`string\`) The content of the attachment, encoded as a binary string.

            - filename: (\`string\`) The filename of the attachment.

            - content\_type: (\`string\`) The MIME type of the attachment.

            - disposition: (\`string\`) The disposition of the attachment, For example, "inline" or "attachment".

            - id: (\`string\`) The ID, if the attachment is meant to be referenced within the body of the message.

        - trigger\_type: (\`null\` \\| \`string\`) The event name, the workflow, or anything else that can help to identify what triggered the notification.

        - resource\_id: (\`null\` \\| \`string\`) The ID of the resource this notification is for, if applicable. Useful for displaying relevant information in the UI

        - resource\_type: (\`null\` \\| \`string\`) The type of the resource this notification is for, if applicable, eg. "order"

        - receiver\_id: (\`null\` \\| \`string\`) The ID of the customer this notification is for, if applicable.

        - original\_notification\_id: (\`null\` \\| \`string\`) The original notification, in case this is a retried notification.

        - external\_id: (\`null\` \\| \`string\`) The id of the notification in the external system, if applicable

***

## retrieveNotification

This method is used to retrieve a notification by its ID

### Example

A simple example that retrieves a notification by its ID:

```ts
const notification =
  await notificationModuleService.retrieveNotification("noti_123")
```

To specify relations that should be retrieved:

:::note

You can only retrieve data models defined in the same module. To retrieve linked data models
from other modules, use [Query](https://docs.medusajs.com/learn/fundamentals/module-links/query) instead.

:::

```ts
const notification = await notificationModuleService.retrieveNotification(
  "noti_123",
  {
    relations: ["provider"],
  }
)
```

### Parameters

- notificationId: (\`string\`) The ID of the notification to retrieve.
- config: (\[FindConfig]\(../../../medusa/interfaces/medusa.FindConfig/page.mdx)\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\&#62;) The configurations determining how the notification is retrieved. Its properties, such as \`select\` or \`relations\`, accept the
  attributes or relations associated with a notification.

    - select: ((keyof Entity \\| \`string\` & \`object\`)\[]) An array of strings, each being attribute names of the entity to retrieve in the result.

    - skip: (\`null\` \\| \`number\`) A number indicating the number of records to skip before retrieving the results.

    - take: (\`null\` \\| \`number\`) A number indicating the number of records to return in the result.

    - relations: (\`string\`\[]) An array of strings, each being relation names of the entity to retrieve in the result.

      You can only retrieve data models defined in the same module. To retrieve linked data models
      from other modules, use \[Query]\(https://docs.medusajs.com/learn/fundamentals/module-links/query) instead.

    - order: (\[FindConfigOrder]\(../../../medusa/types/medusa.FindConfigOrder/page.mdx)) An object used to specify how to sort the returned records. Its keys are the names of attributes of the entity, and a key's value can either be \`ASC\`
      to sort retrieved records in an ascending order, or \`DESC\` to sort retrieved records in a descending order.

    - withDeleted: (\`boolean\`) A boolean indicating whether deleted records should also be retrieved as part of the result. This only works if the entity extends the
      \`SoftDeletableEntity\` class.

    - filters: (\`Record\<string, any>\`) Enable ORM specific defined filters

    - options: (\`Record\<string, any>\`) Enable ORM specific defined options
- sharedContext: (\[Context]\(../../../types/interfaces/types.Context/page.mdx)) A context used to share resources, such as transaction manager, between the application and the module.

    - transactionManager: (TManager) An instance of a transaction manager of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`transactionManager\`.

    - manager: (TManager) An instance of a manager, typically an entity manager, of type \`TManager\`, which is a typed parameter passed to the context to specify the type of the \`manager\`.

    - isolationLevel: (\`string\`) A string indicating the isolation level of the context. Possible values are \`READ UNCOMMITTED\`, \`READ COMMITTED\`, \`REPEATABLE READ\`, or \`SERIALIZABLE\`.

    - enableNestedTransactions: (\`boolean\`) A boolean value indicating whether nested transactions are enabled.

    - eventGroupId: (\`string\`) A string indicating the ID of the group to aggregate the events to be emitted at a later point.

    - transactionId: (\`string\`) A string indicating the ID of the current transaction.

    - runId: (\`string\`) A string indicating the ID of the current run.

    - messageAggregator: (\[IMessageAggregator]\(../../../types/interfaces/types.IMessageAggregator/page.mdx)) An instance of a message aggregator, which is used to aggregate messages to be emitted at a later point.

    - requestId: (\`string\`) A string indicating the ID of the current request.

    - idempotencyKey: (\`string\`) A string indicating the idempotencyKey of the current workflow execution.

    - parentStepIdempotencyKey: (\`string\`) A string indicating the idempotencyKey of the parent workflow execution.

    - preventReleaseEvents: (\`boolean\`) preventReleaseEvents

    - isCancelling: (\`boolean\`) A boolean value indicating whether the current workflow execution is being cancelled.

    - cancelingFromParentStep: (\`boolean\`) Weither or not a sub workflow cancellation is being triggered from a parent step.
      If true, the parent step will not be triggered by the sub workflow.

### Returns

- Promise: (Promise\&#60;\[NotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationDTO/page.mdx)\&#62;) The retrieved notification.

    - id: (\`string\`) The ID of the notification.

    - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

    - channel: (\`string\`) The channel through which the notification is sent, such as 'email' or 'sms'

    - template: (\`string\`) The template name in the provider's system.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

    - provider\_id: (\`string\`) The ID of the notification provider.

    - provider: (\[NotificationProviderDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationProviderDTO/page.mdx)) Information about the notification provider

        - id: (\`string\`) The ID of the notification provider.

        - handle: (\`string\`) The handle of the notification provider.

        - name: (\`string\`) A user-friendly name of the notification provider.

        - channels: (\`string\`\[]) The supported channels by the notification provider.

    - created\_at: (\`Date\`) The date and time the notification was created.

    - status: (\`"pending"\` \\| \`"success"\` \\| \`"failure"\`) The status of the notification

    - from: (\`null\` \\| \`string\`) The sender of the notification. It can be email, phone number, or username, depending on the channel.

    - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

        - content: (\`string\`) The content of the attachment, encoded as a binary string.

        - filename: (\`string\`) The filename of the attachment.

        - content\_type: (\`string\`) The MIME type of the attachment.

        - disposition: (\`string\`) The disposition of the attachment, For example, "inline" or "attachment".

        - id: (\`string\`) The ID, if the attachment is meant to be referenced within the body of the message.

    - trigger\_type: (\`null\` \\| \`string\`) The event name, the workflow, or anything else that can help to identify what triggered the notification.

    - resource\_id: (\`null\` \\| \`string\`) The ID of the resource this notification is for, if applicable. Useful for displaying relevant information in the UI

    - resource\_type: (\`null\` \\| \`string\`) The type of the resource this notification is for, if applicable, eg. "order"

    - receiver\_id: (\`null\` \\| \`string\`) The ID of the customer this notification is for, if applicable.

    - original\_notification\_id: (\`null\` \\| \`string\`) The original notification, in case this is a retried notification.

    - external\_id: (\`null\` \\| \`string\`) The id of the notification in the external system, if applicable