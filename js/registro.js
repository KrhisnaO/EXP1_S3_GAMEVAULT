document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormulario()) return;

    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const password = document.getElementById("password").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert("Este correo ya está registrado.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      usuario,
      email,
      fechaNacimiento,
      password,
      tipo: "normal"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Registro exitoso!");
    window.location.href = "login.html";
  });
});
