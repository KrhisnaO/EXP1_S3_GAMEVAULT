document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recuperar");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const nuevaPass = document.getElementById("nuevaPassword").value.trim();
    const confirmarPass = document.getElementById("confirmarPassword").value.trim();

    if (!validarEmail("email") || !validarPassword("nuevaPassword", "confirmarPassword")) {
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex(u => u.email === email);

    if (index === -1) {
      alert("❌ No existe un usuario registrado con ese correo.");
      return;
    }

    usuarios[index].password = nuevaPass;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Contraseña actualizada correctamente.");
    window.location.href = "login.html";
  });
});
