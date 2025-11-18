## Mailjet Node

```bash
npm install node-mailjet
npm install --save-dev @types/node
````

```typescript
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC as string,
  process.env.MJ_APIKEY_PRIVATE as string
);

const request = mailjet
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: {
          Email: 'your@email.com',
          Name: 'Your Name',
        },
        To: [
          {
            Email: 'recipient@email.com',
            Name: 'Recipient Name',
          },
        ],
        Subject: 'Test Email from Mailjet and Node.js',
        TemplateID: templateId,
        TemplateLanguage: true,
        Variables: {
          name: 'test',
        },
      },
    ],
  });

request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.error(err.statusCode, err.message);
  });
```