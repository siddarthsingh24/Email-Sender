const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  domain: 'gmail.com',
  authentication:'plain',
  secure: false,
  auth: {
    user: "beefprovider3@gmail.com",
    pass: "chzn ykkd wdip bjvp"
  },
  tls: {
    rejectUnauthorized: false  // Allows self-signed certificates
  }
});

exports.sendEmail = async (event) => {
  try {
    const { receiver_email, subject, body_text } = JSON.parse(event.body);

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiver_email,
      subject,
      text: body_text
    };

    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' })
    };
  }
};
