window.onload = function() {
    // call a function to hide all but first paragraph in each article
    hideExtraParagraphs();
    // call a function to place "Show More" buttons after first paragraph
    addShowMoreButtons();
    // call a function to add event listeners to the buttons
    addEventListenersToButtons();
};
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
    // get all articles on the page
    const articles = document.querySelectorAll('article'); 
    // loop through the articles 
    articles.forEach(article => {  
        // get the first paragraph in the article
        const firstParagraph = article.querySelector('p');
        // create a new button element
        const button = document.createElement('button');
        // set the button text and class 
        button.textContent = 'Show More';
        button.className = 'show-more-btn';
        // insert the button after the first paragraph
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
                // move button to end after expanding
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