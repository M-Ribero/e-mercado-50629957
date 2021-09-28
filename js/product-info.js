var productInfo = []
var products = []
var productsRelated = [1, 3]
var comments = []
var rating = 1;
// variables de tiempo
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;


function showProductInfo(array) {
    let contenido = "";
    let product = array;

    contenido += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
            </div> `

    for (let i = 0; i < product.images.length; i++) {
        let imgs = product.images[i];

        contenido += `
        <img src="` + imgs + `" alt=" " class="img-thumbnail" style="height: 200px">
        `
    }
    contenido += `
<div class="col">
        <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
            <h4>`+ product.name + `</h4> 
            <p> `+ product.description + `</p>
            <p> `+ product.cost + ' ' + product.currency + `</p>
            <p> `+ product.category + `</p>
            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
            </div>
        </div>
    
    </div>
    </div>
</div>
`
    document.getElementById("cat-list-container").innerHTML = contenido;
}

function showRelatedProducts(array) {
    let productos = array;

    for (let i = 0; i < productsRelated.length; i++) {
        document.getElementById("productos-relacionados").innerHTML += productos[productsRelated[i]];
    }
      
}

// AGREGAR PRODUCTOS RELACIONADOS AL JSON

function showComments(array) {
    let contenido = "";
    let comentarios = array;
    let estrellas = `<span class="fa fa-star checked" style="margin: 2px;"></span>`;

    for (comentario of comentarios) {
        contenido += `
        <p>${comentario.user}</p>
        <p>${estrellas.repeat(comentario.score)}</p>
        <p>${comentario.description}</p>
        <p>${comentario.dateTime}</p>
                     `
    }
    document.getElementById("caja-comentarios").innerHTML = contenido;
}

// NUEVO COMENTARIO
document.getElementById("publicar-comentario").addEventListener("click", function () {
    let nuevoComentario = {
        user: JSON.parse(localStorage.getItem('User-Logged')).email,
        description: document.getElementById("floatingTextarea").value,
        score: rating,
        dateTime: dateTime
    };

    comments.push(nuevoComentario);
    showComments(comments);
    document.getElementById("floatingTextarea").innerHTML = "";
});

// FUNCIÓN PARA TOMAR EL VALOR DE ESTRELLAS
function getRating(valor) {
    rating = valor;
}



document.addEventListener("DOMContentLoaded", function (e) {

    // CARGA LA INFORMACIÓN DEL PRODUCTO
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
        }
    });

    // CARGA LOS COMENTARIOS
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments(comments);
        }
    });

    // CARGA LOS PRODUCTOS
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            showRelatedProducts(products);
        }
    });

});