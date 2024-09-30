document.getElementById('btnRegister').addEventListener('click', function () {
  var myModal = new bootstrap.Modal(document.getElementById('register-modal'));
  myModal.show();
});


class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class Auth {

  users = [];

  constructor() {
    this.users = [];
  }

  registerUser(name, email, password) {
    const newUser = new User(this.name, email, password);
    this.users.push(newUser);
  }

  loginUser(email, password) {
    this.users.find(user => { 
      if (user.email === email && user.password === password) {
        return true;
      }
  });
  }

  isEmailRegistered(email){
    this.users.find(user => {
      if(user.email === email){
        return true;
      }
    });
    return false;
  }

  validatePassword(password, confirmPassword){
    if(password === confirmPassword){
      return true;
    }
    return false
  }
  
  showError(message){
    alert("Error !");
  }

}
