// ✅ Validación principal para el formulario de registro
function validarFormulario() {
  let esValido = true;

  esValido &= validarCampoVacio("nombre");
  esValido &= validarCampoVacio("usuario");
  esValido &= validarEmail("email");
  esValido &= validarFechaNacimiento("fechaNacimiento");
  esValido &= validarPassword("password", "confirmarPassword");

  return Boolean(esValido);
}

// ✅ Validar campo vacío
function validarCampoVacio(idCampo) {
  const campo = document.getElementById(idCampo);
  if (campo.value.trim() === "") {
    campo.classList.add("is-invalid");
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}

// ✅ Validar email
function validarEmail(idCampo) {
  const campo = document.getElementById(idCampo);
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(campo.value.trim())) {
    campo.classList.add("is-invalid");
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}

// ✅ Validar fecha de nacimiento (mínimo 13 años)
function validarFechaNacimiento(idCampo) {
  const campo = document.getElementById(idCampo);
  const fecha = new Date(campo.value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();

  if (edad > 13 || (edad === 13 && mes >= 0)) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  } else {
    campo.classList.add("is-invalid");
    return false;
  }
}

// ✅ Validar contraseña segura y coincidencia
function validarPassword(idPassword, idConfirmar) {
  const pass = document.getElementById(idPassword);
  const confirm = document.getElementById(idConfirmar);
  const regexSegura = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  let valido = true;

  if (!regexSegura.test(pass.value)) {
    pass.classList.add("is-invalid");
    valido = false;
  } else {
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
  }

  if (pass.value !== confirm.value || confirm.value === "") {
    confirm.classList.add("is-invalid");
    valido = false;
  } else {
    confirm.classList.remove("is-invalid");
    confirm.classList.add("is-valid");
  }

  return valido;
}
