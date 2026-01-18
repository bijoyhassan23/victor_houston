<?php

/*************************************************
 * SECURITY GUARD (ABSPATH-style protection)
 *************************************************/
defined('ABSPATH') || define('ABSPATH', dirname(__FILE__));
if (!defined('ABSPATH')) {
    http_response_code(403);
    exit('Direct access not allowed');
}


/*************************************************
 * CONFIG
 *************************************************/
define('BEARER_TOKEN', getenv('BEARER_TOKEN_PHP') ?: '8gfySgbWTXnJLbZvLS#USJfHZmyXcgv8nET!iZDlvA0XMDPuveDfonuqGOi8rPs5'); // TODO: Configure BEARER_TOKEN_PHP in production environment variables 
define('RECEIVER_EMAIL', 'client@gmail.com');

/*************************************************
 * REQUEST VALIDATION
 *************************************************/
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

/*************************************************
 * BEARER TOKEN VALIDATION
 *************************************************/
$token = $_POST['token'] ?? '';

if (!hash_equals(BEARER_TOKEN, $token)) {
    http_response_code(401);
    exit('Unauthorized request');
}

/*************************************************
 * INPUT SANITIZATION
 *************************************************/
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

/*************************************************
 * INPUT VALIDATION
 *************************************************/
if ($name === '' || $message === '') {
    http_response_code(400);
    exit('Required fields missing');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Invalid email address');
}

/*************************************************
 * ESCAPE OUTPUT (XSS protection)
 *************************************************/
$name    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

/*************************************************
 * EMAIL PREPARATION
 *************************************************/
$subject = "$name - New Contact Form Submission";

$body = <<<EOT
Nombre: $name
Email: $email
Telefono / WhatsApp: $phone

Mensaje:
$message
EOT;

$headers  = "From: {$name} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/*************************************************
 * SEND EMAIL
 *************************************************/
if (mail(RECEIVER_EMAIL, $subject, $body, $headers)) {
    echo "Message sent successfully.";
} else {
    http_response_code(500);
    echo "Error sending the message.";
}
