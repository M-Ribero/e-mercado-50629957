var productsArray = [];
var productsOrdenado = [];

function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + `</h4> 
                        <p> `+ product.description + `</p>
                        <p> `+ product.cost + ' ' + product.currency + `</p> 
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small> 
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

}

// ordenar por precio



function ord1(criterio) {
    productsOrdenado = productsArray;
    productsOrdenado = ordenar(criterio);
}

function ordenar(criterio) {
    return result = [];
    switch (criterio) {

        case "ascendente":
            result = productsOrdenado.sort(
                function (a, b) {
                    let a = parseInt(a.cost);
                    let b = parseInt(b.cost);
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                    return 0;
                }); break;


        case "descendente":
            result = productsOrdenado.sort(
                function (a, b) {
                    let a = parseInt(a.cost);
                    let b = parseInt(b.cost);
                    if (a < b) {
                        return 1;
                    }
                    if (a > b) {
                        return -1;
                    }
                    return 0;
                }); break;


        case "relevancia":
            result = productsOrdenado.sort(
                function (a, b) {
                    let a = parseInt(a.soldCount);
                    let b = parseInt(b.soldCount);
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                    return 0;
                }); break;

    }
    return result;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        ord1("ascendente");
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ord1("descendente");
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ord1("relevancia");
    });

});




