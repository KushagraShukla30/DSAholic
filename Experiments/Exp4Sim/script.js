let queue = [];
let maxSize = 0;  // Maximum size of the queue
let front = 0;    // Index of the front element
let rear = -1;    // Index of the last element (rear)
let size = 0;     // Current size of the queue

const sizeInput = document.getElementById('sizeInput');
const inputValue = document.getElementById('inputValue');
const output = document.getElementById('output');
const queueContainer = document.getElementById('queue-container');

function initialize() {
  const newSize = parseInt(sizeInput.value);
  if (isNaN(newSize) || newSize <= 0) {
    output.textContent = 'Enter a valid queue size.';
    return;
  }
  maxSize = newSize;
  queue = new Array(maxSize); // Initialize queue array
  front = 0; // Reset front index
  rear = -1; // Reset rear index
  size = 0;  // Reset size
  output.textContent = 'Queue initialized.';
  renderQueue();
}

function enqueue() {
  const value = inputValue.value.trim();
  if (!value) {
    output.textContent = 'Enter a value to enqueue.';
    return;
  }
  if (size >= maxSize) {
    output.textContent = 'Queue is full.';
    return;
  }

  rear++; // Increment rear index
  queue[rear] = value; // Add new value at the rear
  size++; // Increase size
  inputValue.value = ''; // Clear input field
  output.textContent = `Enqueued: ${value}`;
  renderQueue();
}

function dequeue() {
  if (size === 0) {
    output.textContent = 'Queue is empty.';
    return;
  }

  const dequeuedValue = queue[front]; // Get the value from the front
  queue[front] = undefined; // Clear the front value
  front++; // Move front to the next position
  size--; // Decrease size

  if (size === 0) {
    // Reset front and rear when queue becomes empty
    front = 0;
    rear = -1;
  }

  output.textContent = `Dequeued: ${dequeuedValue}`;
  renderQueue();
}

function peekFront() {
  if (size === 0) {
    output.textContent = 'Queue is empty.';
    return;
  }
  output.textContent = `Front: ${queue[front]}`;
}

function renderQueue() {
  queueContainer.innerHTML = ''; // Clear previous queue rendering
  for (let i = 0; i < maxSize; i++) {
    const div = document.createElement('div');
    div.classList.add('queue-item');

    // Highlight front and rear elements
    if (i === front && size > 0) {
      div.classList.add('front');
    }
    if (i === rear && size > 0) {
      div.classList.add('rear');
    }

    // Show values between front and rear
    if (i >= front && i <= rear) {
      div.innerHTML = `<div>${queue[i]}</div>`;
    } else {
      div.innerHTML = `<div></div>`; // Empty box for unoccupied slots
    }

    const indexLabel = document.createElement('div');
    indexLabel.classList.add('index-label');
    indexLabel.textContent = `Index: ${i}`;
    div.appendChild(indexLabel);
    queueContainer.appendChild(div);
  }
}
