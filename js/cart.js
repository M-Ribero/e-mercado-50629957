var articulos = "";
var articulosCargados = [];
const CARRITO_ALT = "https://japdevdep.github.io/ecommerce-api/cart/654.json";


function showArticles(array) {
    contenido = "";

    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        let sub = articulo.unitCost * articulo.count;
        if (articulo.currency == "USD") {
            sub = sub * 40;
        }

        contenido += `
            <div class="col col-md-4 mt-3">
            <div class="mb-1">
            <h4>`+ articulo.name + `</h4>
            <img src="`+ articulo.src + `" alt=" " class="img-thumbnail" style="height: 200px"></img>
            <p id="precio${i}">` + articulo.unitCost + `</p>
            <p id="moneda${i}">` + articulo.currency + `</p>
            <input style="width:50px;" onchange="calculoSubtotal(${i})" id="cantidad${i}" type="number" value="` + articulo.count + `" min="1" class="cantidadProducto">
            <p id="subtotalArticulo${i}">${sub}</p> 
            </div>
            </div>
        `
    }
    document.getElementById("carrito").innerHTML = contenido;
    convertir("UYU", array.length);
    calculoArticulos(array);
}


function calculoSubtotal(i) {
    subtotal = 0;
    subtotal += document.getElementById(`precio${i}`).innerHTML * document.getElementById(`cantidad${i}`).value;
    document.getElementById(`subtotalArticulo${i}`).innerHTML = subtotal;
    calculoArticulos(articulosCargados);
}


function calculoArticulos(articulos) {
    document.getElementById("costoProductos").innerHTML = 0;
    total = 0;
    for (let i = 0; i < articulos.length; i++) {
        total += document.getElementById(`precio${i}`).innerHTML * document.getElementById(`cantidad${i}`).value;
    }
    document.getElementById("costoProductos").innerHTML = total;
    // costo total temporal sin calcular envío
    document.getElementById("costoTotal").innerHTML = document.getElementById("costoProductos").innerHTML;
}


// CONVIERTE USD EN UYU O UYU EN USD
function convertir(tipoDeCambio, cantidadArticulos) {
    for (let i = 0; i < cantidadArticulos; i++) {
        if (tipoDeCambio == "UYU" && document.getElementById(`moneda${i}`).innerHTML == "USD") {
            document.getElementById(`precio${i}`).innerHTML = document.getElementById(`precio${i}`).innerHTML * 40;
            document.getElementById(`moneda${i}`).innerHTML = "UYU";
        }
        if (tipoDeCambio == "USD" && document.getElementById(`moneda${i}`).innerHTML == "UYU") {
            document.getElementById(`precio${i}`).innerHTML = document.getElementById(`precio${i}`).innerHTML / 40;
            document.getElementById(`moneda${i}`).innerHTML = "USD";
        }
        calculoSubtotal(i);
    }
}


// VALIDACIONES




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CARRITO_ALT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            articulosCargados = articulos.articles;
            showArticles(articulosCargados);
        }
    });
});