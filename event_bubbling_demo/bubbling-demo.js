// Select elements
const parent1 = document.getElementById('parent1');
const btn1 = document.getElementById('btn1');
const parent2 = document.getElementById('parent2');
const btn2 = document.getElementById('btn2');

// Helper to log event details
function logEvent(phase, element, e) {
    console.log(`${phase} on ${element} | target: ${e.target.tagName}, currentTarget: ${e.currentTarget.tagName}`);
}

// Bubbling section: normal propagation
parent1.addEventListener('click', (e) => logEvent('Bubble', 'Parent1', e));
btn1.addEventListener('click', (e) => logEvent('Target', 'Button1', e));

// Stop propagation section
parent2.addEventListener('click', (e) => logEvent('Bubble', 'Parent2', e));
btn2.addEventListener('click', (e) => {
    logEvent('Target', 'Button2', e);
    e.stopPropagation(); // Prevent bubbling to parent
});

// Optional: Demonstrate stopImmediatePropagation
btn2.addEventListener('click', (e) => {
    console.log('Second handler on Button2');
    // Uncomment to stop all handlers on this element:
    // e.stopImmediatePropagation();
});
