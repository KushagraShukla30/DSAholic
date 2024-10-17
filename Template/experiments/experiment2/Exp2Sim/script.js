const stackContainer = document.getElementById('stack-container');
const valueInput = document.getElementById('value-input');
const pushBtn = document.getElementById('push-btn');
const popBtn = document.getElementById('pop-btn');
const peekBtn = document.getElementById('peek-btn');
const outputText = document.getElementById('output-text');

let stack = [];
const MAX = 7; // Max limit of the stack
let animating = false; // Flag to check if animation is ongoing
const ANIMATION_DURATION = 300; // Set the duration in milliseconds

function isFull() {
  return stack.length === MAX;
}

function isEmpty() {
  return stack.length === 0;
}

function push() {
  if (animating) return; // Block input if animating

  const value = valueInput.value;
  if (value === '') return;

  if (isFull()) {
    updateOutput('full', 'Stack is full!');
    return;
  }

  stack.push(value);

  const newItem = document.createElement('div');
  newItem.classList.add('stack-item');
  newItem.textContent = value;

  animating = true; // Set animating to true
  newItem.style.animation = 'fall 0.3s ease'; // Adjusted animation duration

  stackContainer.appendChild(newItem);
  valueInput.value = '';

  updateOutput('pushed', value);
  valueInput.focus(); // Automatically refocus on the input after pushing

  // Reset animating flag after animation
  setTimeout(() => {
    animating = false;
  }, ANIMATION_DURATION); // Duration of the push animation
}

function pop() {
  if (animating) return; // Block input if animating

  if (isEmpty()) {
    updateOutput('empty', 'Stack is empty!');
    return;
  }

  const poppedValue = stack.pop();
  const topItem = stackContainer.lastElementChild;

  animating = true; // Set animating to true
  topItem.style.animation = 'rise 0.3s ease'; // Adjusted animation duration

  setTimeout(() => {
    stackContainer.removeChild(topItem);
    animating = false; // Reset animating flag after animation
  }, ANIMATION_DURATION); // Duration of the pop animation

  updateOutput('popped', poppedValue);
}

function peek() {
  if (animating) return; // Block input if animating

  if (isEmpty()) {
    updateOutput('empty', 'Stack is empty!');
    return;
  }

  const topItem = stackContainer.lastElementChild;
  const peekValue = topItem.textContent;

  topItem.classList.add('highlight');
  setTimeout(() => topItem.classList.remove('highlight'), 500);

  updateOutput('peeked', peekValue);
}

// Function to update output messages
function updateOutput(action, value) {
  if (action === 'pushed') {
    outputText.textContent = `Value pushed: ${value}`;
  } else if (action === 'popped') {
    outputText.textContent = `Value popped: ${value}`;
  } else if (action === 'peeked') {
    outputText.textContent = `Peek value: ${value}`;
  } else if (action === 'full') {
    outputText.textContent = value; // Stack full message
  } else if (action === 'empty') {
    outputText.textContent = value; // Stack empty message
  }
}

// Focus on the input by default
valueInput.focus();

// Add event listener for key combinations (Cmd/Win + Backspace or Delete)
document.addEventListener('keydown', function(event) {
  // Check if "Cmd + Backspace" on Mac or "Win + Backspace/Delete" on Windows is pressed
  if ((event.metaKey && event.key === 'Backspace') ||  // Cmd + Backspace on Mac
      (event.metaKey && event.key === 'Delete') ||  // Cmd + Delete on Mac (optional)
      (event.ctrlKey && event.key === 'Backspace') ||  // Win + Backspace on Windows
      (event.ctrlKey && event.key === 'Delete')) {  // Win + Delete on Windows
    pop();
  } else if (event.key === 'Enter') {  // Default Enter to push
    push();
  }
});

// Event listeners for buttons
pushBtn.addEventListener('click', push);
popBtn.addEventListener('click', pop);
peekBtn.addEventListener('click', peek);
