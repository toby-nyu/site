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

    // Define the fields to validate
    const fields = ['name', 'email', 'password'];
    let errors = [];

    // Loop through each field for validation
    for (let i = 0; i < fields.length; i++) {
      const field = document.getElementById(fields[i]);
      const value = field.value.trim();

      // Check if the field is empty
      if (value === '') {
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
    if (errors.length > 0) {
      alert(errors.join('\n'));
    } else {
      // If no errors, submit the form (or show success message)
      alert('Form submitted successfully!');
      form.submit();
    }
  });
});
