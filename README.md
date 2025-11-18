<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa Mailjet Notifications 
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Compatibility

This starter is compatible with versions >= 2.11.x of `@medusajs/medusa`. 

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
    - [Configuration Options](#configuration-options)
    - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Local Development and Customization](#local-development-and-customization)

## Prerequisites
- Node.js v20 or higher
- Medusa server v2.11.3 or higher
- A [Mailjet](https://app.mailjet.com/account/apikeys) account and API credential

## Installation
```bash
pnpm add @gerbergpt/medusa-notifications-mailjet
```

## Configuration
Add the provider module in your `medusa-config.ts` file:

```typescript
module.exports = defineConfig({
  projectConfig: {
    // ...
  },
  modules: [
    // ... other modules
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            id: "notification-mailjet",
            resolve: "@gerbergpt/medusa-notifications-mailjet/providers/notifications-mailjet",
            options: {
              channels: ["email"],
              api_key: process.env.MAILJET_API_KEY,
              api_secret: process.env.MAILJET_SECRET_KEY,
              from_email: process.env.MAILJET_FROM,
              from_name: process.env.MAILJET_FROM_NAME,
              templates: {
                "<template-name>": {
                  subject: "<subject-function>",
                  template: "<template-function>",
                },
              },
              default_locale: "en",
            },
          },
        ],
      },
    },
  ]
})
```

## Environment Variables
Create or update your `.env` file with the following variables:

```bash
MAILJET_API_KEY="<your-mailgun-api-key>"
MAILJET_SECRET_KEY="<your-mailgun-api-key>"
MAILJET_FROM="<your-mailgun-from-email>"
MAILJET_FROM_NAME="<optional-from-name>"
```

> Mailjet's transactional API does not require a dedicated sending domain for this plugin, so no domain configuration is needed.

## Usage

Install @react-email/components in your Medusa backend application.

```bash
npm i @react-email/components -D
```

To set up your email templates, you’ll need to create two functions for each template:
- One function that accepts a locale and returns the email subject.
- One function that accepts the email’s props and returns the email template.

For example:
1.	In your Medusa server’s src directory, create a new folder named emails.
2.	Inside the emails folder, create a file called order-placed.tsx.
3.	Add the following code to order-placed.tsx:

```typescript jsx
import * as React from "react"
import { Html, Head, Preview, Body, Container, Heading, Text } from "@react-email/components"

export const getOrderPlacedTemplate = () => (
  <Html>
    <Head/>
    <Preview>Your order has been placed</Preview>
    <Body>
      <Container>
        <Heading>Thanks for your order!</Heading>
        <Text>Order #F001922 </Text>
        <Text>Total: $10.00</Text>
      </Container>
    </Body>
  </Html>
)

export const orderPlacedSubject = (locale: string) => {
  switch (locale) {
    case "zh":
      return "订单确认"
    case "en":
      return "Order Placed"
  }
}
```

4. In the `medusa-config.ts` file add the following code:
```typescript
module.exports = defineConfig({
  projectConfig: {
    // ...
  },
  modules: [
    // ... other modules
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            id: "notification-mailjet",
            resolve: "@gerbergpt/medusa-mailjet/providers/notifications-mailjet",
            options: {
              channels: ["email"],
              api_key: process.env.MAILJET_API_KEY,
              api_secret: process.env.MAILJET_SECRET_KEY,
              from_email: process.env.MAILJET_FROM,
              from_name: process.env.MAILJET_FROM_NAME,
              templates: {
                "order-placed": {
                  subject: orderPlacedSubject,
                  template: getOrderPlacedTemplate,
                },
              },
              default_locale: "en",
            },
          },
        ],
      },
    },
  ]
})
```


## Local development and customization

In case you want to customize and test the plugin locally, refer to
the [Medusa Plugin docs](https://docs.medusajs.com/learn/fundamentals/plugins/create#3-publish-plugin-locally-for-development-and-testing).
