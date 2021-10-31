document.addEventListener("DOMContentLoaded", function (e) {
    let user = JSON.parse(localStorage.getItem('perfil'));
    if (user) {
        document.getElementById("nombreCompleto").value = user.nombre;
        document.getElementById("edad").value = user.edad;
        document.getElementById("mail").value = user.mail;
        document.getElementById("telefono").value = user.telefono;
    }
});

document.getElementById("datos").addEventListener("click", function (e) {
    localStorage.setItem('perfil', JSON.stringify({
        nombre: document.getElementById("nombreCompleto").value,
        edad: document.getElementById("edad").value,
        mail: document.getElementById("mail").value,
        telefono: document.getElementById("telefono").value
    }));
});