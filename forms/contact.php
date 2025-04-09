<?php

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate the input data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Check for empty fields
    if (empty($name) || empty($email) || empty($message)) {
        echo "Please fill out all the fields.";
        exit;
    }

    // Validate the email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Set up the email parameters
    $to = "evina.tershalla.se@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission from $name";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    // Create the email body
    $body = "<html>
                <head>
                    <title>Contact Form Submission</title>
                </head>
                <body>
                    <h2>New Message from Contact Form</h2>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                    <p><strong>Message:</strong><br> $message </p>
                </body>
            </html>";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "There was an error sending your message. Please try again.";
    }
}
?>