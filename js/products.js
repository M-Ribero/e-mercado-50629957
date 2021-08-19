var productsArray = [];

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
                        </div>
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

}
/*
<div class="row">
    <div class="col-3">
        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">

                <h4 class="mb-1">`+ category.name +`</h4>
                <small class="text-muted">` + category.productCount + ` artículos</small>
            </div>
            <p class="mb-1">` + category.description + `</p>
        </div>
    </div>*/




    document.addEventListener("DOMContentLoaded", function (e) {

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;
                showProductsList(productsArray);
            }
        });

});




