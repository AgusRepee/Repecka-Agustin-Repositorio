document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mainForm');
  const fields = [
    'nombreCompleto', 'email', 'contraseña', 'edad', 'telefono',
    'direccion', 'ciudad', 'codigoPostal', 'dni'
  ];
  const errors = {};

  // Modal
  const modal = document.getElementById('modal-message');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('close-modal');

  closeModal.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  function showError(field, message) {
    const errorDiv = document.getElementById(`error-${field}`);
    errorDiv.innerText = message;
    errors[field] = message;
  }
  function clearError(field) {
    const errorDiv = document.getElementById(`error-${field}`);
    errorDiv.innerText = '';
    delete errors[field];
  }

  const validators = {
    nombreCompleto: () => {
      const val = form.nombreCompleto.value.trim();
      if (val.length <= 6 || !val.includes(' ')) {
        showError('nombreCompleto', 'Debe tener más de 6 caracteres y un espacio');
        return false;
      }
      return true;
    },
    email: () => {
      const val = form.email.value.trim();
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(val)) {
        showError('email', 'Formato de email no válido');
        return false;
      }
      return true;
    },
    contraseña: () => {
      const val = form['contraseña'].value;
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!re.test(val)) {
        showError('contraseña', 'Al menos 8 caracteres: letras y números');
        return false;
      }
      return true;
    },
    edad: () => {
      const val = parseInt(form.edad.value, 10);
      if (isNaN(val) || val < 18) {
        showError('edad', 'Debe ser un número ≥ 18');
        return false;
      }
      return true;
    },
    telefono: () => {
      const val = form.telefono.value.trim();
      if (!/^\d{7,}$/.test(val)) {
        showError('telefono', 'Mínimo 7 dígitos numéricos');
        return false;
      }
      return true;
    },
    direccion: () => {
      const val = form.direccion.value.trim();
      if (val.length < 5 || !val.includes(' ')) {
        showError('direccion', 'Mínimo 5 caracteres con espacio');
        return false;
      }
      return true;
    },
    ciudad: () => {
      const val = form.ciudad.value.trim();
      if (val.length < 3) {
        showError('ciudad', 'Mínimo 3 caracteres');
        return false;
      }
      return true;
    },
    codigoPostal: () => {
      const val = form.codigoPostal.value.trim();
      if (val.length < 3) {
        showError('codigoPostal', 'Mínimo 3 caracteres');
        return false;
      }
      return true;
    },
    dni: () => {
      const val = form.dni.value.trim();
      if (!/^\d{7,8}$/.test(val)) {
        showError('dni', '7 u 8 dígitos');
        return false;
      }
      return true;
    }
  };

  fields.forEach(f => {
    const fieldEl = document.getElementById(f);
    fieldEl.addEventListener('blur', () => {
      const valid = validators[f]();
      fieldEl.classList.remove('input-error', 'input-success');
      if (valid) {
        fieldEl.classList.add('input-success');
      } else {
        fieldEl.classList.add('input-error');
      }
    });
    fieldEl.addEventListener('focus', () => {
      clearError(f);
      fieldEl.classList.remove('input-error', 'input-success');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    fields.forEach(f => clearError(f));

    fields.forEach(f => validators[f]());

    let mensaje = '';
    let modalClass = '';
    if (Object.keys(errors).length === 0) {
      mensaje = '<h3 class="modal-success">¡Datos cargados correctamente!</h3><ul>';
      fields.forEach(f => {
        mensaje += `<li><strong>${f}:</strong> ${form[f].value}</li>`;
      });
      mensaje += '</ul>';
      modalClass = 'modal-success';
    } else {
      mensaje = '<h3 class="modal-error">Errores en el formulario:</h3><ul>';
      for (const [f, msg] of Object.entries(errors)) {
        mensaje += `<li><strong>${f}:</strong> ${msg}</li>`;
      }
      mensaje += '</ul>';
      modalClass = 'modal-error';
    }
    modalBody.innerHTML = mensaje;
    modalBody.className = modalClass;
    modal.style.display = "block";
  });
});
