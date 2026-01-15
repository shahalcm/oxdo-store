let productsDiv = document.getElementById("products");
let searchInput = document.getElementById("search");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let pageNumber = document.getElementById("pageNumber");

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 6;


fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    filteredProducts = allProducts;
    showProducts()
  });

function showProducts() {
  productsDiv.innerHTML = "";

  let start = (currentPage - 1) *itemsPerPage;
  let end = start +itemsPerPage;

  for (let i = start; i <end && i < filteredProducts.length; i++) {
    let p = filteredProducts[i];

    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.title}</h3>
        <div class="price">₹ ${p.price}</div>
      </div>
    `;
  }
  pageNumber.innerText = currentPage;
}

searchInput.addEventListener("input", function () {
  let value = searchInput.value.toLowerCase();

  let filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  currentPage = 1;
  showProducts();
});

nextBtn.addEventListener("click",function(){
  let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (currentPage < totalPages){
    currentPage++;
    showProducts();
  }
});

prevBtn.addEventListener("click",function(){
  if (currentPage >1){
    currentPage--;
    showProducts();
  }
});
