const msg = "Producto agregado a la cesta";

var shoppingcart = new EasyShoppingBasket(true, msg, null);

function agregarProducto() {
  const add = document.querySelectorAll(".btn-add");
  let img = document.querySelectorAll(".img-producto");
  let codigo = document.querySelectorAll(".codigo-producto");
  let talla = document.querySelectorAll(".talla-producto");
  let cantidad = document.querySelectorAll(".cantidad-producto");
  let nombre = document.querySelectorAll(".nombre-producto");
  let marca = document.querySelectorAll(".marca-producto");
  let precio = document.querySelectorAll(".precio-producto");

  for (let i = 0; i < add.length; i++) {
    add[i].addEventListener("click", (e) => {
      shoppingcart.addItem({
        code: codigo[i].textContent,
        img: img[i].getAttribute("src"),
        size: talla[i].value,
        quantity: cantidad[i].value,
        name: nombre[i].textContent,
        brand: marca[i].textContent,
        price: precio[i].textContent,
      });

      listarProductos();
    });
  }

  
}

agregarProducto();

function listarProductos() {
  let basket = shoppingcart.getShoppingBasketObj();
  const list = document.querySelector("#list-products");

  list.innerHTML = ``;

  for (let j = 0; j < basket.length; j++) {
    list.innerHTML += ` <li style="padding:5px; display:flex; align-items: center; justify-content: space-between;">
    <input type="hidden" value="${basket[j].codigo_producto}" class="c-producto">
    <input type="hidden" value="${basket[j].talla_producto}" class="t-producto">
    <img src="${basket[j].imagen_producto}" style="width:25%;"><span style="font-size:13px">${basket[j].nombre_producto} x <strong><input class="q-producto" type="number" value="${basket[j].cantidad_producto}" style="font-weight:bold; text-align:center; width:50%;"> </strong></span><span style="padding:5px; border-radius:5px; background-color: rgb(202, 59, 59); font-weight:bolder; color:#fff; cursor:pointer;" class="delete">x</span></li>`;
  }

  eliminarProducto()

  actualizarPrecio()
}

function vaciarCarro() {
  shoppingcart.deleteAllItems();
  listarProductos()
}

function eliminarProducto() {
  const delete_ = document.querySelectorAll(".delete");
  const code_ = document.querySelectorAll(".c-producto");
  const size_ = document.querySelectorAll(".t-producto");

  for (let i = 0; i < delete_.length; i++) {
    delete_[i].addEventListener("click", (e) => {
      shoppingcart.deleteItem(code_[i].value, size_[i].value);
      listarProductos();
    });
  }
}

function actualizarCarro(){

  const code_ = document.querySelectorAll(".c-producto");
  const size_ = document.querySelectorAll(".t-producto");
  const quant_ = document.querySelectorAll(".q-producto");

for(let i=0;i<code_.length;i++){

  shoppingcart.updateItems(code_[i].value,size_[i].value,quant_[i].value)

}

location.reload()

listarProductos()

}


listarProductos()

function actualizarPrecio(){

  const price = document.querySelector('#total-p')

  price.innerHTML= shoppingcart.getTotalPriceCart()

}


actualizarPrecio()