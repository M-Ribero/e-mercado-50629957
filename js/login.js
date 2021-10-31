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
};