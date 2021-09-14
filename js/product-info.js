var productInfo = []
var comments = []


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
        <img src="` + imgs + `" alt=" " class="img-thumbnail">
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

// AGREGAR PRODUCTOS RELACIONADOS AL JSON
// <p>${product.category}</p>

function showComments(array) {
    let contenido = "";
    let comentarios = array;


    for(comentario of comentarios) {

contenido += `
<p>${comentario.score}</p>
<p>${comentario.description}</p>
<p>${comentario.user}</p>
<p>${comentario.dateTime}</p>

`
    }
    document.getElementById("caja-comentarios").innerHTML = contenido;
    
}











//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {



    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments(comments);
        }
    });

});