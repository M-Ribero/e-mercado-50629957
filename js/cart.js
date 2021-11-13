var articulos = "";
var articulosCargados = [];
var envioActual = 0;
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
            <input style="width:50px;" onchange="calculoProductos(${i})" id="cantidad${i}" type="number" value="` + articulo.count + `" min="1" class="cantidadProducto">
            <p id="subtotalArticulo${i}">${sub}</p> 
            </div>
            </div>
        `
    }
    document.getElementById("carrito").innerHTML = contenido;
    convertir("UYU", array.length);
    calculoTotal(array);
}


function calculoProductos(i) {
    subtotal = 0;
    subtotal += document.getElementById(`precio${i}`).innerHTML * document.getElementById(`cantidad${i}`).value;
    document.getElementById(`subtotalArticulo${i}`).innerHTML = subtotal;
    calculoTotal(articulosCargados);
}

function calculoEnvio(porcentaje) {
    envioActual = porcentaje
    calculoTotal(articulosCargados);
}


function calculoTotal(articulos) {
    document.getElementById("costoProductos").innerHTML = 0;
    total = 0;
    envio = 0;
    for (let i = 0; i < articulos.length; i++) {
        total += document.getElementById(`precio${i}`).innerHTML * document.getElementById(`cantidad${i}`).value;
    }
    document.getElementById("costoProductos").innerHTML = total;

    envio = total * envioActual / 100;
    if (envio != 0) {
        document.getElementById("costoEnvio").innerHTML = envio;
    }

    document.getElementById("costoTotal").innerHTML = total + envio;
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
        calculoProductos(i);
    }
}


// VALIDACIONES MODAL

function seleccionarMetodo(metodo) {
    if (metodo == 1) {
        document.getElementById("numeroCuenta").disabled = true;
        document.getElementById("numeroTarjeta").disabled = false;
        document.getElementById("vencimiento").disabled = false;
        document.getElementById("cvv").disabled = false;
        document.getElementById("numeroCuenta").required = false;
        document.getElementById("numeroTarjeta").required = true;
        document.getElementById("vencimiento").required = true;
        document.getElementById("cvv").required = true;
    }
    else {
        document.getElementById("numeroCuenta").disabled = false;
        document.getElementById("numeroTarjeta").disabled = true;
        document.getElementById("vencimiento").disabled = true;
        document.getElementById("cvv").disabled = true;
        document.getElementById("numeroCuenta").required = true;
        document.getElementById("numeroTarjeta").required = false;
        document.getElementById("vencimiento").required = false;
        document.getElementById("cvv").required = false;
    }
}

function advertenciaPago() {
    if (document.getElementById("pagoTarjetaCredito").checked == false && document.getElementById("pagoTransferenciaBancaria").checked == false) {
        document.getElementById("botonPago").classList.remove("btn-outline-success");
        document.getElementById("botonPago").classList.add("btn-danger");
    }
    
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CARRITO_ALT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            articulosCargados = articulos.articles;
            showArticles(articulosCargados);
        }
    });
});