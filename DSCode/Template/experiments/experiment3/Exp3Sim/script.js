let queue = [];
let maxSize = 0;
let front = -1;
let rear = -1;

const sizeInput = document.getElementById('sizeInput');
const inputValue = document.getElementById('inputValue');
const output = document.getElementById('output');
const queueContainer = document.getElementById('queue-container');

window.onload = () => {
  sizeInput.focus();
  const peekButton = document.getElementById('peekButton');
  peekButton.addEventListener('click', peek); // Event listener for Peek
};

function initialize() {
  const newSize = parseInt(sizeInput.value);
  if (isNaN(newSize) || newSize <= 0) {
    output.textContent = 'Enter a valid queue size.';
    sendOutputToParent('Failed to initialize: Invalid queue size.');
    return;
  }

  maxSize = newSize;
  queue = new Array(maxSize).fill(null);
  front = -1;
  rear = -1;

  output.textContent = 'Queue initialized.';
  sendOutputToParent('Queue initialized successfully.');
  renderQueue();
  inputValue.focus();
}

function enqueue() {
  const value = inputValue.value.trim();
  if (!value) {
    output.textContent = 'Enter a value to enqueue.';
    return;
  }
  if (rear === maxSize - 1) {
    output.textContent = 'Queue is full (Overflow).';
    sendOutputToParent('Queue is full (Overflow).');
    return;
  }

  if (front === -1 && rear === -1) {
    front = 0;
    rear = 0;
  } else {
    rear += 1;
  }

  queue[rear] = value;
  inputValue.value = '';
  output.textContent = `Enqueued: ${value}`;
  sendOutputToParent(`Enqueued: ${value}`); // Send enqueue message to parent
  renderQueue();
  animateEnqueue(rear);
  inputValue.focus();
}

function dequeue() {
  if (front === -1 || front > rear) {
    output.textContent = 'Queue is empty (Underflow).';
    sendOutputToParent('Queue is empty (Underflow).'); // Send empty message to parent
    return;
  }

  const dequeuedValue = queue[front];
  queue[front] = null;
  animateDequeue(front);

  if (front === rear) {
    front = -1;
    rear = -1;
  } else {
    front += 1;
  }

  setTimeout(() => {
    output.textContent = `Dequeued: ${dequeuedValue}`;
    sendOutputToParent(`Dequeued: ${dequeuedValue}`); // Send dequeue message to parent
    renderQueue();
  }, 300);
}

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

function animateEnqueue(position) {
  const items = document.querySelectorAll('.queue-item');
  const element = items[position];
  element.classList.add('pop-in');

  setTimeout(() => {
    element.classList.remove('pop-in');
  }, 300);
}

function animateDequeue(position) {
  const items = document.querySelectorAll('.queue-item');
  const element = items[position];
  element.style.transform = 'translateY(200%)';
  element.style.transition = 'transform 0.5s ease-in-out';

  setTimeout(() => {
    element.remove();
  }, 500);
}

function peek() {
  if (front === -1 || front > rear) {
    output.textContent = 'Queue is empty (Underflow).';
    sendOutputToParent('Queue is empty (Underflow).'); // Send empty message to parent
    return;
  }
  output.textContent = `Front: ${queue[front]}`;
  sendOutputToParent(`Peeked at front: ${queue[front]}`); // Send peek message to parent

  const items = document.querySelectorAll('.queue-item');
  const element = items[front];

  element.classList.add('highlight');

  setTimeout(() => {
    element.classList.remove('highlight');  // Removes highlight after a brief period
  }, 300);  // Keep this time aligned with the CSS transition for smooth behavior
}

// Function to send output message to parent window
function sendOutputToParent(message) {
  window.parent.postMessage(message, '*');
}

// Event listeners for keyboard shortcuts
window.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (document.activeElement === sizeInput) {
      initialize();
    } else if (document.activeElement === inputValue) {
      enqueue();
    }
  }

  if ((event.metaKey && event.key === 'Backspace') ||  
      (event.metaKey && event.key === 'Delete') ||  
      (event.ctrlKey && event.key === 'Backspace') ||  
      (event.ctrlKey && event.key === 'Delete')) {
    dequeue();
  }
});