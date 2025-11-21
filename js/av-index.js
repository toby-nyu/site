// Audio & Video Index Page JavaScript
// Handles back-to-top button visibility and smooth scrolling

document.addEventListener('DOMContentLoaded', function() {
    // Get the back-to-top button and the multimedia reference section
    const backToTopButton = document.getElementById('back-to-top');
    const multimediaSection = document.getElementById('multimedia-reference');

    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        // Calculate when multimedia reference section is about to enter viewport
        if (multimediaSection) {
            const sectionTop = multimediaSection.offsetTop;
            const scrollPosition = window.scrollY + window.innerHeight;

            // Show button when user scrolls past the multimedia reference section
            if (scrollPosition >= sectionTop) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
