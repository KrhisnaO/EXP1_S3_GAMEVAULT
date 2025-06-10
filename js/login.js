document.getElementById("form-login").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    if (!validarEmail(email) || !validarPassword(password)) {
      alert("Correo o contraseña no válidos.");
      return;
    }
  
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(u => u.email === email && u.password === password);
  
    if (!user) {
      alert("Credenciales incorrectas.");
      return;
    }
  
    localStorage.setItem("sesionActiva", JSON.stringify({ email: user.email, rol: user.rol }));
    alert("Sesión iniciada correctamente.");
    window.location.href = "index.html";
  });
  