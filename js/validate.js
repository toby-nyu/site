// validate.js
// This script validates the Create Account form using an event listener.
// It checks for empty fields, name length, email format, and password complexity.

document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  const form = document.getElementById('createAccountForm');

  // Attach submit event listener
  form.addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Define the fields to validate using their IDs
    const fields = ['name', 'email', 'password'];
    // Initialize an array to hold error messages
    let errors = [];

    // Loop through each field for validation
    for (let i = 0; i < fields.length; i++) {
      // Get the field element by ID
      const field = document.getElementById(fields[i]);
      // Get the value and trim whitespace
      const value = field.value.trim();

      // Check if the field is empty
      if (value === '') {
        // Add error message for empty field to errors array
        // it adds to the error array the field name with first letter capitalized
        errors.push(fields[i].charAt(0).toUpperCase() + fields[i].slice(1) + ' is required');
        continue; // Skip further checks for this field
      }

      // Validate Name: at least 2 characters
      if (fields[i] === 'name' && value.length < 2) {
        errors.push('Name must be at least 2 characters long');
      }

      // Validate Email: using regex pattern
      if (fields[i] === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push('Please enter a valid email address');
        }
      }

      // Validate Password: at least 8 chars, uppercase, lowercase, and number
      if (fields[i] === 'password') {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(value)) {
          errors.push('Password must be at least 8 characters long and include uppercase, lowercase, and a number');
        }
      }
    }

    // If there are errors, display them and prevent submission
    // checking if errors array has any elements
    if (errors.length > 0) {
      // Join errors with new line and show in alert
      alert(errors.join('\n'));
    } else {
      // If no errors, submit the form (or show success message)
      alert('Form submitted successfully!');
      // Submit the form programmatically
      form.submit();
    }
  });
});
