window.onload = function() {

    // Attach event listeners

    // Example: Button click event
    document.querySelector('#btn').addEventListener('click', () => {
        alert('Button clicked!');
    });

    // Example: Keydown event
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            console.log('Enter key pressed');
        }
    });

    // Example: Form submission event
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
    });

    // Example: Mouse move event
    document.querySelector('#canvas').addEventListener('mousemove', (e) => {
        console.log(`Mouse at ${e.clientX}, ${e.clientY}`);
    });

    // Example: Touch start event
    document.addEventListener('touchstart', () => {
        console.log('Screen touched');
    });

    // Example: Pointer down event
    document.querySelector('#drag').addEventListener('pointerdown', () => {
        console.log('Pointer down');
    });

    // Example: Scroll event
    window.addEventListener('scroll', () => {
        console.log('Page scrolled');
    });

    // Example: Resize event
    window.addEventListener(
        'resize', () => {
            console.log('Window resized');
        }
    );

    let input = '';
    // capture every character typed
    document.addEventListener(
        
        'keypress', (e) => {
            input += e.key;
            console.log(`Key pressed: ${e.key}`);
            console.log(`Collected input: ${input}`);
        }
    );

    // Prevent window/tab closing with a confirmation dialog
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        return ''; // Required for some browsers
    }); 

    


};