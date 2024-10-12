const stackContainer = document.getElementById('stack-container');
const valueInput = document.getElementById('value-input');
const pushBtn = document.getElementById('push-btn');
const popBtn = document.getElementById('pop-btn');
const peekBtn = document.getElementById('peek-btn');
const outputText = document.getElementById('output-text');

let stack = [];

function push() {
  const value = valueInput.value;
  if (value === '') return;

  stack.push(value);

  const newItem = document.createElement('div');
  newItem.classList.add('stack-item');
  newItem.textContent = value;


  newItem.style.animation = 'fall 0.5s ease';

  stackContainer.appendChild(newItem);
  valueInput.value = '';
  updateOutput('pushed', value);
}

function pop() {
  if (stack.length === 0) {
    updateOutput('pop', 'Stack is empty!');
    return;
  }

  const poppedValue = stack.pop();
  const topItem = stackContainer.lastElementChild;

  topItem.style.animation = 'rise 0.5s ease';
  setTimeout(() => stackContainer.removeChild(topItem), 500);

  updateOutput('popped', poppedValue);
}

function peek() {
  if (stack.length === 0) {
    updateOutput('peek', 'Stack is empty!');
    return;
  }

  const topItem = stackContainer.lastElementChild;
  const peekValue = topItem.textContent;

  topItem.classList.add('highlight');
  setTimeout(() => topItem.classList.remove('highlight'), 500);

  updateOutput('peeked', peekValue);
}


function updateOutput(action, value) {
  if (action === 'pushed') {
    outputText.textContent = `Value pushed: ${value}`;
  } else if (action === 'popped') {
    outputText.textContent = `Value popped: ${value}`;
  } else if (action === 'peeked') {
    outputText.textContent = `Peek value: ${value}`;
  }
}

pushBtn.addEventListener('click', push);
popBtn.addEventListener('click', pop);
peekBtn.addEventListener('click', peek);
