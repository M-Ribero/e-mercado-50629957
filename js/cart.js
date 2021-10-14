var articulos = "";
var articulosCargados = [];
const CARRITO_ALT = "https://japdevdep.github.io/ecommerce-api/cart/654.json";


function showArticles(array) {
    contenido = "";
    for (let i = 0; i < array.length; i++) {
            contenido += `
            <div class="col">
            <div class="mb-1">
            <h4>`+ array[i].name + `</h4>
            <img src="`+ array[i].imgSrc + `" alt=" " class="img-thumbnail" style="height: 200px"></img>
            <p> `+ array[i].unitCost + ' ' + array[i].currency + `</p>
            <input type="number" value="`+ array[i].count +`" min="1" class="cantidadProducto"> 
            </div>
            </div>
        `
}
document.getElementById("carrito").innerHTML = contenido;

// onchange="${calculoSubtotal()}"

}

function calculoTotal(){
    let total = 0;
    let subTotal = document.getElementById("costoProductos");
}


function calculoSubtotal() {
    document.getElementById("costoProductos").innerHTML = "jaj";
    }


    console.log(parseInt(document.getElementsByClassName("cantidadProducto").value));






document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            articulosCargados = articulos.articles;
            showArticles(articulosCargados);
        }
    });


    // usar un evento change
});