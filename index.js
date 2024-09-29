// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send email using SendGrid
async function sendEmail(data) {
  const msg = {
    to: 'sifosman@gmail.com', // Change to the recipient's email address
    from: 'dev@ampbutchery.co.za', // Use the email you verified with SendGrid
    subject: 'New Data from Whatsapp Chatbot',
    text: `Webhook Data Received: ${JSON.stringify(data)}`,
    html: `<strong>Webhook Data Received:</strong> <pre>${JSON.stringify(data, null, 2)}</pre>`
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body.errors : error.message);
  }
}

// Webhook route to receive data
app.post('/webhook', (req, res) => {
  const webhookData = req.body;
  console.log('Webhook data received:', webhookData);

  // Send the webhook data via email
  sendEmail(webhookData);

  // Respond to the webhook request
  res.status(200).send('Webhook received successfully');
});

// Home route for testing
app.get('/', (req, res) => {
  res.send('Webhook server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
