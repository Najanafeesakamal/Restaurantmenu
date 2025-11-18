const output = document.getElementById("output");

document.getElementById("btnAll").addEventListener("click", () => {
  fetch("/menu")
    .then(res => res.json())
    .then(displayMenu)
    .catch(err => output.innerHTML = "Error loading menu");
});

document.getElementById("btnVeg").addEventListener("click", () => {
  fetch("/menu/vegetarian")
    .then(res => res.json())
    .then(displayMenu)
    .catch(err => output.innerHTML = "Error loading vegetarian items");
});

document.getElementById("btnCategories").addEventListener("click", () => {
  fetch("/menu/categories")
    .then(res => res.json())
    .then(data => {
      output.innerHTML = "";
      data.categories.forEach(cat => {
        output.innerHTML += `
          <div class="menu-item">
             <h3>${cat.name}</h3>
             <p>Items: ${cat.itemCount}</p>
          </div>`;
      });
    })
    .catch(err => output.innerHTML = "Error loading categories");
});

function displayMenu(items) {
  output.innerHTML = "";
  items.forEach(item => {
    output.innerHTML += `
      <div class="menu-item">
        <h2>${item.name}</h2>
        <p>Category: ${item.category}</p>
        <p>Price: ₹${item.price}</p>
        <p class="${item.isVegetarian ? 'veg' : ''}">
          ${item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
        </p>
        <p>${item.description}</p>
      </div>`;
  });
}
