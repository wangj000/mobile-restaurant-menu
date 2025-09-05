import { menuArray } from "./data.js";

const itemSection = document.getElementById("item-section");
const checkoutItems = document.getElementById("checkout-items");
const checkoutSectionContainer = document.getElementById(
  "checkout-section-container"
);
let cart = [];

function renderItems() {

  itemSection.innerHTML = menuArray.map((item) =>
        `
        <div class="item">
            <p class="item-icon">${item.emoji}</p>
            <div class="item-text">
                <p class="item-title">${item.name}</p>
                <p class="item-desc">${item.ingredients.join(", ")}</p> 
                <p class="item-price">$${item.price}</p>
            </div>
            <button data-id="${item.id}" class="plus">+</button>
        </div>
        `
  ).join("")

}

renderItems();

itemSection.addEventListener('click', e =>{
    let removeBtn = e.target.dataset.id
    if(!removeBtn){
      return 
    }
    
    cart.push(Number(removeBtn))
    renderCart()

})

function renderCart(){

    if(cart.length === 0){
        checkoutSectionContainer.style.display = 'none'
        return;
    }

    checkoutSectionContainer.style.display = 'flex'
    
    checkoutItems.innerHTML = cart.map(id => {

      let item = menuArray.find(menuItem => id === menuItem.id)

      return `<div data-id="${item.id}" class="check-item">
          <div class="check-name">
            <p>${item.name}</p>
          </div>
          <div data-id="${item.id}" class="check-remove">
            <button class="check-remove">remove</button>
          </div>
          <div class="check-price">
            <p>$${item.price}</p>
          </div>
        </div>`
    }).join("")

}

checkoutItems.addEventListener('click', function(e){

    const removeBtn = e.target.closest('.check-remove')

    const item = removeBtn.closest('.check-item')

    let index = cart.indexOf(Number(item.dataset.id))
    
    cart.splice(index, 1)

    item.remove()

    renderCart()
    
})

           

