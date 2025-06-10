document.addEventListener("DOMContentLoaded", () => {
  const sesion     = JSON.parse(localStorage.getItem("sesion"));
  const contenedor = document.getElementById("menu-dinamico");
  
  // Si no existe el span#menu-dinamico, salimos sin hacer nada
  if (!contenedor) return;

  let html = "";

  if (sesion?.logueado) {
    if (sesion.tipo === "admin") {
      html = `
        <a href="admin.html">Panel Admin</a>
        <a href="#" id="cerrar-sesion">Cerrar Sesión</a>
      `;
    } else {
      html = `
        <a href="perfil.html">Perfil</a>
        <a href="carrito.html">Carrito</a>
        <a href="#" id="cerrar-sesion">Cerrar Sesión</a>
      `;
    }
  } else {
    html = `<a href="login.html">Iniciar Sesión</a>`;
  }

  contenedor.innerHTML = html;

  const btnCerrar = document.getElementById("cerrar-sesion");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("sesion");
      window.location.href = "index.html";
    });
  }
});
