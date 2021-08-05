// Add id to customer basket
function addToBasket(){
  const params = new URLSearchParams(document.location.search);
  let id = params.get("id");
  const basket = JSON.parse(localStorage.getItem('ORINOCO_CUSTOMER_BASKET'));
  basket.push(id);
  console.log(basket);
  localStorage.setItem('ORINOCO_CUSTOMER_BASKET', JSON.stringify(basket));
}
// Check or create existing customer basket
(function customerBasket(){
  const basket = localStorage.getItem('ORINOCO_CUSTOMER_BASKET');
  if(basket){
    console.log(JSON.parse(basket));
  }
  else {
    localStorage.setItem('ORINOCO_CUSTOMER_BASKET', '[]');
  }
  
  //console.log('basket loaded')

})();
// Auto-load display article
(function loadProduct() {
  const params = new URLSearchParams(document.location.search);
  let id = params.get("id");
  console.log(id);
  
  let url = `http://localhost:3000/api/teddies/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const app = document.querySelector("#app");
      const cardTemplate = document.querySelector("#card-template");
      //let selectCard = document.querySelector('#card-select');
      //console.log(selectCard)
      const card = cardTemplate.content.cloneNode(true);
      app.appendChild(card);
      const colors = data.colors;
      console.log(colors, colors.length);
      for (color of colors) {
        let opt = document.createElement("OPTION");
        opt.value = color;
        opt.innerHTML = color;
        document.querySelector("#app select").appendChild(opt);
      }
      document.querySelector("#image-pres").src = data.imageUrl;
      document.getElementById('add-to-basket-btn').addEventListener('click', () => {
        addToBasket(id);
      })
      populate("#image-pres", data.imageUrl);
      populate("#nom", data.name);
      populate("#description", data.description);
      populate(
        "#prix",
        Number(data.price / 100)
          .toFixed(2)
          .replace(".", ",") + "€"
      );
      
    });
    
})();

// Add text content to an element
function populate(selector, data) {
  document.querySelector(selector).textContent = data;
}


