// Get elements
const baseOptions = document.querySelectorAll('.base');
const toppingOptions = document.querySelectorAll('.topping');
const pizzaBase = document.querySelector('#pizza-base');
const pizzaToppings = document.querySelector('#pizza-toppings');

// Add dragstart event listeners to pizza bases and toppings
baseOptions.forEach(base => {
  base.addEventListener('dragstart', dragStart);
});

toppingOptions.forEach(topping => {
  topping.addEventListener('dragstart', dragStart);
});

// Add dragover and drop event listeners to pizza base and toppings container
pizzaBase.addEventListener('dragover', dragOver);
pizzaBase.addEventListener('drop', dropPizzaBase);

pizzaToppings.addEventListener('dragover', dragOver);
pizzaToppings.addEventListener('drop', dropTopping);

// Drag functions
function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function dropPizzaBase(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  pizzaBase.appendChild(draggableElement);
  updatePizza();
}

function dropTopping(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  pizzaToppings.appendChild(draggableElement);
  updatePizza();
}

function updatePizza() {
  // Get all selected toppings
  const selectedToppings = pizzaToppings.querySelectorAll('.topping');
  
  // Create a new pizza image
  const pizzaImage = document.createElement('img');
  pizzaImage.src = pizzaBase.querySelector('img').src;
  
  // Add each selected topping to the pizza image
  selectedToppings.forEach(topping => {
    const toppingImage = document.createElement('img');
    toppingImage.src = topping.querySelector('img').src;
    pizzaImage.appendChild(toppingImage);
  });
  
  // Replace old pizza image with new one
  const oldPizzaImage = pizzaBase.querySelector('img');
  pizzaBase.replaceChild(pizzaImage, oldPizzaImage);
}
