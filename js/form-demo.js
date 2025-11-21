// Wait for the page to fully load before running the script
window.onload = function() {
        // Field name mapping for user-friendly error messages
        // This object converts technical field names into readable labels
        const fieldNames = {
            'title': 'Title',
            'forename': 'First Name',
            'surname': 'Last Name',
            'email': 'Email',
            'phone': 'Phone Number',
            'contactMethod': 'Preferred Contact Method',
            'newsletter': 'Newsletter',
            'otherTitle': 'Other Title'
        };

        // Validation rules configuration
        // Each rule is a function that returns null if valid, or an error message if invalid
        const validationRules = {
            // Check if a value meets minimum length requirement
            minLength: (value, min, fieldLabel) => 
                value.length >= min ? null : `${fieldLabel.toLowerCase()} must be at least ${min} characters.`,
            // Check if a value matches a regex pattern
            pattern: (value, pattern, fieldLabel, errorMsg) => 
                pattern.test(value) ? null : errorMsg || `Please enter a valid ${fieldLabel.toLowerCase()}.`,
            // Check if a value is not empty (updated to accept param placeholder)
            required: (value, param, fieldLabel) => 
                value ? null : `Please fill out the ${fieldLabel.toLowerCase()} field.`
        };

        // Get user-friendly field name from the fieldNames object
        // Falls back to the original fieldName if not found in the mapping
        const getFieldLabel = (fieldName) => fieldNames[fieldName] || fieldName;

        // Get a form field element by its name attribute
        const getField = (fieldName) => document.querySelector(`[name="${fieldName}"]`);

        // Create an error message span element
        // Returns a <span> element with the error message and appropriate CSS class
        const createErrorSpan = (message) => {
            const errorSpan = document.createElement('span');
            errorSpan.textContent = ` ${message}`;
            errorSpan.classList.add('error-message');
            return errorSpan;
        };

        // Display error message for a specific field
        // Adds the error span to the field's parent and applies error styling
        // Returns the field element so it can be focused later
        function showError(fieldName, message) {
            const field = getField(fieldName);
            // Only add error if field exists and doesn't already have an error message
            if (field && !field.parentNode.querySelector('span.error-message')) {
                field.parentNode.appendChild(createErrorSpan(message));
                field.classList.add('error');
            }
            return field;
        }

        // Remove all error messages and error/valid styling from the form
        // Called at the start of each validation attempt
        function clearErrors() {
            // Remove all error message spans
            document.querySelectorAll('form span.error-message').forEach(span => span.remove());
            // Remove error and valid classes from all input fields including dynamic otherTitle
            document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], #other-title-input')
                .forEach(input => input.classList.remove('error', 'valid'));
        }

        // Mark valid fields with green border after successful validation
        // Only marks fields that have data and don't have errors
        function markValidFields(data) {
            document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], #other-title-input')
                .forEach(input => {
                    const fieldName = input.getAttribute('name');
                    // If field has data and no error class, mark it as valid
                    if (data[fieldName] && !input.classList.contains('error')) {
                        input.classList.add('valid');
                    }
                });
        }

        // Add focus/blur event listeners to all input fields
        // These provide visual feedback when users interact with fields
        document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]')
            .forEach(input => {
                // When a field receives focus (user clicks or tabs into it)
                input.addEventListener('focus', function() {
                    // Remove any existing error message for this field
                    const errorSpan = this.parentNode.querySelector('span.error-message');
                    if (errorSpan) {
                        errorSpan.remove();
                    }
                    // Remove error styling and add blue focus styling
                    this.classList.remove('error');
                    this.classList.add('focused');
                });
                
                // When a field loses focus (user clicks or tabs away)
                input.addEventListener('blur', function() {
                    // Remove the blue focus styling
                    this.classList.remove('focused');
                });
            });

        // Handle "Other" title selection
        // When user selects "Other" radio button, create a text input for them to specify
        document.getElementById('other').addEventListener('change', function() {
            // Only create the input if "Other" is checked and input doesn't already exist
            if (this.checked && !document.getElementById('other-title-input')) {
                // Create a new text input element
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'other-title-input';
                input.name = 'otherTitle';
                input.placeholder = 'Please specify your title';
                // Add the input after the "Other" radio button
                this.parentNode.appendChild(input);
                // Automatically focus on the new input so user can start typing
                input.focus();
                
                // Add focus/blur listeners to the dynamically created input
                input.addEventListener('focus', function() {
                    const errorSpan = this.parentNode.querySelector('span.error-message');
                    if (errorSpan) errorSpan.remove();
                    this.classList.remove('error');
                    this.classList.add('focused');
                });
                input.addEventListener('blur', function() {
                    this.classList.remove('focused');
                });
            }
        });
        
        // Add listeners to all other title radio buttons to remove "Other" input when deselected
        document.querySelectorAll('input[name="title"]').forEach(radio => {
            if (radio.id !== 'other') {
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        // Remove the "Other" text input if it exists
                        const otherInput = document.getElementById('other-title-input');
                        if (otherInput) {
                            otherInput.remove();
                        }
                    }
                });
            }
        });
        
        // Validate a single field with given rules
        // Loops through all rules for a field and stops at the first error found
        function validateField(fieldName, value, rules, errorTracker) {
            // Check each validation rule for this field
            for (const [ruleName, ruleConfig] of Object.entries(rules)) {
                // Call the validator function with the value, parameters, and field label
                const error = ruleConfig.validator(value, ruleConfig.param, getFieldLabel(fieldName), ruleConfig.message);
                // If validation failed (error message returned)
                if (error) {
                    const field = showError(fieldName, error);
                    // Track the first error field so we can focus it later
                    if (!errorTracker.firstErrorField) errorTracker.firstErrorField = field;
                    errorTracker.hasError = true;
                    return false; // Stop checking further rules for this field
                }
            }
            return true; // All rules passed
        }

        // Form submission handler
        // This runs when the user clicks the submit button
        document.querySelector('form').addEventListener('submit', function(event) {
            // Prevent the form from submitting immediately (we'll validate first)
            event.preventDefault();
            // Clear any previous error messages and styling
            clearErrors();

            // Gather all form data into an object
            const formData = new FormData(event.target);
            const data = {};
            // Loop through each form field and add it to our data object
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Track validation errors
            const errorTracker = { hasError: false, firstErrorField: null };
            // Fields that are optional (don't require validation)
            const optionalFields = ['newsletter', 'otherTitle'];

            // Define validation for each field
            // Each field lists the rules it must pass (required, minLength, pattern, etc.)
            const fieldValidations = {
                title: {
                    required: { validator: validationRules.required }
                },
                forename: {
                    required: { validator: validationRules.required },
                    minLength: { validator: validationRules.minLength, param: 2 }
                },
                surname: {
                    required: { validator: validationRules.required },
                    minLength: { validator: validationRules.minLength, param: 2 }
                },
                email: {
                    required: { validator: validationRules.required },
                    pattern: { 
                        validator: validationRules.pattern, 
                        // Regex pattern: localpart@domain.tld
                        // Domain must be at least 1 char, TLD must be at least 2 chars
                        param: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 
                        message: 'Please enter a valid email address.'
                    }
                },
                phone: {
                    required: { validator: validationRules.required },
                    pattern: { 
                        validator: validationRules.pattern,
                        // Allows digits, spaces, +, -, and () with minimum 7 characters
                        param: /^[+\-\d\s()]{7,}$/,
                        message: 'Please enter a valid phone number.'
                    }
                },
                contactMethod: {
                    required: { validator: validationRules.required }
                }
            };

            // Validate title field first
            validateField('title', data['title'] || '', fieldValidations.title, errorTracker);
            
            // If "Other" title is selected, validate the otherTitle field immediately after title
            if (data.title === 'other') {
                const otherTitleValue = data.otherTitle || '';
                validateField('otherTitle', otherTitleValue, {
                    required: { validator: validationRules.required },
                    minLength: { validator: validationRules.minLength, param: 2 }
                }, errorTracker);
            }
            
            // Validate remaining fields by looping through the fieldValidations object
            for (const [fieldName, rules] of Object.entries(fieldValidations)) {
                if (fieldName !== 'title') { // Skip title since we already validated it
                    const value = data[fieldName] || ''; // Get the value or empty string
                    validateField(fieldName, value, rules, errorTracker);
                }
            }

            // Handle validation results
            if (errorTracker.hasError && errorTracker.firstErrorField) {
                // If there are errors, focus on the first error field
                errorTracker.firstErrorField.focus();
                // Scroll to the error field so user can see it
                errorTracker.firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // If no errors, mark all valid fields with green borders
                markValidFields(data);
                // Log the form data to the console (for debugging)
                console.log('Form Submitted:', data);
                // Submit the form to the server
                event.target.submit();
            }
        });
    };
