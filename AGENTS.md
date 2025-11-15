# AGENTS.md

## Project Overview
You are assisting on the Email notifications via Mailjet service for Medusa backend system. It’s built in Mailjet node-mailjet npm package.

# Mailjet Node JS Example

```javascript
require('dotenv').config(); // Load environment variables from a .env file

const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "sender@example.com",
					"Name": "Sender Name"
				},
				"To": [
					{
						"Email": "recipient@example.com",
						"Name": "Recipient Name"
					}
				],
				"Subject": "Greetings from Mailjet!",
				"TextPart": "My first Mailjet email",
				"HTMLPart": "<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!"
			}
		]
	})
```