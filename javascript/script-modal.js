// Initialize all modal behavior once the DOM is ready
window.onload =  function (){ 
  // Cache references to modal elements
  // #modal is the fullscreen overlay; #modal-content is the scrolling content box
  const modal = document.querySelector('#modal');
  const modalContent = document.querySelector('#modal-content');
  const closeBtn = document.querySelector('#close-modal');

  // For every article on the page, hide extra paragraphs and attach a "Show More" button
  document.querySelectorAll('article').forEach(article => {
    const paragraphs = article.querySelectorAll('p');

    if (paragraphs.length > 1) {
      // Hide all paragraphs except the first
      // We use a CSS class (is-collapsed) instead of inline styles for separation of concerns
      for (let i = 1; i < paragraphs.length; i++) {
        paragraphs[i].classList.add('is-collapsed');

      }

      // Create the trigger button that will open the full article in the modal
      const button = document.createElement('button'); // document.createElement creates a new button element
      button.textContent = 'Show More'; // textContent property sets the button label
      button.classList.add('expand-btn'); // .classList.add adds a CSS class for styling
      article.appendChild(button); // appendChild adds the button to the end of the article

      // When clicked, open the modal with a clean (expanded) copy of this article
      button.addEventListener('click', () => {
        // Clone the article so we don't mutate the original content in the page
        const clonedArticle = article.cloneNode(true); // .cloneNode(true) creates a deep copy of the article
        // Ensure all paragraphs are visible in the modal by removing collapse class
        clonedArticle.querySelectorAll('p').forEach(p => {
          p.classList.remove('is-collapsed'); //.remove removes the collapse class
          // optional: mark them as expanded for styling hooks if desired
          p.classList.add('is-expanded'); // .add adds the expanded class
        });
        // Remove the in-article button from the cloned copy (not needed inside the modal)
        const clonedButton = clonedArticle.querySelector('.expand-btn');
        if (clonedButton) clonedButton.remove(); // .remove deletes the button element from the cloned article
        
        // Inject the prepared HTML into the modal
        modalContent.innerHTML = clonedArticle.innerHTML;
        // Show the modal overlay (CSS uses .active to switch display to flex)
        modal.classList.add('active');
        // Prevent background scrolling while the modal is open
        document.body.classList.add('modal-open'); // .classList.add adds a CSS class to the body element
      });
    }
  });

  // Close modal when the close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {    
        // Hide overlay and re-enable page scroll
        modal.classList.remove('active'); 
        document.body.classList.remove('modal-open');
    });
  }
};
