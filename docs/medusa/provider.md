# How to Create a Notification Module Provider

In this document, youâ€™ll learn how to create a Notification Module Provider and the methods you must implement in it.

***

## Implementation Example

As you implement your Notification Module Provider, it can be useful to refer to an existing provider and how it's implemeted.

If you need to refer to an existing implementation as an example, check the [SendGrid Notification Module Provider in the Medusa repository](https://github.com/medusajs/medusa/tree/develop/packages/modules/providers/notification-sendgrid).

***

## 1. Create Module Provider Directory

Start by creating a new directory for your module provider.

If you're creating the module provider in a Medusa application, create it under the `src/modules` directory. For example, `src/modules/my-notification`.

If you're creating the module provider in a plugin, create it under the `src/providers` directory. For example, `src/providers/my-notification`.

The rest of this guide always uses the `src/modules/my-notification` directory as an example.

***

## 2. Create the Notification Module Provider's Service

Create the file `src/modules/my-notification/service.ts` that holds the implementation of the notification service.

The Notification Module Provider's main service must extend the `AbstractNotificationProviderService` class imported from `@medusajs/framework/utils`:

```ts title="src/modules/my-notification/service.ts"
import { 
  AbstractNotificationProviderService
} from "@medusajs/framework/utils"

class MyNotificationProviderService extends AbstractNotificationProviderService {
  // TODO add methods
}

export default MyNotificationProviderService
```

### constructor

The constructor allows you to access resources from the module's container using the first parameter,
and the module's options using the second parameter.

If you're creating a client or establishing a connection with a third-party service, do it in the constructor.

#### Example

```ts
import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"

type InjectedDependencies = {
  logger: Logger
}

type Options = {
  apiKey: string
}

class MyNotificationProviderService extends AbstractNotificationProviderService {
  protected logger_: Logger
  protected options_: Options
  // assuming you're initializing a client
  protected client

  constructor (
    { logger }: InjectedDependencies,
    options: Options
  ) {
    super()

    this.logger_ = logger
    this.options_ = options

    // assuming you're initializing a client
    this.client = new Client(options)
  }
}

export default MyNotificationProviderService
```

### identifier

Each notification provider has a unique ID used to identify it.

#### Example

```ts
class MyNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "my-notification"
  // ...
}
```

### validateOptions

This method validates the options of the provider set in `medusa-config.ts`.
Implementing this method is optional. It's useful if your provider requires custom validation.

If the options aren't valid, throw an error.

#### Example

```ts
class MyNotificationProviderService extends AbstractNotificationProviderService {
  static validateOptions(options: Record<any, any>) {
    if (!options.apiKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "API key is required in the provider's options."
      )
    }
  }
}
```

#### Parameters

- options: (\`Record\<any, any>\`) The provider's options.

### send

This method is used to send a notification using the third-party provider or your custom logic.

#### Example

```ts
// other imports...
import {
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO
} from "@medusajs/framework/types"

class MyNotificationProviderService extends AbstractNotificationProviderService {
  // ...
  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    // TODO send the notification using a third-party
    // provider or custom logic.
    // for example:
    return this.client.send({
      email: notification.to,
      template: notification.template,
      template_data: notification.data
    })
  }
}
```

#### Parameters

- notification: (\[ProviderSendNotificationDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.ProviderSendNotificationDTO/page.mdx)) The details of the
  notification to send.

    - to: (\`string\`) The recipient of the notification. It can be email, phone number, or username, depending on the channel.

    - channel: (\`string\`) The channel through which the notification is sent, such as 'email' or 'sms'

    - template: (\`string\`) The template name in the provider's system.

    - from: (\`null\` \\| \`string\`) The sender of the notification. It can be email, phone number, or username, depending on the channel.

    - attachments: (\`null\` \\| \[Attachment]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.Attachment/page.mdx)\[]) Optional attachments for the notification.

    - data: (\`null\` \\| \`Record\<string, unknown>\`) The data that gets passed over to the provider for rendering the notification.

    - content: (\`null\` \\| \[NotificationContent]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.NotificationContent/page.mdx)) The content that gets passed to the provider.

#### Returns

- Promise: (Promise\&#60;\[ProviderSendNotificationResultsDTO]\(../../../types/NotificationTypes/interfaces/types.NotificationTypes.ProviderSendNotificationResultsDTO/page.mdx)\&#62;) The result of sending
  the notification.

***

## 3. Create Module Provider Definition File

Create the file `src/modules/my-notification/index.ts` with the following content:

```ts title="src/modules/my-notification/index.ts"
import MyNotificationProviderService from "./service"
import { 
  ModuleProvider, 
  Modules
} from "@medusajs/framework/utils"

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [MyNotificationProviderService],
})
```

This exports the module provider's definition, indicating that the `MyNotificationProviderService` is the module provider's service.

A notification module provider can have export multiple provider services, where each are registered as a separate notification provider.

***

## 4. Use Module Provider

To use your Notification Module Provider, add it to the `providers` array of the Notification Module in `medusa-config.ts`:

The Notification Module accepts one provider per channel.

```ts title="medusa-config.ts"
module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          // default provider
          {
            resolve: "@medusajs/medusa/notification-local",
            id: "local",
            options: {
              name: "Local Notification Provider",
              channels: ["feed"],
            },
          },
          {
            // if module provider is in a plugin, use `plugin-name/providers/my-notification`
            resolve: "./src/modules/my-notification",
            id: "my-notification",
            options: {
              channels: ["email"],
              // provider options...
            },
          },
        ],
      },
    },
  ]
})
```

Make sure to specify the correct channels for your provider in the `channels` option.

***

## 5. Test it Out

### Create Subscriber

To test out the provider, create a subscriber at `src/subscribers/user-created.ts` with the following content:

```ts title="src/subscribers/user-created.ts"
import { Modules } from "@medusajs/framework/utils"
import {
  SubscriberArgs,
  type SubscriberConfig,
} from "@medusajs/medusa"

export default async function userCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationModuleService = container.resolve(
    Modules.NOTIFICATION
  )
  const query = container.resolve("query")

  const { data: [user] } = await query.graph({
    entity: "user",
    fields: ["*"],
    filters: {
      id: data.id,
    }
  })

  await notificationModuleService.createNotifications({
    to: user.email,
    channel: "email",
    template: "new-user"
  })
}

export const config: SubscriberConfig = {
  event: "user.created",
}
```

In the subscriber, you resolve the Notification and User modules. Then, you use the User Module's main service to retrieve the user's details.

Finally, you use the Notification Module's main service to send a notification to the user's email through the `email` channel (assuming that's your provider's channel).

Make sure to replace the value of `template` to the ID of the template in your provider.

### Create User

Use the following command to create a user:

```bash
npx medusa user -e admin@test.com -p supersecret
```

After the user is created, the subscriber is executed, sending the notification using your provider.