const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON data from webhook
app.use(express.json());

// Endpoint to receive webhook data
app.post('/webhook', (req, res) => {
  const data = req.body;

  // Log data for debugging purposes
  console.log('Webhook received:', data);

  // Send an email with the received data
  sendEmail(data);

  res.status(200).send('Webhook received');
});

// Email function
async function sendEmail(data) {
  // Create a transporter using your email service (e.g., Gmail)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sifosman@gmail.com',
      pass: 'Thierry14247!',
    },
  });

  // Define the email options
  let mailOptions = {
    from: 'sifosman@gmail.com',
    to: 'sifosman@gmail.com',
    subject: 'New Data from Whatsapp Bot',
    text: `Data received: ${JSON.stringify(data)}`, // you can format this better based on your data
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
