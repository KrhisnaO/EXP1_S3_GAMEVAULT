document.addEventListener("DOMContentLoaded", () => {
  // COMPRAR PARA CADA PRODUCTO
  document.querySelectorAll(".btn-add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const art    = btn.closest("article");
      const name   = art?.dataset.name;
      const price  = parseFloat(art?.dataset.price);
      if (!name || isNaN(price)) {
        return;
      }

      const session = JSON.parse(localStorage.getItem("sesion")) || {};
      if (!session.logueado || session.tipo !== "normal") {
        alert("Debes iniciar sesión para agregar productos.");
        localStorage.setItem("afterLoginPath", location.pathname);
        return location.href = "login.html";
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.some(i => i.user === session.usuario && i.product === name)) {
        alert(`"${name}" ya está en tu carrito.`);
        return;
      }

      cart.push({ user: session.usuario, product: name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`"${name}" agregado al carrito 🛒`);
    });
  });

  // REDENDERIZA CARRITO
  const container = document.getElementById("cart-container");
  const finishBtn = document.getElementById("finish-purchase");
  if (!container || !finishBtn) return;

  const session = JSON.parse(localStorage.getItem("sesion")) || {};
  let cart      = JSON.parse(localStorage.getItem("cart")) || [];

  if (!session.logueado || session.tipo !== "normal") {
    return location.href = "index.html";
  }

  // FILTRA LOS PRODUCTO EN EL CARRITO DEL USUARIO
  const mine = cart.filter(i => i.user === session.usuario);
  if (mine.length === 0) {
    container.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
  } else {
    let total = 0;
    mine.forEach((item, idx) => {
      total += item.price;
      const line = document.createElement("div");
      line.className = "d-flex justify-content-between align-items-center mb-2";
      line.innerHTML = `
        <span>${item.product} – $${item.price.toFixed(2)}</span>
        <button class="btn btn-sm btn-danger" data-idx="${idx}">&times;</button>
      `;
      // ELIMINA PRODUCTOS DEL CARRITO
      line.querySelector("button").onclick = () => {
        const global = cart.findIndex(c => c.user === session.usuario && c.product === item.product);
        if (global > -1) {
          cart.splice(global, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        }
      };
      container.appendChild(line);
    });

    // MOSTRAR TOTAL DE LA COMPRA 
    const summary = document.createElement("h5");
    summary.className = "text-end mt-3";
    summary.textContent = `Total: $${total.toFixed(2)}`;
    container.appendChild(summary);
    finishBtn.classList.remove("d-none");
  }

  // FINALIZAR COMPRA
  finishBtn.onclick = () => {
    cart = cart.filter(i => i.user !== session.usuario);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("¡Compra realizada con éxito! 🎉");
    location.reload();
  };
});
