## Installation

1. Clone the repository:

```bash
git clone https://github.com/RishiPatel007/FileCrudExpress
cd FileCrudExpress
```

2. Install Dependencies

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and configure the following environment variables:

```js
PORT=5000
nodemailer_email=<your-email>
nodemailer_password=<your-email-password>
nodemailer_sendTo = <emails-of-other> (In a string seperated by comma)
```

4. Run

```bash
npm start
```

`Leave nodemailer credentials blank if you don't want to send email on addItem (App will not crash)(probably)`

## API Endpoints

### Item Routes (`/api/data`)

-   `GET /`: Get all active items.
-   `GET /:id`: Get a specific item by ID.
-   `POST /`: Create a new item.
-   `PUT /:id`: Update an existing item by ID.
-   `DELETE /:id`: Delete an item by ID.

### Public Routes (`/public`)

-   `GET /:file`: Serve a public file.

## Email Notifications

The application uses the `nodemailer` package to send email notifications when new items are added. The email content is rendered using an EJS template.

# Postman Doc :

https://documenter.getpostman.com/view/42769508/2sB2cPi4q4
