// Combined article expansion script
// Supports both inline expansion and modal popup expansion

window.onload = function() {
    // Check if modal elements exist to determine which mode to use
    const modal = document.querySelector('#modal');
    const useModalMode = modal !== null;

    if (useModalMode) {
        initModalMode();
    } else {
        initInlineMode();
    }
};

// ==================== INLINE MODE ====================
// Expands/collapses paragraphs directly within the article

function initInlineMode() {
    hideExtraParagraphs();
    addShowMoreButtons();
    addEventListenersToButtons();
}

function hideExtraParagraphs() {
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        const paragraphs = article.querySelectorAll('p');
        for (let i = 1; i < paragraphs.length; i++) {
            paragraphs[i].classList.add('is-collapsed');
            paragraphs[i].classList.remove('is-expanded');
        }
    });
}

function addShowMoreButtons() {
    const articles = document.querySelectorAll('article'); 
    articles.forEach(article => {  
        const firstParagraph = article.querySelector('p');
        const button = document.createElement('button');
        button.textContent = 'Show More';
        button.className = 'show-more-btn';
        firstParagraph.insertAdjacentElement('afterend', button);
    });
}

function addEventListenersToButtons() {
    const buttons = document.querySelectorAll('.show-more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const article = button.closest('article');
            const paragraphs = article.querySelectorAll('p');
            const isCollapsed = paragraphs.length > 1 && paragraphs[1].classList.contains('is-collapsed');

            if (isCollapsed) {
                for (let i = 1; i < paragraphs.length; i++) {
                    paragraphs[i].classList.remove('is-collapsed');
                    paragraphs[i].classList.add('is-expanded');
                }
                article.appendChild(button);
                button.textContent = 'Show Less';
            } else {
                for (let i = 1; i < paragraphs.length; i++) {
                    paragraphs[i].classList.add('is-collapsed');
                    paragraphs[i].classList.remove('is-expanded');
                }
                button.textContent = 'Show More';
            }
        });
    });
}

// ==================== MODAL MODE ====================
// Opens full article in a modal popup overlay

function initModalMode() {
    const modal = document.querySelector('#modal');
    const modalContent = document.querySelector('#modal-content');
    const closeBtn = document.querySelector('#close-modal');

    document.querySelectorAll('article').forEach(article => {
        const paragraphs = article.querySelectorAll('p');

        if (paragraphs.length > 1) {
            // Hide all paragraphs except the first
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].classList.add('is-collapsed');
            }

            // Create modal trigger button
            const button = document.createElement('button');
            button.textContent = 'Show More';
            button.classList.add('expand-btn');
            article.appendChild(button);

            // Open modal with full article on click
            button.addEventListener('click', () => {
                const clonedArticle = article.cloneNode(true);
                
                // Show all paragraphs in modal
                clonedArticle.querySelectorAll('p').forEach(p => {
                    p.classList.remove('is-collapsed');
                    p.classList.add('is-expanded');
                });
                
                // Remove button from modal content
                const clonedButton = clonedArticle.querySelector('.expand-btn');
                if (clonedButton) clonedButton.remove();
                
                // Display modal
                modalContent.innerHTML = clonedArticle.innerHTML;
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            });
        }
    });

    // Close modal handler
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }
}
