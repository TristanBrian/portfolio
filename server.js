const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Import Nodemailer

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactFormDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for the contact form
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'lessusbrian7@gmail.com', // Your email
        pass: '@Bray124' // Your email password or app password
    }
});

// API endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save()
        .then(() => {
            // Send email
            const mailOptions = {
                from: req.body.email,
                to: 'lessusbrian7@gmail.com', // Your email
                subject: `Contact Form Submission from ${req.body.name}`,
                text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: error.toString() });
                }
                res.status(200).json({ message: 'Email sent: ' + info.response });
            });
        })
        .catch(err => res.status(400).json({ message: 'Error saving contact information: ' + err }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
