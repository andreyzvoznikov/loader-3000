function checkEmail(email) {
  const regexForValidateEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return regexForValidateEmail.test(email);
}

function checkPassword(password) {
  const regexforValidatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return regexforValidatePassword.test(password);
}

function checkName(name) {
  return name.length > 1;
}

export { checkEmail, checkPassword, checkName };
