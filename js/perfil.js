document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!sesion || sesion.tipo !== "normal") {
    window.location.href = "index.html";
    return;
  }

  const usuarioActual = usuarios.find(u => u.email === sesion.usuario || u.usuario === sesion.usuario);

  if (usuarioActual) {
    document.getElementById("nombre").value = usuarioActual.nombre || "";
    document.getElementById("usuario").value = usuarioActual.usuario || "";
    document.getElementById("email").value = usuarioActual.email || "";
    document.getElementById("fechaNacimiento").value = usuarioActual.fechaNacimiento || "";
  }

  const form = document.getElementById("form-perfil");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreValido = validarCampoVacio("nombre");
    const usuarioValido = validarCampoVacio("usuario");
    const fechaValida = validarFechaNacimiento("fechaNacimiento");

    if (!nombreValido || !usuarioValido || !fechaValida) {
      return;
    }

    const nuevoNombre = document.getElementById("nombre").value.trim();
    const nuevoUsuario = document.getElementById("usuario").value.trim();
    const nuevaFecha = document.getElementById("fechaNacimiento").value;

    const index = usuarios.findIndex(u => u.email === usuarioActual.email);
    if (index !== -1) {
      usuarios[index].nombre = nuevoNombre;
      usuarios[index].usuario = nuevoUsuario;
      usuarios[index].fechaNacimiento = nuevaFecha;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      sesion.usuario = nuevoUsuario;
      localStorage.setItem("sesion", JSON.stringify(sesion));

      alert("✅ Perfil actualizado correctamente.");
    }
  });
});
