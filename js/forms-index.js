// Back to top button functionality for forms index page
// This script shows/hides a back-to-top button based on scroll position

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Get the back-to-top button element
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Get the validated-form section to use as trigger point
    const validatedFormSection = document.getElementById('validated-form');
    
    // Listen for scroll events on the window
    window.addEventListener('scroll', function() {
        // Get the position of the validated-form section
        const sectionTop = validatedFormSection.offsetTop;
        // Calculate current scroll position plus viewport height
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Show button before validated-form section comes into view
        // This happens when the bottom of the viewport reaches the top of that section
        if (scrollPosition >= sectionTop) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Handle click on back-to-top button
    backToTopBtn.addEventListener('click', function() {
        // Smoothly scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
