let queue = [];
let maxSize = 0;
let front = 0;
let rear = -1;
let size = 0;

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
  queue = new Array(maxSize).fill(null);
  front = 0;
  rear = -1;
  size = 0;
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

  rear = (rear + 1) % maxSize;
  queue[rear] = value;
  size++;
  inputValue.value = '';
  output.textContent = `Enqueued: ${value}`;
  renderQueue();
}

function dequeue() {
  if (size === 0) {
    output.textContent = 'Queue is empty.';
    return;
  }

  const dequeuedValue = queue[front];
  queue[front] = null;
  front = (front + 1) % maxSize;
  size--;
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
  queueContainer.innerHTML = '';
  queue.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('queue-item');
    if (index === front && size > 0) div.classList.add('front');
    if (index === rear && size > 0) div.classList.add('rear');

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
