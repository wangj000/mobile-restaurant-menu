import { menuArray } from "./data.js";

const itemSection = document.getElementById("item-section");
const checkoutItems = document.getElementById("checkout-items");
const checkoutSectionContainer = document.getElementById(
  "checkout-section-container"
);
let cart = [];

function renderItems() {
  const pageHTML = menuArray
    .map(function (item) {
      return `
        <div class="item">
            <p class="item-icon">${item.emoji}</p>
            <div class="item-text">
                <p class="item-title">${item.name}</p>
                <p class="item-desc">${item.ingredients.join(", ")}</p> 
                <p class="item-price">$${item.price}</p>
            </div>
            <button data-id="${item.id}" class="plus">+</button>
        </div>
        `;
    })
    .join("");

  itemSection.innerHTML = pageHTML;
}

renderItems();

//render cart to dom
function renderCart(){

    if(cart.length === 0){
        checkoutSectionContainer.style.display = 'none'
        checkoutSectionContainer.innerHTML = ''
        return;
    }

    checkoutSectionContainer.style.display = 'flex'

}

// add item to cart 
itemSection.addEventListener('click', function(e){
    
    menuArray.forEach(function(item){

        if(item.id === Number(e.target.dataset.id)){
            
            cart.push(item.id)

            checkoutItems.innerHTML += `
             <div data-id="${item.id}" class="check-item">
              <div class="check-name">
                <p>${item.name}</p>
              </div>
              <div data-id="${item.id}" class="check-remove">
                <button class="check-remove">remove</button>
              </div>
              <div class="check-price">
                <p>$${item.price}</p>
              </div>
            </div>
            `
            cart.push(item)
        }

    })

    renderCart()

})

//remove item from order
// problem: once cart is empty, cart section isn't disppearing
    // try looking at the gpt response abt event delegation:
    // https://chatgpt.com/c/68ba0ccd-5994-8331-97d0-50e9cb0c4dc6
checkoutItems.addEventListener('click', function(e){

    const removeBtn = e.target.closest('.check-remove')

    const item = removeBtn.closest('.check-item')

    cart = cart.pop(order => order.id != Number(item.dataset.id))

    item.remove()

    renderCart()
    
})

           

