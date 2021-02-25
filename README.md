# shoppingcart_javascript
shoppingcart made int javascript vanilla.

3,3kbs is the weight of the file, this is a lightweight and very easy to use library to add to your e-commerce project.

This library works with the basic attributes of a product.code, size, quantity, name, price, image and brand.
The available operations are:
Add product, Delete product, Update shopping cart, empty shopping cart. We can also have the total price of the shopping cart and obtain a list of objects with products from the shopping cart.



STEP 1:


<script src="easy-shoppingbasket-min.js"></script>


STEP 2:

const msg = 'product added successfully'

let sb = new EasyShoppingBasket(true,msg,null)

or 


const custom_msg = document.queryselector('.container-mg')

let sb = new EasyShoppingBasket(false,null,custom_msg)




We are ready to start using the library !


LIST OF FUNCTIONS


1. addItem(product)

* product is an object with 7 attributes, it must have the following keys:
* codigo_producto:--
* cantidad_producto:--
* nombre_producto:--
* precio_producto:--
* talla_producto:--
* imagen_producto:--
* marca_producto:--

example:

addItem({
codigo_producto:xxxx,
cantidad_producto:xxxx,
nombre_producto:xxxx,
precio_producto:xxxx,
talla_producto:xxxx,
imagen_producto:xxxx,
marca_producto:xxxx});








