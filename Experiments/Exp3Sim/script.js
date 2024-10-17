// Initialize the queue-related variables
let queue = [];
let maxSize = 0;
let front = -1;
let rear = -1;

// Get references to the HTML elements
const sizeInput = document.getElementById('sizeInput');
const inputValue = document.getElementById('inputValue');
const output = document.getElementById('output');
const queueContainer = document.getElementById('queue-container');

// Focus on the queue size input when the page loads
window.onload = () => {
  sizeInput.focus();
};

// Function to initialize the queue with a specified size
function initialize() {
  const newSize = parseInt(sizeInput.value);
  if (isNaN(newSize) || newSize <= 0) {
    output.textContent = 'Enter a valid queue size.';
    return;
  }

  // Initialize the queue variables
  maxSize = newSize;
  queue = new Array(maxSize).fill(null);
  front = -1;
  rear = -1;

  output.textContent = 'Queue initialized.';
  renderQueue();

  // Shift focus to inputValue after initialization
  inputValue.focus();
}

// Function to add an element to the queue (enqueue)
function enqueue() {
  const value = inputValue.value.trim();
  if (!value) {
    output.textContent = 'Enter a value to enqueue.';
    return;
  }
  if (rear === maxSize - 1) {
    output.textContent = 'Queue is full (Overflow).';
    return;
  }

  if (front === -1 && rear === -1) {
    front = 0;
    rear = 0;
  } else {
    rear = rear + 1;
  }

  queue[rear] = value;
  inputValue.value = '';
  output.textContent = `Enqueued: ${value}`;
  renderQueue();

  // Keep focus on inputValue for quick enqueuing
  inputValue.focus();
}

// Function to remove an element from the queue (dequeue)
function dequeue() {
  if (front === -1 || front > rear) {
    output.textContent = 'Queue is empty (Underflow).';
    return;
  }

  const dequeuedValue = queue[front];
  queue[front] = null;

  if (front === rear) {
    front = -1;
    rear = -1;
  } else {
    front = front + 1;
  }

  output.textContent = `Dequeued: ${dequeuedValue}`;
  renderQueue();

  // Keep focus on inputValue for quick enqueuing/dequeuing
  inputValue.focus();
}

// Function to visualize the current state of the queue
function renderQueue() {
  queueContainer.innerHTML = '';
  queue.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('queue-item');
    if (index === front && front !== -1) div.classList.add('front');
    if (index === rear && rear !== -1) div.classList.add('rear');

    if (item !== null) {
      div.innerHTML = `<div>${item}</div>`;
    }

    const indexLabel = document.createElement('div');
    indexLabel.classList.add('index-label');
    indexLabel.textContent = `Index: ${index}`;
    div.appendChild(indexLabel);

    queueContainer.appendChild(div);
  });
}

// Event listeners for keyboard shortcuts
window.addEventListener('keydown', function(event) {
  // On Enter, enqueue the value
  if (event.key === 'Enter') {
    if (document.activeElement === sizeInput) {
      initialize();
    } else if (document.activeElement === inputValue) {
      enqueue();
    }
  }

  // On Shift + Backspace or Shift + Delete, dequeue the value
  if (event.key === 'Backspace' || event.key === 'Delete') {
    if (event.shiftKey) {
      dequeue();
    }
  }
});
