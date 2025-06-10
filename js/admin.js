document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
  
    if (!sesion || sesion.tipo !== "admin") {
      alert("Acceso denegado. Solo para administradores.");
      window.location.href = "index.html";
      return;
    }
  
    cargarTabla();
  
    document.getElementById("form-juego").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre").value.trim();
      const categoria = document.getElementById("categoria").value.trim();
      const precio = parseFloat(document.getElementById("precio").value);
  
      if (nombre && categoria && precio > 0) {
        const juegos = JSON.parse(localStorage.getItem("juegos")) || [];
        juegos.push({ nombre, categoria, precio });
        localStorage.setItem("juegos", JSON.stringify(juegos));
        cargarTabla();
        e.target.reset();
      }
    });
  });
  
  function cargarTabla() {
    const tabla = document.getElementById("tabla-juegos");
    const juegos = JSON.parse(localStorage.getItem("juegos")) || [];
    tabla.innerHTML = "";
  
    juegos.forEach((juego, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${juego.nombre}</td>
        <td>${juego.categoria}</td>
        <td>$${juego.precio.toFixed(2)}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2" onclick="editarJuego(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarJuego(${index})">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }
  
  function eliminarJuego(index) {
    const juegos = JSON.parse(localStorage.getItem("juegos")) || [];
    if (confirm("¿Seguro que deseas eliminar este juego?")) {
      juegos.splice(index, 1);
      localStorage.setItem("juegos", JSON.stringify(juegos));
      cargarTabla();
    }
  }
  
  function editarJuego(index) {
    const juegos = JSON.parse(localStorage.getItem("juegos")) || [];
    const juego = juegos[index];
  
    const nuevoNombre = prompt("Nuevo nombre:", juego.nombre);
    const nuevaCategoria = prompt("Nueva categoría:", juego.categoria);
    const nuevoPrecio = prompt("Nuevo precio:", juego.precio);
  
    if (nuevoNombre && nuevaCategoria && nuevoPrecio) {
      juegos[index] = {
        nombre: nuevoNombre,
        categoria: nuevaCategoria,
        precio: parseFloat(nuevoPrecio)
      };
      localStorage.setItem("juegos", JSON.stringify(juegos));
      cargarTabla();
    }
  }
  