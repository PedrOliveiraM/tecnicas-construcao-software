class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
class Auth {
  constructor() {
    this.users = [];
  }

  registerUser(name, email, password) {
    if (this.isEmailRegistered(email)) {
      this.showError('Email já registrado.');
      return false;
    }

    const newUser = new User(name, email, password);
    this.users.push(newUser);
    return true;
  }

  loginUser(email, password) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    return user ? true : false;
  }

  isEmailRegistered(email) {
    const user = this.users.find((user) => user.email === email);
    return user ? true : false;
  }

  validatePassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  showError(message) {
    showToast(message, 'error');
  }
}

const auth = new Auth();
auth.registerUser('admin', 'admin@admin.com', 'admin');


const btnRegister = document.getElementById('btnRegister').addEventListener('click', openModal);

function openModal() {
  var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
  myModal.show();
}

function closeModal() {
  var myModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
  if (myModal) {
      myModal.hide();
  }
}

const btnModalSubmit = document.getElementById('btnModalSubmit');
const modalRegisterForm = document.getElementById('modalRegisterForm');

btnModalSubmit.addEventListener('click', handleFormSubmission);

function handleFormSubmission(event) {
  event.preventDefault();

  if (modalRegisterForm.checkValidity()) {
    try {
      const formInformation = getFormFields(modalRegisterForm);

      validateForm(formInformation, auth);

      auth.registerUser(formInformation['registerName'], formInformation['registerEmail'], formInformation['registerPassword']);
      showToast('Registro realizado com sucesso', 'success ');
      closeModal();

    } catch (error) {
      showToast(error.message, 'error');
    }
  } else {
    modalRegisterForm.reportValidity();
  }
}

function getFormFields(form) {
  const formFields = {};
  const formInputs = form.querySelectorAll('input');

  formInputs.forEach((input) => {
    formFields[input.id] = input.value;
  });

  return formFields;
}

function validateForm(formFields, auth) {
  if (auth.isEmailRegistered(formFields['registerEmail'])) {
    showToast('Esse email já existe', 'error');
    throw new Error('Esse email já existe');
  }

  if (!auth.validatePassword(formFields['registerPassword'], formFields['registerConfirmedPassword'])) {
    showToast('As senhas não coincidem', 'error');
    throw new Error('As senhas não coincidem');
  }
}


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLogin);

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (auth.loginUser(email, password)) {
    window.location.href = 'main.html';
  } else {
    showToast('Email ou senha incorretos!', 'error');
  }
}

function showToast(message, type) {
  const toastElement = document.getElementById('toast');
  const toastBody = document.querySelector('#toast .toast-body');
  
  toastElement.classList.remove('bg-success', 'bg-danger');

  if (type === 'error') {
    toastElement.classList.add('bg-danger'); 
  } else {
    toastElement.classList.add('bg-success');
  }

  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastElement);
  toast.show(); 
}

