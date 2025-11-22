import * as React from "react"
import { Html, Head, Preview, Body, Container, Heading, Text } from "@react-email/components"

export const getOrderPlacedTemplate = () => (
  <Html>
    <Head/>
    <Preview>Your order is confirmed</Preview>
    <Body>
      <Container>
        <Heading>Thanks for your order!</Heading>
        <Text>Order #12345 has been confirmed.</Text>
        <Text>Total: $59.99</Text>
      </Container>
    </Body>
  </Html>
)

export const orderPlacedSubject = (locale: string) => {
  switch (locale) {
    case "zh":
      return "订单确认"
    case "en":
      return "Order Confirmation"
  }
}