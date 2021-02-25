/******AUTOR: FRANCISCO PEREZ***** CORREO: FP.SOFTWAREDEVELOPMENT@GMAIL.COM**** 22-enero-2020*/
class EasyShoppingBasket {

  constructor(notify, notify_msg, custom_container) {
    this.notify = notify;
    this.notify_msg = notify_msg;
    this.custom_container = custom_container;
  }

  defaultNotification() {
    return this.notify;
  }

  idShoppingBasket() {
    
    let codehash = Number(3) * Number(9);
    let nameHash = codehash.toString() + "hash_" + "_product" + "0000" + "zyx";

    return nameHash;
  }

  getShoppingBasketObj() {
    return JSON.parse(localStorage.getItem(this.idShoppingBasket()));
  }

  getTotalPriceCart() {
    let sum = 0;

    for (let i = 0; i < this.getShoppingBasketObj().length; i++) {
      sum =
        sum +
        Number(this.getShoppingBasketObj()[i].precio_producto) *
          Number(this.getShoppingBasketObj()[i].cantidad_producto);
    }

    return sum;
  }

  deleteItem(code, size) {

    console.log('valores de entrada: ',code,' ',size)

    let basket = this.getShoppingBasketObj();

    for (let i = 0; i < basket.length; i++) {
      if (
        basket[i].codigo_producto == code &&
        basket[i].talla_producto == size
      ) {
        basket.splice(i, 1);

        localStorage.setItem(this.idShoppingBasket(), JSON.stringify(basket));

        return "ok";
      }
    }
  }

  updateItems(code, size, quant) {
    let basket = this.getShoppingBasketObj();
    let tmp = [];

    for (let i = 0; i < basket.length; i++) {
      if (
        basket[i].codigo_producto == code &&
        basket[i].talla_producto == size
      ) {
        tmp = {
          codigo_producto: code,
          cantidad_producto: quant,
          nombre_producto: basket[i].nombre_producto,
          precio_producto: basket[i].precio_producto,
          talla_producto: size,
          imagen_producto: basket[i].imagen_producto,
          marca_producto: basket[i].marca_producto
        };

        basket.splice(i, 1);

        basket.push(tmp)

        localStorage.setItem(this.idShoppingBasket(),JSON.stringify(basket))

        return "ok"
      }
    }
  }

  deleteAllItems() {
    localStorage.removeItem(this.idShoppingBasket());
    location.reload();
  }

  getQuantityProducts() {

    let quant=0;

    if (this.getShoppingBasketObj() != null) {

      for(let i=0;i<this.getShoppingBasketObj().length;i++){

        quant=Number(this.getShoppingBasketObj()[i].cantidad_producto)+Number(quant);

      }

      return quant;

    } else {
      return 0;
    }
  }

  viewDefaultMsgSuccess() {
    const div = document.createElement("div");
    div.setAttribute("class", "container-msg");

    div.style.backgroundColor = "rgb(46, 145, 76)";
    div.style.width = "25%";
    div.style.padding = "12px";
    div.style.borderRadius = "5px";

    const h3 = document.createElement("h3");

    h3.style.color = "#fff";
    h3.style.fontFamily = "Arial, Helvetica, sans-serif";
    h3.style.fontSize = "15px";

    const text = document.createTextNode(this.notify_msg + " ✔");
    h3.appendChild(text);
    div.appendChild(h3);

    document.body.appendChild(div);

    setTimeout(() => {
      document.querySelector(".container-msg").remove();
    }, 3000);
  }

  viewCustomMsgSuccess() {
    this.custom_container.className += " animate__animated";
    this.custom_container.className += " animate__fadeInRightBig";
    this.custom_container.style.display = "block";

    setTimeout(() => {
      this.custom_container.style.display = "none";
    }, 2000);
  }

  addItem(product) {
    const nameHash = this.idShoppingBasket();

    let n = this.defaultNotification() ? true : false;

    let hashproducto = [];

    const ls = localStorage;

    let __producto = {
      codigo_producto: Number(product.code),
      cantidad_producto: Number(product.quantity),
      nombre_producto: product.name,
      precio_producto: Number(product.price),
      talla_producto: product.size,
      imagen_producto: product.img,
      marca_producto: product.brand,
    };

    let __producto_tmp = [];

    if (ls.getItem(nameHash) != null) {
      let hashtmp = JSON.parse(ls.getItem(nameHash));

      for (let i = 0; i < hashtmp.length; i++) {
        if (
          __producto.talla_producto == hashtmp[i].talla_producto &&
          __producto.codigo_producto == hashtmp[i].codigo_producto
        ) {
          let quantityTmp = 0;

          quantityTmp = hashtmp[i].cantidad_producto;

          hashtmp.splice(i, 1);

          __producto_tmp = {
            codigo_producto: Number(product.code),
            cantidad_producto: Number(product.quantity) + Number(quantityTmp),
            nombre_producto: product.name,
            precio_producto: Number(product.price),
            talla_producto: product.size,
            imagen_producto: product.img,
            marca_producto: product.brand,
          };

          hashtmp.push(__producto_tmp);

          ls.setItem(nameHash, JSON.stringify(hashtmp));

          if (n) {
            this.viewDefaultMsgSuccess();
          } else {
            this.viewCustomMsgSuccess();
          }

          return false;
        }
      }

      hashtmp.push(__producto);

      ls.setItem(nameHash, JSON.stringify(hashtmp));

      if (n) {
        this.viewDefaultMsgSuccess();
      } else {
        this.viewCustomMsgSuccess();
      }
    } else {
      hashproducto.push(__producto);
      ls.setItem(nameHash, JSON.stringify(hashproducto));

      if (n) {
        this.viewDefaultMsgSuccess();
      } else {
        this.viewCustomMsgSuccess();
      }
    }
  }
}
