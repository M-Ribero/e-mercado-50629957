//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    localStorage.clear();
});



function validacion() {

    let usuario = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;

    if (usuario != "" && contrasena != "") {
        localStorage.setItem('User-Logged', JSON.stringify({ email: usuario }));
        window.location.assign("inicio.html");
    }
    else {
        document.getElementById("datos-error").innerHTML = "debe ingresar sus datos";
    }
}




/* intento de botón para guardar datos
var usuario = document.getElementById("correo").value;
var contrasena = document.getElementById("contrasena").value;

document.addEventListener("DOMContentLoaded", function (e) {
    if (document.getElementById("recordar").value = true) {
        document.getElementById("correo").value.innerHTML = usuario;
    } else {
        localStorage.clear();
    }


document.getElementById("boton-validacion").addEventListener("click", function () {
    if (usuario != "" && contrasena != "") {
        localStorage.setItem('User-Logged', JSON.stringify({ email: usuario }));
        window.location.assign("inicio.html");
    }
    else {
        document.getElementById("datos-error").innerHTML = "debe ingresar sus datos";
    }
});



});*/