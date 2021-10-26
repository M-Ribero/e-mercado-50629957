var productsArray = [];
var productsOrdenado = [];
var minCost = undefined;
var maxCost = undefined;
var buscar;

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS

function showProductsList(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            contenido += `
            <div class="col col-sm-6 col-lg-4 mb-3"> 
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        <div class="m-3">
                        <h4>`+ product.name + `</h4> 
                        <p> `+ product.description + `</p>
                        <p> `+ product.cost + ' ' + product.currency + `</p> 
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small> 
                        </div>
                </a>
            </div>
            `
        }
        document.getElementById("cat-list-container").innerHTML = contenido;
    }

}

// FILTRAR SEGÚN CRITERIO

function ShowProductsByCriteria(criterio) {
    productsOrdenado = productsArray;
    showProductsList(filtrar(criterio));
}

function filtrar(criterio) {
    var result = [];
    switch (criterio) {

        case "ascendente":
            result = productsOrdenado.sort(
                function (a, b) {
                    let aASC = parseInt(a.cost);
                    let bASC = parseInt(b.cost);
                    if (aASC > bASC) { return 1; }
                    if (aASC < bASC) { return -1; }
                    return 0;
                }); break;

        case "descendente":
            result = productsOrdenado.sort(
                function (a, b) {
                    let aDES = parseInt(a.cost);
                    let bDES = parseInt(b.cost);
                    if (aDES < bDES) { return 1; }
                    if (aDES > bDES) { return -1; }
                    return 0;
                }); break;

        case "relevancia":
            result = productsOrdenado.sort(
                function (a, b) {
                    let aREL = parseInt(a.soldCount);
                    let bREL = parseInt(b.soldCount);
                    if (aREL < bREL) { return 1; }
                    if (aREL > bREL) { return -1; }
                    return 0;
                }); break;

    }
    return result;
}

// MOSTRAR SEGÚN INPUT DE BUSQUEDA

function searchProductsList(productsArray) {
    let contenido = "";

    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        if (product.name.toLowerCase().includes(buscar) || product.description.toLowerCase().includes(buscar)) {
            contenido +=  `
            <div class="col col-sm-6 col-lg-4 mb-3"> 
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    <div class="m-3">
                    <h4>`+ product.name + `</h4> 
                    <p> `+ product.description + `</p>
                    <p> `+ product.cost + ' ' + product.currency + `</p> 
                    <small class="text-muted">` + product.soldCount + ` artículos vendidos</small> 
                    </div>
            </a>
        </div>
            `
        } if (buscar == "") {
            showProductsList(productsArray);
        }
    }
    document.getElementById("cat-list-container").innerHTML = contenido;
}





document.addEventListener("DOMContentLoaded", function (e) {

    // MUESTRA PRODUCTOS AL CARGAR LA PAGINA
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });


    // FUNCIONALIDAD DE LOS FILTROS

    // MUESTRA EN FUNCIÓN DE CASO ASCENDENTE
    document.getElementById("sortAsc").addEventListener("click", function () {
        ShowProductsByCriteria("ascendente");
    });

    // MUESTRA EN FUNCIÓN DE CASO DESCENDENTE
    document.getElementById("sortDesc").addEventListener("click", function () {
        ShowProductsByCriteria("descendente");
    });

    // MUESTRA SEGÚN RELEVANCIA (CANTIDAD DE VENDIDOS)
    document.getElementById("sortByCount").addEventListener("click", function () {
        ShowProductsByCriteria("relevancia");
    });

    // MUESTRA SEGÚN PRECIOS
    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList(productsArray);
    });

    // MUESTRA SEGÚN LA BUSQUEDA
    document.getElementById("buscar").addEventListener('input', function () {
        buscar = document.getElementById("buscar").value.toLowerCase();
        searchProductsList(productsArray)
    });




    // VUELVE A CARGAR LA LISTA EN SU ESTADO ORIGINAL SIN FILTROS
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;
                showProductsList(productsArray);
            }
        });
    });

});











