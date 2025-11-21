<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if form was submitted
$formSubmitted = $_SERVER['REQUEST_METHOD'] === 'POST';

// Sanitize and retrieve form data if submitted
$formData = [];
if ($formSubmitted) {
    $formData = [
        'title' => htmlspecialchars($_POST['title'] ?? ''),
        'forename' => htmlspecialchars($_POST['forename'] ?? ''),
        'surname' => htmlspecialchars($_POST['surname'] ?? ''),
        'email' => htmlspecialchars($_POST['email'] ?? ''),
        'phone' => htmlspecialchars($_POST['phone'] ?? ''),
        'contactMethod' => htmlspecialchars($_POST['contactMethod'] ?? ''),
        'newsletter' => isset($_POST['newsletter']) ? 'Yes' : 'No',
        // Also handle simple form fields if submitted from form.html
        'name' => htmlspecialchars($_POST['name'] ?? ''),
        'password' => '****' // Don't display actual password for security
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission Result</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            width: 100%;
            padding: 40px;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2em;
        }

        .success-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            display: block;
        }

        .success-icon svg {
            fill: #4caf50;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }

        .data-section {
            background: #f5f5f5;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .data-section h2 {
            color: #667eea;
            font-size: 1.3em;
            margin-bottom: 15px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .data-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #ddd;
        }

        .data-row:last-child {
            border-bottom: none;
        }

        .data-label {
            font-weight: bold;
            color: #555;
            width: 150px;
            flex-shrink: 0;
        }

        .data-value {
            color: #333;
            flex-grow: 1;
            word-break: break-word;
        }

        .empty-state {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        .empty-state svg {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
            opacity: 0.3;
        }

        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s;
            margin-top: 20px;
        }

        .btn:hover {
            background: #5568d3;
        }

        .info-box {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin-top: 20px;
            border-radius: 4px;
        }

        .info-box strong {
            color: #1976d2;
        }

        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }

            h1 {
                font-size: 1.5em;
            }

            .data-row {
                flex-direction: column;
            }

            .data-label {
                margin-bottom: 5px;
            }
        }
    </style>
    <script>
        // Optional: Add any client-side JavaScript here
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Form submission page loaded');
        });
    </script>
</head>
<body>
    <div class="container">
        <?php if ($formSubmitted && (!empty($formData['name']) || !empty($formData['forename']))): ?>
            <!-- Success State -->
            <svg class="success-icon" viewBox="0 0 24 24">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            </svg>
            
            <h1>Form Submitted Successfully!</h1>
            <p class="subtitle">Thank you for submitting the form. Here's the data we received:</p>
            
            <div class="data-section">
                <h2>Submitted Information</h2>
                
                <?php if (!empty($formData['title'])): ?>
                <div class="data-row">
                    <span class="data-label">Title:</span>
                    <span class="data-value"><?php echo ucfirst($formData['title']); ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['forename'])): ?>
                <div class="data-row">
                    <span class="data-label">First Name:</span>
                    <span class="data-value"><?php echo $formData['forename']; ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['surname'])): ?>
                <div class="data-row">
                    <span class="data-label">Last Name:</span>
                    <span class="data-value"><?php echo $formData['surname']; ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['name'])): ?>
                <div class="data-row">
                    <span class="data-label">Name:</span>
                    <span class="data-value"><?php echo $formData['name']; ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['email'])): ?>
                <div class="data-row">
                    <span class="data-label">Email:</span>
                    <span class="data-value"><?php echo $formData['email']; ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['phone'])): ?>
                <div class="data-row">
                    <span class="data-label">Phone:</span>
                    <span class="data-value"><?php echo $formData['phone']; ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['contactMethod'])): ?>
                <div class="data-row">
                    <span class="data-label">Preferred Contact:</span>
                    <span class="data-value"><?php echo ucfirst($formData['contactMethod']); ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (isset($_POST['newsletter'])): ?>
                <div class="data-row">
                    <span class="data-label">Newsletter:</span>
                    <span class="data-value"><?php echo $formData['newsletter']; ?></span>
                </div>
                <?php endif; ?>
                
                <?php if (!empty($formData['password']) && $formData['password'] !== '****'): ?>
                <div class="data-row">
                    <span class="data-label">Password:</span>
                    <span class="data-value"><?php echo $formData['password']; ?></span>
                </div>
                <?php endif; ?>
            </div>

            <div class="info-box">
                <strong>Note:</strong> In a real application, this data would be securely stored in a database, and passwords would be hashed before storage. This is a demonstration page for educational purposes.
            </div>

            <a href="javascript:history.back()" class="btn">Go Back to Form</a>
            
        <?php else: ?>
            <!-- Empty State -->
            <div class="empty-state">
                <svg viewBox="0 0 24 24">
                    <path fill="#ccc" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <h1>No Form Data</h1>
                <p class="subtitle">This page displays form submission results. Please submit a form to see the data here.</p>
                <a href="javascript:history.back()" class="btn">Go Back</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
