// AUTH DE ADMIN CON SUS DATOS CORRESPONDIENTES UNA VEZ INICIADA LA WEB
document.addEventListener("DOMContentLoaded", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existeAdmin = usuarios.some(u => u.email === "admin@gamevault.com");

  if (!existeAdmin) {
    usuarios.push({
      nombre:   "Administrador",
      usuario:  "admin",
      email:    "admin@gamevault.com",
      password: "AdminVault987",
      tipo:     "admin"
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("🛠 Admin creado: admin@gamevault.com / AdminVault987");
  }
});

// FUNCION LOGIN PUEDE SER POR CORREO O NOMBRE USUARIO
function login(credencial, password) {
  console.log("Intentando login con:", credencial, password);
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  console.log("Usuarios en storage:", usuarios);

  const usuario = usuarios.find(u =>
    (u.email   === credencial || 
     u.usuario === credencial)  &&
     u.password === password
  );
  console.log("Resultado de find():", usuario);

  if (!usuario) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  // SE GUARDDA LA SESION
  const sesion = {
    logueado: true,
    usuario:  usuario.usuario,
    tipo:     usuario.tipo
  };
  localStorage.setItem("sesion", JSON.stringify(sesion));
  console.log("Sesión guardada:", sesion);

  // REDIRIGE A LA PAGINA DE INCIA
  window.location.href = "index.html";
}

// CONECTA EL FORMILARO LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  console.log("Formulario #form-login:", form);
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const cred  = document.getElementById("email").value.trim();
    const pass  = document.getElementById("password").value.trim();
    if (!cred || !pass) {
      alert("Por favor completa ambos campos.");
      return;
    }
    login(cred, pass);
  });
});
